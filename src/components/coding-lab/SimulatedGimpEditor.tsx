const SimulatedGimpEditor = () => (
  <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
    <div className="flex items-center h-8 bg-[hsl(220,25%,14%)] px-3 gap-2 border-b border-white/10">
      <span className="text-xs text-white/80 font-body">GIMP Image Editor — Powered by Photopea</span>
    </div>
    <iframe
      src={"https://www.photopea.com#" + encodeURIComponent(JSON.stringify({environment:{theme:1},script:"app.newDocument(1024,768,'GIMP Project',null,72,'RGB');app.activeDocument.flatten();"}))}
      className="flex-1 w-full border-0"
      title="GIMP Image Editor"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
      loading="lazy"
    />
  </div>
);

export default SimulatedGimpEditor;
