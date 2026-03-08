import { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import "jsuites/dist/jsuites.css";
import { FileSpreadsheet } from "lucide-react";

const SimulatedExcelEditor = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (sheetRef.current && !instanceRef.current) {
      instanceRef.current = jspreadsheet(sheetRef.current, {
        data: [
          ["Item", "Price", "Qty", "Total"],
          ["Pencils", 5, 10, "=B2*C2"],
          ["Notebooks", 40, 3, "=B3*C3"],
          ["Erasers", 3, 10, "=B4*C4"],
          ["", "", "Total:", "=SUM(D2:D4)"],
          ...Array.from({ length: 45 }, () => ["", "", "", ""]),
        ],
        columns: [
          { type: "text" as any, width: 160 },
          { type: "numeric" as any, width: 100 },
          { type: "numeric" as any, width: 100 },
          { type: "numeric" as any, width: 120 },
          ...Array.from({ length: 8 }, () => ({ type: "text" as any, width: 100 })),
        ],
        minDimensions: [12, 50] as any,
        tableOverflow: true,
        tableWidth: "100%" as any,
        tableHeight: "100%" as any,
        defaultColWidth: 100,
        allowInsertRow: true,
        allowInsertColumn: true,
        allowDeleteRow: true,
        allowDeleteColumn: true,
        allowRenameColumn: true,
        columnSorting: true,
        search: true,
        style: {
          A1: "font-weight:bold;background-color:#1e40af;color:#fff;",
          B1: "font-weight:bold;background-color:#1e40af;color:#fff;",
          C1: "font-weight:bold;background-color:#1e40af;color:#fff;",
          D1: "font-weight:bold;background-color:#1e40af;color:#fff;",
          C5: "font-weight:bold;",
          D5: "font-weight:bold;background-color:#dbeafe;",
        },
      });
    }

    return () => {
      if (instanceRef.current) {
        try {
          if (sheetRef.current) {
            (jspreadsheet as any).destroy?.(sheetRef.current);
          }
        } catch { /* ignore */ }
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-xl border border-white/10 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center h-9 bg-[hsl(140,40%,25%)] px-3 gap-2">
        <FileSpreadsheet className="w-4 h-4 text-white" />
        <span className="text-xs text-white/90 font-body font-medium">Book1 — CodeChamps Excel</span>
        <div className="ml-auto text-[10px] text-white/60 font-body">Real Spreadsheet • Formulas • Sorting</div>
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-hidden jspreadsheet-container">
        <div ref={sheetRef} className="w-full h-full" />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[hsl(140,40%,25%)] flex items-center px-3 justify-between">
        <span className="text-[10px] text-white/70 font-body">Sheet1</span>
        <span className="text-[10px] text-white/70 font-body">Try: =SUM(B2:B4), =AVERAGE, Click column header to sort</span>
      </div>
    </div>
  );
};

export default SimulatedExcelEditor;
