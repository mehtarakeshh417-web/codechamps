import { useState, useCallback, useMemo } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  ChevronDown, Plus, Minus, Save, Undo, Redo,
  Grid3X3, BarChart3, Filter, SortAsc, Paintbrush, Merge, Sigma,
  FileSpreadsheet, Percent, DollarSign, Hash
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const COLS = 12;
const ROWS = 30;
const COL_LABELS = Array.from({ length: COLS }, (_, i) => String.fromCharCode(65 + i));

type CellData = { value: string; formula?: string; bold?: boolean; italic?: boolean; align?: string; bg?: string };
type CellMap = Record<string, CellData>;

const SimulatedExcelEditor = () => {
  const [cells, setCells] = useState<CellMap>(() => {
    const init: CellMap = {};
    // Sample data
    init["A1"] = { value: "Item", bold: true, bg: "#1e40af" };
    init["B1"] = { value: "Price", bold: true, bg: "#1e40af" };
    init["C1"] = { value: "Qty", bold: true, bg: "#1e40af" };
    init["D1"] = { value: "Total", bold: true, bg: "#1e40af" };
    init["A2"] = { value: "Pencils" }; init["B2"] = { value: "5" }; init["C2"] = { value: "10" }; init["D2"] = { value: "50", formula: "=B2*C2" };
    init["A3"] = { value: "Notebooks" }; init["B3"] = { value: "40" }; init["C3"] = { value: "3" }; init["D3"] = { value: "120", formula: "=B3*C3" };
    init["A4"] = { value: "Erasers" }; init["B4"] = { value: "3" }; init["C4"] = { value: "10" }; init["D4"] = { value: "30", formula: "=B4*C4" };
    init["A5"] = { value: "" }; init["D5"] = { value: "200", formula: "=SUM(D2:D4)", bold: true };
    init["A5"] = { value: "Total", bold: true };
    return init;
  });
  const [activeCell, setActiveCell] = useState("A1");
  const [editValue, setEditValue] = useState("");
  const [selectedRange, setSelectedRange] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("home");

  const getCellRef = (col: number, row: number) => `${COL_LABELS[col]}${row + 1}`;
  const getCellValue = (ref: string) => cells[ref]?.value ?? "";
  const getCellFormula = (ref: string) => cells[ref]?.formula ?? cells[ref]?.value ?? "";

  const evaluateFormula = useCallback((formula: string): string => {
    if (!formula.startsWith("=")) return formula;
    const expr = formula.slice(1).toUpperCase();

    // SUM(range)
    const sumMatch = expr.match(/^SUM\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
    if (sumMatch) {
      const [, sc, sr, ec, er] = sumMatch;
      let sum = 0;
      for (let c = sc.charCodeAt(0); c <= ec.charCodeAt(0); c++) {
        for (let r = parseInt(sr); r <= parseInt(er); r++) {
          sum += parseFloat(getCellValue(`${String.fromCharCode(c)}${r}`)) || 0;
        }
      }
      return sum.toString();
    }

    // AVERAGE(range)
    const avgMatch = expr.match(/^AVERAGE\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
    if (avgMatch) {
      const [, sc, sr, ec, er] = avgMatch;
      let sum = 0, count = 0;
      for (let c = sc.charCodeAt(0); c <= ec.charCodeAt(0); c++) {
        for (let r = parseInt(sr); r <= parseInt(er); r++) {
          const v = parseFloat(getCellValue(`${String.fromCharCode(c)}${r}`));
          if (!isNaN(v)) { sum += v; count++; }
        }
      }
      return count ? (sum / count).toFixed(2) : "0";
    }

    // Simple math: =B2*C2
    try {
      const replaced = expr.replace(/([A-Z])(\d+)/g, (_, col, row) => {
        const v = getCellValue(`${col}${row}`);
        return isNaN(Number(v)) ? "0" : v;
      });
      const result = new Function(`return ${replaced}`)();
      return String(result);
    } catch {
      return "#ERR";
    }
  }, [cells]);

  const updateCell = (ref: string, value: string) => {
    setCells((prev) => {
      const cell = prev[ref] || { value: "" };
      const isFormula = value.startsWith("=");
      return {
        ...prev,
        [ref]: {
          ...cell,
          value: isFormula ? evaluateFormula(value) : value,
          formula: isFormula ? value : undefined,
        },
      };
    });
  };

  const handleCellClick = (ref: string) => {
    setActiveCell(ref);
    setEditValue(getCellFormula(ref));
  };

  const handleCellBlur = () => {
    updateCell(activeCell, editValue);
  };

  const toggleCellStyle = (prop: "bold" | "italic") => {
    setCells((prev) => ({
      ...prev,
      [activeCell]: { ...(prev[activeCell] || { value: "" }), [prop]: !(prev[activeCell]?.[prop]) },
    }));
  };

  const tabs = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "formulas", label: "Formulas" },
    { key: "data", label: "Data" },
  ];

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center h-8 bg-[hsl(140,40%,25%)] px-3 gap-2 border-b border-white/10">
        <FileSpreadsheet className="w-4 h-4 text-white" />
        <span className="text-xs text-white/90 font-body">Book1 - CodeChamps Excel</span>
        <div className="ml-auto flex gap-1">
          <button className="p-1 text-white/60 hover:text-white"><Undo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white"><Redo className="w-3.5 h-3.5" /></button>
          <button className="p-1 text-white/60 hover:text-white"><Save className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="flex items-center bg-[hsl(220,28%,15%)] px-2 border-b border-white/10">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-1.5 text-xs font-body transition-all border-b-2 ${activeTab === t.key ? "border-green-400 text-green-400" : "border-transparent text-white/60 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Ribbon */}
      <div className="bg-[hsl(220,28%,14%)] border-b border-white/10 px-2 py-1.5 flex items-center gap-1 min-h-[44px] flex-wrap">
        {activeTab === "home" && (
          <>
            <button onClick={() => toggleCellStyle("bold")} className={`p-1.5 rounded ${cells[activeCell]?.bold ? "bg-green-500/20 text-green-400" : "text-white/60 hover:bg-white/10"}`}><Bold className="w-3.5 h-3.5" /></button>
            <button onClick={() => toggleCellStyle("italic")} className={`p-1.5 rounded ${cells[activeCell]?.italic ? "bg-green-500/20 text-green-400" : "text-white/60 hover:bg-white/10"}`}><Italic className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><Underline className="w-3.5 h-3.5" /></button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><AlignLeft className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><AlignCenter className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><AlignRight className="w-3.5 h-3.5" /></button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10 flex items-center gap-1 text-xs"><DollarSign className="w-3 h-3" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10 flex items-center gap-1 text-xs"><Percent className="w-3 h-3" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10 flex items-center gap-1 text-xs"><Hash className="w-3 h-3" /></button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><Merge className="w-3.5 h-3.5" /></button>
            <button className="p-1.5 rounded text-white/60 hover:bg-white/10"><Paintbrush className="w-3.5 h-3.5" /></button>
          </>
        )}
        {activeTab === "insert" && (
          <>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10"><BarChart3 className="w-3.5 h-3.5" /> Chart</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10"><Grid3X3 className="w-3.5 h-3.5" /> Table</button>
          </>
        )}
        {activeTab === "formulas" && (
          <div className="flex items-center gap-2 text-xs text-white/60 px-1 flex-wrap">
            <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10"><Sigma className="w-3.5 h-3.5" /> SUM</button>
            <span className="text-white/30">|</span>
            <span>AVERAGE</span><span className="text-white/30">|</span>
            <span>COUNT</span><span className="text-white/30">|</span>
            <span>MAX</span><span className="text-white/30">|</span>
            <span>MIN</span>
          </div>
        )}
        {activeTab === "data" && (
          <>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10"><SortAsc className="w-3.5 h-3.5" /> Sort</button>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10"><Filter className="w-3.5 h-3.5" /> Filter</button>
          </>
        )}
      </div>

      {/* Formula Bar */}
      <div className="flex items-center h-7 bg-[hsl(220,20%,16%)] border-b border-white/10 px-1 gap-2">
        <div className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-green-400 font-mono w-14 text-center">{activeCell}</div>
        <div className="text-white/30 text-xs">ƒx</div>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleCellBlur}
          onKeyDown={(e) => { if (e.key === "Enter") { handleCellBlur(); } }}
          className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-white/90 font-mono outline-none focus:border-green-500/50"
        />
      </div>

      {/* Spreadsheet Grid */}
      <ScrollArea className="flex-1">
        <div className="overflow-auto">
          <table className="border-collapse w-full" style={{ minWidth: COLS * 90 }}>
            <thead>
              <tr>
                <th className="sticky top-0 left-0 z-20 w-10 h-6 bg-[hsl(220,20%,18%)] border border-white/10 text-[10px] text-white/40" />
                {COL_LABELS.map((l) => (
                  <th key={l} className="sticky top-0 z-10 h-6 bg-[hsl(220,20%,18%)] border border-white/10 text-[10px] text-white/50 font-normal min-w-[90px]">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ROWS }, (_, r) => (
                <tr key={r}>
                  <td className="sticky left-0 z-10 w-10 h-7 bg-[hsl(220,20%,18%)] border border-white/10 text-center text-[10px] text-white/40">{r + 1}</td>
                  {COL_LABELS.map((_, c) => {
                    const ref = getCellRef(c, r);
                    const cell = cells[ref];
                    const isActive = ref === activeCell;
                    return (
                      <td
                        key={ref}
                        onClick={() => handleCellClick(ref)}
                        className={`h-7 border border-white/5 text-xs px-1.5 cursor-cell transition-colors ${
                          isActive ? "outline outline-2 outline-green-500 bg-green-500/10 z-10 relative" : "hover:bg-white/5"
                        } ${cell?.bg ? "" : "bg-transparent"}`}
                        style={{
                          fontWeight: cell?.bold ? "bold" : "normal",
                          fontStyle: cell?.italic ? "italic" : "normal",
                          backgroundColor: cell?.bg || undefined,
                          color: cell?.bg ? "#fff" : "hsl(210,20%,90%)",
                        }}
                      >
                        {isActive ? (
                          <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleCellBlur}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") { handleCellBlur(); const next = getCellRef(c, r + 1); setActiveCell(next); setEditValue(getCellFormula(next)); }
                              if (e.key === "Tab") { e.preventDefault(); handleCellBlur(); const next = getCellRef(c + 1, r); setActiveCell(next); setEditValue(getCellFormula(next)); }
                            }}
                            className="w-full h-full bg-transparent outline-none text-white text-xs font-mono"
                          />
                        ) : (
                          <span className="truncate block">{cell?.value ?? ""}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>

      {/* Sheet Tabs + Status */}
      <div className="h-7 bg-[hsl(220,30%,10%)] border-t border-white/10 flex items-center px-2 gap-2">
        <button className="px-1 text-white/40 hover:text-white"><Plus className="w-3 h-3" /></button>
        <div className="px-3 py-0.5 bg-white/10 rounded-t text-[10px] text-white/80 font-body border-b-2 border-green-400">Sheet1</div>
        <div className="px-3 py-0.5 text-[10px] text-white/40 font-body hover:bg-white/5 rounded-t cursor-pointer">Sheet2</div>
        <div className="ml-auto text-[10px] text-white/40 font-body">Ready</div>
      </div>
    </div>
  );
};

export default SimulatedExcelEditor;
