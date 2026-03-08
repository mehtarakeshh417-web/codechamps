import { useRef, useEffect, useState, useCallback } from "react";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
import {
  FileSpreadsheet, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Paintbrush, Type, Plus, Minus, Trash2, ArrowDown, ArrowRight, Undo, Redo,
  Copy, Clipboard, Scissors, Search, SortAsc, SortDesc, Merge, ChevronDown
} from "lucide-react";

type RibbonTab = "home" | "insert" | "data";

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36];
const FONTS = ["Arial", "Calibri", "Times New Roman", "Verdana", "Georgia", "Courier New", "Comic Sans MS"];
const CELL_COLORS = [
  "#ffffff", "#f8f9fa", "#fff3cd", "#d1ecf1", "#d4edda", "#f8d7da", "#cce5ff", "#e2d9f3",
  "#1e40af", "#166534", "#b91c1c", "#92400e", "#6b21a8", "#0f766e", "#000000", "#374151",
];

const SimulatedExcelEditor = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<RibbonTab>("home");
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [cellRef, setCellRef] = useState("A1");
  const [formulaBar, setFormulaBar] = useState("");

  useEffect(() => {
    if (sheetRef.current && !instanceRef.current) {
      instanceRef.current = (jspreadsheet as any)(sheetRef.current, {
        worksheets: [{
          data: [
            ["Item", "Price", "Qty", "Total"],
            ["Pencils", 5, 10, "=B2*C2"],
            ["Notebooks", 40, 3, "=B3*C3"],
            ["Erasers", 3, 10, "=B4*C4"],
            ["", "", "Total:", "=SUM(D2:D4)"],
            ...Array.from({ length: 45 }, () => ["", "", "", ""]),
          ],
          columns: [
            { type: "text", width: 160 },
            { type: "numeric", width: 100 },
            { type: "numeric", width: 100 },
            { type: "numeric", width: 120 },
            ...Array.from({ length: 8 }, () => ({ type: "text" as const, width: 100 })),
          ],
          minDimensions: [12, 50],
          style: {
            A1: "font-weight:bold;background-color:#1e40af;color:#fff;",
            B1: "font-weight:bold;background-color:#1e40af;color:#fff;",
            C1: "font-weight:bold;background-color:#1e40af;color:#fff;",
            D1: "font-weight:bold;background-color:#1e40af;color:#fff;",
            C5: "font-weight:bold;",
            D5: "font-weight:bold;background-color:#dbeafe;",
          },
        }],
        tableOverflow: true,
        tableWidth: "100%",
        tableHeight: "100%",
        defaultColWidth: 100,
        allowInsertRow: true,
        allowInsertColumn: true,
        allowDeleteRow: true,
        allowDeleteColumn: true,
        columnSorting: true,
        search: true,
        onselection: (_: any, _px: number, _py: number, _ex: number, _ey: number, _origin: any) => {
          const col = String.fromCharCode(65 + _px);
          setCellRef(`${col}${_py + 1}`);
        },
      });
    }

    return () => {
      if (instanceRef.current && sheetRef.current) {
        try { (jspreadsheet as any).destroy?.(sheetRef.current); } catch {}
        instanceRef.current = null;
      }
    };
  }, []);

  const getSelectedCells = useCallback(() => {
    const inst = instanceRef.current?.[0] || instanceRef.current;
    if (!inst) return null;
    const sel = inst.selectedCell;
    return sel || null;
  }, []);

  const applyStyle = useCallback((styleProp: string, value: string) => {
    const inst = instanceRef.current?.[0] || instanceRef.current;
    if (!inst) return;
    try {
      const highlighted = inst.highlighted;
      if (highlighted && highlighted.length > 0) {
        highlighted.forEach((cell: HTMLElement) => {
          const cellName = cell.getAttribute("data-x") !== null
            ? `${String.fromCharCode(65 + parseInt(cell.getAttribute("data-x")!))}${parseInt(cell.getAttribute("data-y")!) + 1}`
            : null;
          if (cellName) {
            const current = inst.getStyle(cellName) || "";
            inst.setStyle(cellName, `${current};${styleProp}:${value}`);
          }
        });
      }
    } catch {}
  }, []);

  const closeDropdowns = () => {
    setShowFontDropdown(false);
    setShowSizeDropdown(false);
    setShowBgColorPicker(false);
    setShowTextColorPicker(false);
  };

  const ToolBtn = ({ icon: Icon, label, onClick, small }: { icon: React.ElementType; label: string; onClick?: () => void; small?: boolean }) => (
    <button onClick={onClick} title={label}
      className={`p-1 rounded transition-all hover:bg-[#e0e0e0] text-[#444] ${small ? "p-0.5" : "p-1"}`}>
      <Icon className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
    </button>
  );

  const ribbonTabs: { key: RibbonTab; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "data", label: "Data" },
  ];

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-xl border border-white/10 overflow-hidden" onClick={closeDropdowns}>
      {/* Title Bar */}
      <div className="flex items-center h-8 bg-[#217346] px-3 gap-2">
        <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
        <span className="text-[11px] text-white/90 font-body font-medium">Book1 — CodeChamps Excel</span>
      </div>

      {/* Ribbon Tabs */}
      <div className="flex items-center h-7 bg-[#f3f3f3] border-b border-[#d4d4d4] px-2 gap-0.5">
        {ribbonTabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 text-[11px] font-body rounded-t transition-all ${activeTab === tab.key ? "bg-white text-[#217346] font-semibold border border-b-0 border-[#d4d4d4]" : "text-[#555] hover:bg-[#e8e8e8]"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[#f8f8f8] border-b border-[#d4d4d4] px-2 py-1 min-h-[56px]">
        {activeTab === "home" && (
          <div className="flex items-center gap-1 flex-wrap">
            {/* Clipboard */}
            <div className="flex items-center gap-0.5 pr-2 border-r border-[#d4d4d4] mr-1">
              <ToolBtn icon={Clipboard} label="Paste" onClick={() => document.execCommand("paste")} />
              <ToolBtn icon={Copy} label="Copy" small />
              <ToolBtn icon={Scissors} label="Cut" small />
            </div>

            {/* Font Family */}
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowFontDropdown(!showFontDropdown); setShowSizeDropdown(false); }}
                className="flex items-center gap-1 bg-white border border-[#c8c8c8] rounded px-2 py-0.5 text-[10px] text-[#333] font-body min-w-[90px] hover:border-[#999]">
                {fontFamily} <ChevronDown className="w-2.5 h-2.5 ml-auto" />
              </button>
              {showFontDropdown && (
                <div className="absolute top-full left-0 z-50 bg-white border border-[#d4d4d4] rounded shadow-lg mt-0.5 max-h-40 overflow-y-auto w-36" onClick={e => e.stopPropagation()}>
                  {FONTS.map(f => (
                    <button key={f} onClick={() => { setFontFamily(f); applyStyle("font-family", f); setShowFontDropdown(false); }}
                      className="w-full text-left px-2 py-1 text-[11px] hover:bg-[#e8f0fe] font-body" style={{ fontFamily: f }}>{f}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Size */}
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowSizeDropdown(!showSizeDropdown); setShowFontDropdown(false); }}
                className="flex items-center gap-1 bg-white border border-[#c8c8c8] rounded px-2 py-0.5 text-[10px] text-[#333] font-body w-12 hover:border-[#999]">
                {fontSize} <ChevronDown className="w-2.5 h-2.5 ml-auto" />
              </button>
              {showSizeDropdown && (
                <div className="absolute top-full left-0 z-50 bg-white border border-[#d4d4d4] rounded shadow-lg mt-0.5 max-h-40 overflow-y-auto w-14" onClick={e => e.stopPropagation()}>
                  {FONT_SIZES.map(s => (
                    <button key={s} onClick={() => { setFontSize(s); applyStyle("font-size", `${s}px`); setShowSizeDropdown(false); }}
                      className="w-full text-left px-2 py-1 text-[11px] hover:bg-[#e8f0fe] font-body">{s}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />

            {/* Text Formatting */}
            <ToolBtn icon={Bold} label="Bold" onClick={() => applyStyle("font-weight", "bold")} />
            <ToolBtn icon={Italic} label="Italic" onClick={() => applyStyle("font-style", "italic")} />
            <ToolBtn icon={Underline} label="Underline" onClick={() => applyStyle("text-decoration", "underline")} />

            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />

            {/* Background Color */}
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowBgColorPicker(!showBgColorPicker); setShowTextColorPicker(false); }}
                title="Background Color" className="p-1 rounded hover:bg-[#e0e0e0] flex items-center gap-0.5">
                <Paintbrush className="w-3.5 h-3.5 text-[#444]" />
                <ChevronDown className="w-2 h-2 text-[#888]" />
              </button>
              {showBgColorPicker && (
                <div className="absolute top-full left-0 z-50 bg-white border border-[#d4d4d4] rounded shadow-lg p-2 mt-0.5" onClick={e => e.stopPropagation()}>
                  <p className="text-[9px] text-[#888] mb-1 font-body">Fill Color</p>
                  <div className="grid grid-cols-8 gap-1">
                    {CELL_COLORS.map(c => (
                      <button key={c} onClick={() => { applyStyle("background-color", c); setShowBgColorPicker(false); }}
                        className="w-5 h-5 rounded border border-[#d4d4d4] hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Text Color */}
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowTextColorPicker(!showTextColorPicker); setShowBgColorPicker(false); }}
                title="Font Color" className="p-1 rounded hover:bg-[#e0e0e0] flex items-center gap-0.5">
                <Type className="w-3.5 h-3.5 text-[#444]" />
                <ChevronDown className="w-2 h-2 text-[#888]" />
              </button>
              {showTextColorPicker && (
                <div className="absolute top-full left-0 z-50 bg-white border border-[#d4d4d4] rounded shadow-lg p-2 mt-0.5" onClick={e => e.stopPropagation()}>
                  <p className="text-[9px] text-[#888] mb-1 font-body">Font Color</p>
                  <div className="grid grid-cols-8 gap-1">
                    {CELL_COLORS.map(c => (
                      <button key={c} onClick={() => { applyStyle("color", c); setShowTextColorPicker(false); }}
                        className="w-5 h-5 rounded border border-[#d4d4d4] hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />

            {/* Alignment */}
            <ToolBtn icon={AlignLeft} label="Align Left" onClick={() => applyStyle("text-align", "left")} />
            <ToolBtn icon={AlignCenter} label="Align Center" onClick={() => applyStyle("text-align", "center")} />
            <ToolBtn icon={AlignRight} label="Align Right" onClick={() => applyStyle("text-align", "right")} />
          </div>
        )}

        {activeTab === "insert" && (
          <div className="flex items-center gap-1 flex-wrap">
            <ToolBtn icon={ArrowDown} label="Insert Row Below" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.insertRow(); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body mr-2">Row</span>
            <ToolBtn icon={ArrowRight} label="Insert Column" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.insertColumn(); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body mr-2">Column</span>
            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />
            <ToolBtn icon={Trash2} label="Delete Row" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.deleteRow(); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body mr-2">Del Row</span>
            <ToolBtn icon={Trash2} label="Delete Column" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.deleteColumn(); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body">Del Col</span>
          </div>
        )}

        {activeTab === "data" && (
          <div className="flex items-center gap-1 flex-wrap">
            <ToolBtn icon={SortAsc} label="Sort A-Z" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.orderBy(0, true); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body mr-2">Sort A→Z</span>
            <ToolBtn icon={SortDesc} label="Sort Z-A" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.orderBy(0, false); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body mr-2">Sort Z→A</span>
            <div className="w-px h-8 bg-[#d4d4d4] mx-1" />
            <ToolBtn icon={Search} label="Search" onClick={() => {
              const inst = instanceRef.current?.[0] || instanceRef.current;
              if (inst) try { inst.search(""); } catch {}
            }} />
            <span className="text-[10px] text-[#666] font-body">Find</span>
          </div>
        )}
      </div>

      {/* Formula Bar */}
      <div className="flex items-center h-7 bg-white border-b border-[#d4d4d4] px-1 gap-1">
        <div className="bg-[#f3f3f3] border border-[#c8c8c8] rounded px-2 py-0.5 text-[10px] text-[#333] font-body font-semibold min-w-[50px] text-center">
          {cellRef}
        </div>
        <div className="text-[10px] text-[#888] px-1">fx</div>
        <input
          value={formulaBar}
          onChange={(e) => setFormulaBar(e.target.value)}
          placeholder="Enter formula or value..."
          className="flex-1 text-[11px] text-[#333] font-body outline-none bg-transparent px-1"
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-hidden">
        <div ref={sheetRef} className="w-full h-full" />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#217346] flex items-center px-3 justify-between">
        <span className="text-[10px] text-white/80 font-body">Sheet1</span>
        <span className="text-[10px] text-white/70 font-body">Formulas: =SUM, =AVERAGE, =IF, =COUNT • Click column header to sort</span>
      </div>
    </div>
  );
};

export default SimulatedExcelEditor;
