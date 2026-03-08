const SimulatedExcelEditor = () => (
  <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
    <div className="flex items-center h-8 bg-[hsl(140,40%,20%)] px-3 gap-2 border-b border-white/10">
      <span className="text-xs text-white/80 font-body">MS Excel Spreadsheet — Powered by EtherCalc</span>
    </div>
    <iframe
      src="https://ethercalc.net/_new"
      className="flex-1 w-full border-0"
      title="MS Excel Editor (EtherCalc)"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
      loading="lazy"
    />
  </div>
);

export default SimulatedExcelEditor;
