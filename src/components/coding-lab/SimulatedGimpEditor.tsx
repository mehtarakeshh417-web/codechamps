import { useEffect, useRef } from "react";

const SimulatedGimpEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Load the paint web component via unpkg
    const existing = document.querySelector('script[data-paint-wc]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@christianliebel/paint/dist/elements/index.js";
      script.type = "module";
      script.setAttribute("data-paint-wc", "true");
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center h-8 bg-[hsl(220,25%,14%)] px-3 gap-2 border-b border-white/10">
        <span className="text-xs text-white/80 font-body">GIMP Image Editor — Powered by Paint.js</span>
      </div>
      <div ref={containerRef} className="flex-1 w-full bg-white overflow-hidden">
        {/* @ts-ignore - web component */}
        <paint-app style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default SimulatedGimpEditor;
