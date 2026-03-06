import { useState, useRef, useCallback, useEffect } from "react";
import {
  Paintbrush, Eraser, PaintBucket, Pen, Type, Move,
  Square, Circle, Pipette, Crop, Wand2, Sparkles,
  ZoomIn, ZoomOut, RotateCw, Undo, Redo, Save, Layers,
  Plus, Minus, Eye, EyeOff, Trash2, Palette, Blend,
  MousePointer, Droplets, Airplay
} from "lucide-react";

type Tool = "brush" | "pencil" | "eraser" | "fill" | "text" | "rect" | "circle" | "select" | "move" | "eyedropper" | "spray" | "smudge";
type Layer = { id: string; name: string; visible: boolean; opacity: number; blend: string };

const BRUSHES: { key: Tool; icon: React.ElementType; label: string }[] = [
  { key: "move", icon: MousePointer, label: "Move" },
  { key: "select", icon: Square, label: "Selection" },
  { key: "brush", icon: Paintbrush, label: "Brush" },
  { key: "pencil", icon: Pen, label: "Pencil" },
  { key: "eraser", icon: Eraser, label: "Eraser" },
  { key: "fill", icon: PaintBucket, label: "Fill" },
  { key: "spray", icon: Airplay, label: "Spray" },
  { key: "smudge", icon: Droplets, label: "Smudge" },
  { key: "text", icon: Type, label: "Text" },
  { key: "rect", icon: Square, label: "Rectangle" },
  { key: "circle", icon: Circle, label: "Ellipse" },
  { key: "eyedropper", icon: Pipette, label: "Color Sampler" },
];

const BRUSH_PRESETS = [
  { name: "Hard Round", size: 5, opacity: 100 },
  { name: "Soft Round", size: 12, opacity: 80 },
  { name: "Calligraphy", size: 8, opacity: 100 },
  { name: "Airbrush", size: 20, opacity: 40 },
  { name: "Ink", size: 3, opacity: 100 },
  { name: "Watercolor", size: 15, opacity: 60 },
  { name: "Chalk", size: 10, opacity: 70 },
  { name: "Marker", size: 14, opacity: 90 },
];

const KRITA_COLORS = [
  "#000000", "#ffffff", "#e74c3c", "#c0392b", "#e67e22", "#d35400",
  "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#1abc9c", "#16a085",
  "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#e84393", "#d63031",
  "#fd79a8", "#fdcb6e", "#55efc4", "#74b9ff", "#a29bfe", "#dfe6e9",
  "#636e72", "#2d3436", "#b2bec3", "#95a5a6", "#fab1a0", "#ff7675",
];

const SimulatedKritaEditor = () => {
  const [activeTool, setActiveTool] = useState<Tool>("brush");
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [foreColor, setForeColor] = useState("#2d3436");
  const [backColor, setBackColor] = useState("#ffffff");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "bg", name: "Background", visible: true, opacity: 100, blend: "Normal" },
    { id: "l1", name: "Paint Layer 1", visible: true, opacity: 100, blend: "Normal" },
  ]);
  const [activeLayerId, setActiveLayerId] = useState("l1");
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [activeBrushPreset, setActiveBrushPreset] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scale = zoom / 100;
    return { x: (e.clientX - rect.left) / scale, y: (e.clientY - rect.top) / scale };
  };

  const draw = useCallback((e: React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalAlpha = opacity / 100;

    if (activeTool === "brush" || activeTool === "pencil") {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = foreColor;
      ctx.beginPath();
      const s = activeTool === "pencil" ? Math.max(1, brushSize / 3) : brushSize;
      ctx.arc(x, y, s / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (activeTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    } else if (activeTool === "spray") {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = foreColor;
      for (let i = 0; i < 10; i++) {
        const offX = (Math.random() - 0.5) * brushSize * 3;
        const offY = (Math.random() - 0.5) * brushSize * 3;
        ctx.fillRect(x + offX, y + offY, 1, 1);
      }
    }
    ctx.globalAlpha = 1;
  }, [isDrawing, activeTool, foreColor, brushSize, opacity, zoom]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalAlpha = opacity / 100;

    if (activeTool === "fill") {
      ctx.fillStyle = foreColor;
      ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    } else if (activeTool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        ctx.fillStyle = foreColor;
        ctx.font = `${brushSize * 3}px sans-serif`;
        ctx.fillText(text, x, y);
      }
    } else if (activeTool === "rect") {
      ctx.strokeStyle = foreColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 100, 60);
    } else if (activeTool === "circle") {
      ctx.strokeStyle = foreColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, 50, 35, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      draw(e);
    }
    ctx.globalAlpha = 1;
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height); }
  };

  const addLayer = () => {
    const id = `l${Date.now()}`;
    setLayers((p) => [...p, { id, name: `Paint Layer ${p.length}`, visible: true, opacity: 100, blend: "Normal" }]);
    setActiveLayerId(id);
  };

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,20%,10%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center h-7 bg-[hsl(220,25%,14%)] px-2 gap-1 border-b border-white/10">
        <Sparkles className="w-3.5 h-3.5 text-purple-400 mr-1" />
        <span className="text-xs text-white/80 font-body">Untitled - CodeChamps Krita</span>
        <div className="ml-auto flex gap-1">
          <button className="p-1 text-white/50 hover:text-white"><Undo className="w-3 h-3" /></button>
          <button className="p-1 text-white/50 hover:text-white"><Redo className="w-3 h-3" /></button>
          <button className="p-1 text-white/50 hover:text-white"><Save className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Tool Options */}
      <div className="h-8 bg-[hsl(220,22%,13%)] border-b border-white/10 flex items-center px-2 gap-3">
        <span className="text-[10px] text-purple-400 font-body">{BRUSHES.find((b) => b.key === activeTool)?.label}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="text-[10px] text-white/30">Size:</span>
        <input type="range" min={1} max={60} value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="w-16 h-1 accent-purple-400" />
        <span className="text-[10px] text-white/50 w-4">{brushSize}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="text-[10px] text-white/30">Opacity:</span>
        <input type="range" min={1} max={100} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-16 h-1 accent-purple-400" />
        <span className="text-[10px] text-white/50 w-6">{opacity}%</span>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setZoom((z) => Math.max(25, z - 25))} className="p-0.5 text-white/40 hover:text-white"><ZoomOut className="w-3 h-3" /></button>
          <span className="text-[10px] text-white/50 w-8 text-center">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(400, z + 25))} className="p-0.5 text-white/40 hover:text-white"><ZoomIn className="w-3 h-3" /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tool Sidebar */}
        <div className="w-10 bg-[hsl(220,28%,8%)] border-r border-white/10 flex flex-col items-center py-1 gap-0.5 overflow-y-auto">
          {BRUSHES.map((b) => {
            const Icon = b.icon;
            return (
              <button key={b.key} onClick={() => setActiveTool(b.key)} title={b.label}
                className={`w-8 h-8 flex items-center justify-center rounded transition-all ${activeTool === b.key ? "bg-purple-500/20 text-purple-400" : "text-white/40 hover:bg-white/10 hover:text-white"}`}>
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
          <div className="mt-auto mb-2 flex flex-col items-center gap-1">
            <div className="relative w-7 h-7">
              <input type="color" value={foreColor} onChange={(e) => setForeColor(e.target.value)}
                className="absolute top-0 left-0 w-5 h-5 rounded cursor-pointer border border-white/30" />
              <input type="color" value={backColor} onChange={(e) => setBackColor(e.target.value)}
                className="absolute bottom-0 right-0 w-5 h-5 rounded cursor-pointer border border-white/30" />
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-[hsl(220,8%,16%)] overflow-auto flex items-center justify-center p-4"
          style={{ backgroundImage: "radial-gradient(circle, hsl(220,10%,20%) 1px, transparent 0)", backgroundSize: "24px 24px" }}>
          <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}>
            <canvas
              ref={canvasRef}
              width={700}
              height={450}
              className="rounded border border-white/10 cursor-crosshair shadow-2xl"
              onMouseDown={handleMouseDown}
              onMouseMove={draw}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-48 bg-[hsl(220,25%,9%)] border-l border-white/10 flex flex-col overflow-hidden">
          {/* Brush Presets */}
          <div className="p-2 border-b border-white/10">
            <h4 className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1.5 flex items-center gap-1"><Paintbrush className="w-3 h-3" /> Brush Presets</h4>
            <div className="space-y-0.5 max-h-32 overflow-y-auto">
              {BRUSH_PRESETS.map((bp, i) => (
                <button key={i} onClick={() => { setActiveBrushPreset(i); setBrushSize(bp.size); setOpacity(bp.opacity); setActiveTool("brush"); }}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded text-[10px] ${activeBrushPreset === i ? "bg-purple-500/15 text-purple-300" : "text-white/50 hover:bg-white/5"}`}>
                  <div className="w-3 h-3 rounded-full bg-current" style={{ opacity: bp.opacity / 100, transform: `scale(${0.4 + (bp.size / 60) * 0.6})` }} />
                  <span>{bp.name}</span>
                  <span className="ml-auto text-white/30">{bp.size}px</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="p-2 border-b border-white/10">
            <h4 className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1.5 flex items-center gap-1"><Palette className="w-3 h-3" /> Palette</h4>
            <div className="grid grid-cols-6 gap-0.5">
              {KRITA_COLORS.map((c) => (
                <button key={c} onClick={() => setForeColor(c)}
                  className={`w-5 h-5 rounded-sm border hover:scale-110 transition-transform ${foreColor === c ? "border-purple-400 ring-1 ring-purple-400/50" : "border-white/10"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Layers */}
          <div className="flex-1 p-2 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-[10px] text-white/40 font-body uppercase tracking-wider flex items-center gap-1"><Layers className="w-3 h-3" /> Layers</h4>
              <button onClick={addLayer} className="p-0.5 text-white/40 hover:text-white"><Plus className="w-3 h-3" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-0.5">
              {[...layers].reverse().map((l) => (
                <div key={l.id} onClick={() => setActiveLayerId(l.id)}
                  className={`flex items-center gap-1 px-1.5 py-1 rounded text-[10px] cursor-pointer ${activeLayerId === l.id ? "bg-purple-500/10 text-white" : "text-white/40 hover:bg-white/5"}`}>
                  <button onClick={(e) => { e.stopPropagation(); setLayers((p) => p.map((x) => x.id === l.id ? { ...x, visible: !x.visible } : x)); }}>
                    {l.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                  <span className="flex-1 truncate">{l.name}</span>
                  {l.id !== "bg" && (
                    <button onClick={(e) => { e.stopPropagation(); setLayers((p) => p.filter((x) => x.id !== l.id)); }} className="hover:text-red-400"><Trash2 className="w-2.5 h-2.5" /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-2 border-t border-white/10 flex gap-1">
            <button onClick={clearCanvas} className="flex-1 text-[10px] py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">Clear</button>
            <button onClick={() => { setForeColor("#000000"); setBrushSize(5); setOpacity(100); }} className="flex-1 text-[10px] py-1 rounded bg-white/5 text-white/50 border border-white/10 hover:bg-white/10">Reset</button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[hsl(220,30%,8%)] border-t border-white/10 flex items-center px-3 justify-between">
        <span className="text-[9px] text-white/40 font-body">700 × 450 px | RGBA | 8-bit</span>
        <span className="text-[9px] text-white/40 font-body">Brush: {BRUSH_PRESETS[activeBrushPreset].name} | Zoom: {zoom}%</span>
      </div>
    </div>
  );
};

export default SimulatedKritaEditor;
