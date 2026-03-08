import { useRef, useEffect, useState } from "react";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";

const JSpreadsheetExcel = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const [activeSheet, setActiveSheet] = useState(0);
  const [sheets] = useState([
    { name: "Sheet1" },
    { name: "Sheet2" },
    { name: "Sheet3" },
  ]);

  useEffect(() => {
    if (!sheetRef.current || instanceRef.current) return;

    // Generate empty data grid
    const data = Array.from({ length: 100 }, () => Array(26).fill(""));

    // Column headers A-Z
    const columns = Array.from({ length: 26 }, (_, i) => ({
      title: String.fromCharCode(65 + i),
      width: 100,
      align: "left" as const,
    }));

    instanceRef.current = (jspreadsheet as any)(sheetRef.current, {
      data,
      columns,
      minDimensions: [26, 100],
      tableOverflow: true,
      tableWidth: "100%",
      tableHeight: "100%",
      defaultColWidth: 100,
      allowInsertRow: true,
      allowInsertColumn: true,
      allowDeleteRow: true,
      allowDeleteColumn: true,
      allowRenameColumn: true,
      allowComments: false,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      rowResize: true,
      rowDrag: true,
      search: true,
      csvFileName: "spreadsheet",
      about: false,
      parseFormulas: true,
      autoIncrement: true,
      // @ts-ignore
      toolbar: [
        { type: "i", content: "undo", onclick: function () { instanceRef.current?.undo(); } },
        { type: "i", content: "redo", onclick: function () { instanceRef.current?.redo(); } },
        { type: "select", k: "font-family", v: ["Arial", "Calibri", "Verdana", "Courier New", "Georgia", "Times New Roman", "Trebuchet MS", "Comic Sans MS"] },
        { type: "select", k: "font-size", v: ["8px", "9px", "10px", "11px", "12px", "14px", "16px", "18px", "20px", "24px", "28px", "36px", "48px"] },
        { type: "i", content: "format_bold", k: "font-weight", v: "bold" },
        { type: "i", content: "format_italic", k: "font-style", v: "italic" },
        { type: "i", content: "format_underlined", k: "text-decoration", v: "underline" },
        { type: "separator" },
        { type: "i", content: "format_align_left", k: "text-align", v: "left" },
        { type: "i", content: "format_align_center", k: "text-align", v: "center" },
        { type: "i", content: "format_align_right", k: "text-align", v: "right" },
        { type: "separator" },
        { type: "i", content: "format_color_text", k: "color" },
        { type: "i", content: "format_color_fill", k: "background-color" },
        { type: "separator" },
        { type: "i", content: "border_all", k: "border", v: "1px solid #000" },
        { type: "i", content: "border_clear", k: "border", v: "" },
      ],
      contextMenu: function (obj: any, x: any, y: any, e: any) {
        const items: any[] = [];
        if (y === null) {
          // Column context menu
          items.push({ title: "Insert column before", onclick: () => obj.insertColumn(1, parseInt(x), 1) });
          items.push({ title: "Insert column after", onclick: () => obj.insertColumn(1, parseInt(x), 0) });
          items.push({ title: "Delete column", onclick: () => obj.deleteColumn(parseInt(x)) });
          items.push({ title: "Rename column", onclick: () => obj.setHeader(parseInt(x)) });
          items.push({ title: "Sort ascending", onclick: () => obj.orderBy(parseInt(x), 0) });
          items.push({ title: "Sort descending", onclick: () => obj.orderBy(parseInt(x), 1) });
        } else if (x === null) {
          // Row context menu
          items.push({ title: "Insert row before", onclick: () => obj.insertRow(1, parseInt(y), 1) });
          items.push({ title: "Insert row after", onclick: () => obj.insertRow(1, parseInt(y), 0) });
          items.push({ title: "Delete row", onclick: () => obj.deleteRow(parseInt(y)) });
        } else {
          // Cell context menu
          items.push({ title: "Cut", shortcut: "Ctrl+X", onclick: () => obj.cut() });
          items.push({ title: "Copy", shortcut: "Ctrl+C", onclick: () => obj.copy() });
          items.push({ title: "Paste", shortcut: "Ctrl+V", onclick: () => obj.paste() });
          items.push({ type: "line" });
          items.push({ title: "Insert row before", onclick: () => obj.insertRow(1, parseInt(y), 1) });
          items.push({ title: "Insert row after", onclick: () => obj.insertRow(1, parseInt(y), 0) });
          items.push({ title: "Delete row", onclick: () => obj.deleteRow(parseInt(y)) });
          items.push({ type: "line" });
          items.push({ title: "Insert column before", onclick: () => obj.insertColumn(1, parseInt(x), 1) });
          items.push({ title: "Insert column after", onclick: () => obj.insertColumn(1, parseInt(x), 0) });
          items.push({ title: "Delete column", onclick: () => obj.deleteColumn(parseInt(x)) });
        }
        return items;
      },
    });

    return () => {
      if (instanceRef.current?.destroy) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(var(--card))] rounded-xl border border-white/10 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center h-8 px-3 border-b border-white/10" style={{ background: "hsl(140,40%,20%)" }}>
        <span className="text-xs text-white/80 font-body">MS Excel — Spreadsheet Editor</span>
        <span className="ml-auto text-[10px] text-white/40 font-body">
          Supports: SUM, AVERAGE, COUNT, MIN, MAX, IF, formulas & formatting
        </span>
      </div>

      {/* Spreadsheet container */}
      <div className="flex-1 overflow-hidden excel-container">
        <div ref={sheetRef} className="w-full h-full" />
      </div>

      {/* Sheet tabs */}
      <div className="flex items-center h-7 px-2 border-t border-white/10" style={{ background: "hsl(220,20%,14%)" }}>
        {sheets.map((sheet, i) => (
          <button
            key={i}
            onClick={() => setActiveSheet(i)}
            className={`px-3 py-1 text-[10px] font-body border-r border-white/10 transition-colors ${
              activeSheet === i
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {sheet.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JSpreadsheetExcel;
