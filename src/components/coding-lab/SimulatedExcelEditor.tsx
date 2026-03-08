import { useRef, useEffect, useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Plus, Trash2, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLS = 26;
const ROWS = 50;
const COL_WIDTH = 100;
const ROW_HEIGHT = 28;

const colLabel = (i: number) => String.fromCharCode(65 + i);

const SimulatedExcelEditor = () => {
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [editingCell, setEditingCell] = useState<[number, number] | null>(null);
  const [formulaBarValue, setFormulaBarValue] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const inputRef = useRef<HTMLInputElement>(null);

  const [r, c] = selectedCell;
  const cellRef = `${colLabel(c)}${r + 1}`;

  useEffect(() => {
    setFormulaBarValue(data[r]?.[c] || "");
  }, [r, c, data]);

  const updateCell = (row: number, col: number, value: string) => {
    setData(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = value;
      return next;
    });
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
    setEditingCell(null);
  };

  const handleCellDoubleClick = (row: number, col: number) => {
    setEditingCell([row, col]);
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === "Enter") {
      setEditingCell(null);
      setSelectedCell([Math.min(row + 1, ROWS - 1), col]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      setEditingCell(null);
      setSelectedCell([row, Math.min(col + 1, COLS - 1)]);
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

  const handleFormulaBarChange = (val: string) => {
    setFormulaBarValue(val);
    updateCell(r, c, val);
  };

  const insertRow = () => {
    setData(prev => {
      const next = [...prev];
      next.splice(r + 1, 0, Array(COLS).fill(""));
      return next;
    });
  };

  const deleteRow = () => {
    if (data.length <= 1) return;
    setData(prev => prev.filter((_, i) => i !== r));
    if (r >= data.length - 1) setSelectedCell([Math.max(0, r - 1), c]);
  };

  const insertCol = () => {
    setData(prev => prev.map(row => {
      const next = [...row];
      next.splice(c + 1, 0, "");
      return next;
    }));
  };

  const tabs = ["Home", "Insert", "Data"];

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center h-8 bg-[hsl(140,40%,20%)] px-3 border-b border-white/10">
        <span className="text-xs text-white/80 font-body">MS Excel Spreadsheet Editor</span>
      </div>

      {/* Ribbon tabs */}
      <div className="flex items-center gap-0 bg-[hsl(220,20%,16%)] border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-body transition-colors ${activeTab === tab ? "bg-[hsl(220,20%,20%)] text-white border-b-2 border-primary" : "text-white/50 hover:text-white/80"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[hsl(220,20%,18%)] border-b border-white/10 flex-wrap">
        {activeTab === "Home" && (
          <>
            <select className="bg-[hsl(220,20%,14%)] text-white/80 text-xs border border-white/10 rounded px-1 py-1 font-body">
              <option>Calibri</option><option>Arial</option><option>Times New Roman</option><option>Verdana</option><option>Courier New</option>
            </select>
            <select className="bg-[hsl(220,20%,14%)] text-white/80 text-xs border border-white/10 rounded px-1 py-1 w-14 font-body">
              {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 36].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="w-px h-5 bg-white/10" />
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Bold className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Italic className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><Underline className="w-3.5 h-3.5" /></Button>
            <div className="w-px h-5 bg-white/10" />
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignLeft className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignCenter className="w-3.5 h-3.5" /></Button>
            <Button size="sm" variant="ghost" className="p-1 h-7 w-7 text-white/60 hover:text-white"><AlignRight className="w-3.5 h-3.5" /></Button>
            <div className="w-px h-5 bg-white/10" />
            <input type="color" className="w-6 h-6 rounded cursor-pointer" title="Font Color" />
            <input type="color" className="w-6 h-6 rounded cursor-pointer" defaultValue="#ffff00" title="Fill Color" />
          </>
        )}
        {activeTab === "Insert" && (
          <>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={insertRow}><Plus className="w-3 h-3" /> Insert Row</Button>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={insertCol}><Plus className="w-3 h-3" /> Insert Column</Button>
            <Button size="sm" variant="ghost" className="text-xs text-white/60 hover:text-white gap-1 h-7" onClick={deleteRow}><Trash2 className="w-3 h-3" /> Delete Row</Button>
          </>
        )}
        {activeTab === "Data" && (
          <span className="text-xs text-white/40 font-body">Sort & Filter coming soon</span>
        )}
      </div>

      {/* Formula bar */}
      <div className="flex items-center gap-2 px-3 py-1 bg-[hsl(220,20%,15%)] border-b border-white/10">
        <span className="text-xs text-white/60 font-mono w-10 text-center bg-[hsl(220,20%,12%)] rounded px-1 py-0.5 border border-white/10">{cellRef}</span>
        <Type className="w-3 h-3 text-white/30" />
        <input
          ref={inputRef}
          value={formulaBarValue}
          onChange={e => handleFormulaBarChange(e.target.value)}
          className="flex-1 bg-[hsl(220,20%,12%)] text-white text-xs font-mono border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-primary/50"
          placeholder="Enter value or formula..."
        />
      </div>

      {/* Spreadsheet grid */}
      <div className="flex-1 overflow-auto">
        <table className="border-collapse" style={{ minWidth: COLS * COL_WIDTH + 40 }}>
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-[hsl(220,20%,16%)] border border-white/10 w-10 min-w-[40px] text-[10px] text-white/40 font-body" />
              {Array.from({ length: COLS }, (_, i) => (
                <th
                  key={i}
                  className={`bg-[hsl(220,20%,16%)] border border-white/10 text-[10px] text-white/40 font-body px-1 ${c === i ? "bg-primary/20 text-primary" : ""}`}
                  style={{ width: COL_WIDTH, minWidth: COL_WIDTH }}
                >
                  {colLabel(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={ri}>
                <td className={`bg-[hsl(220,20%,16%)] border border-white/10 text-[10px] text-white/40 font-body text-center sticky left-0 z-[5] ${r === ri ? "bg-primary/20 text-primary" : ""}`} style={{ height: ROW_HEIGHT }}>
                  {ri + 1}
                </td>
                {row.map((cell, ci) => {
                  const isSelected = r === ri && c === ci;
                  const isEditing = editingCell?.[0] === ri && editingCell?.[1] === ci;
                  return (
                    <td
                      key={ci}
                      className={`border border-white/[0.06] text-xs text-white/80 font-body px-1 cursor-cell ${isSelected ? "outline outline-2 outline-primary bg-primary/5" : "hover:bg-white/[0.03]"}`}
                      style={{ height: ROW_HEIGHT }}
                      onClick={() => handleCellClick(ri, ci)}
                      onDoubleClick={() => handleCellDoubleClick(ri, ci)}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          value={cell}
                          onChange={e => updateCell(ri, ci, e.target.value)}
                          onKeyDown={e => handleCellKeyDown(e, ri, ci)}
                          onBlur={() => setEditingCell(null)}
                          className="w-full h-full bg-transparent text-xs text-white outline-none font-body"
                        />
                      ) : (
                        <span className="block truncate">{cell}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[hsl(220,20%,14%)] border-t border-white/10">
        <span className="text-[10px] text-white/40 font-body">Sheet 1</span>
        <span className="text-[10px] text-white/40 font-body">Rows: {data.length} | Cols: {COLS}</span>
      </div>
    </div>
  );
};

export default SimulatedExcelEditor;
