import { useState, useRef, useEffect, useCallback } from "react";
import {
  MousePointer, Square, Circle, Paintbrush, Eraser, PaintBucket,
  Pipette, Type, Move, Scissors, Crop, Wand2, Pen,
  ZoomIn, ZoomOut, RotateCw, FlipHorizontal, FlipVertical,
  Undo, Redo, Save, Layers, Plus, Minus, Eye, EyeOff, Trash2,
  Grid3X3, Palette, Image as ImageIcon
} from "lucide-react";

type Tool = "pointer" | "brush" | "eraser" | "fill" | "text" | "rect" | "circle" | "line" | "select" | "crop" | "eyedropper" | "move";
type Layer = { id: string; name: string; visible: boolean; opacity: number };

const TOOL_LIST: { key: Tool; icon: React.ElementType; label: string }[] = [
  { key: "pointer", icon: MousePointer, label: "Move" },
  { key: "select", icon: Square, label: "Rectangle Select" },
  { key: "crop", icon: Crop, label: "Crop" },
  { key: "move", icon: Move, label: "Move" },
  { key: "brush", icon: Paintbrush, label: "Paintbrush" },
  { key: "eraser", icon: Eraser, label: "Eraser" },
  { key: "fill", icon: PaintBucket, label: "Bucket Fill" },
  { key: "eyedropper", icon: Pipette, label: "Color Picker" },
  { key: "text", icon: Type, label: "Text" },
  { key: "rect", icon: Square, label: "Rectangle" },
  { key: "circle", icon: Circle, label: "Ellipse" },
  { key: "line", icon: Pen, label: "Pencil" },
];

const COLOR_PALETTE = [
  "#000000", "#ffffff", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71",
  "#1abc9c", "#3498db", "#9b59b6", "#e84393", "#636e72", "#2d3436",
  "#fd79a8", "#fdcb6e", "#00cec9", "#6c5ce7", "#a29bfe", "#dfe6e9",
  "#b2bec3", "#74b9ff", "#55efc4", "#ff7675", "#fab1a0", "#ffeaa7",
];

const SimulatedGimpEditor = () => {
  const [activeTool, setActiveTool] = useState<Tool>("brush");
  const [brushSize, setBrushSize] = useState(5);
  const [foreColor, setForeColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#ffffff");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "bg", name: "Background", visible: true, opacity: 100 },
    { id: "l1", name: "Layer 1", visible: true, opacity: 100 },
  ]);
  const [activeLayerId, setActiveLayerId] = useState("l1");
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Checkerboard background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += 16) {
      for (let y = 0; y < canvas.height; y += 16) {
        if ((x / 16 + y / 16) % 2 === 0) {
          ctx.fillStyle = "#f0f0f0";
          ctx.fillRect(x, y, 16, 16);
        }
      }
    }
  }, []);

  const getCanvasPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const draw = useCallback((e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasPos(e);

    if (activeTool === "brush") {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = foreColor;
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (activeTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    } else if (activeTool === "line") {
      ctx.fillStyle = foreColor;
      ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
    }
  }, [isDrawing, activeTool, foreColor, brushSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasPos(e);

    if (activeTool === "fill") {
      ctx.fillStyle = foreColor;
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
    } else if (activeTool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        ctx.fillStyle = foreColor;
        ctx.font = `${brushSize * 3}px Arial`;
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
  };

  const addLayer = () => {
    const id = `l${Date.now()}`;
    setLayers((p) => [...p, { id, name: `Layer ${p.length + 1}`, visible: true, opacity: 100 }]);
    setActiveLayerId(id);
  };

  const toggleLayerVisibility = (id: string) => {
    setLayers((p) => p.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  };

  const deleteLayer = (id: string) => {
    if (layers.length <= 1) return;
    setLayers((p) => p.filter((l) => l.id !== id));
    if (activeLayerId === id) setActiveLayerId(layers[0].id);
  };

  const tabs = [
    { key: "file", label: "File" },
    { key: "edit", label: "Edit" },
    { key: "image", label: "Image" },
    { key: "filters", label: "Filters" },
    { key: "view", label: "View" },
  ];

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Menu Bar */}
      <div className="flex items-center h-7 bg-[hsl(220,25%,14%)] px-2 gap-1 border-b border-white/10">
        <ImageIcon className="w-3.5 h-3.5 text-white/60 mr-1" />
        {tabs.map((t) => (
          <button key={t.key} className="px-2.5 py-0.5 text-[11px] text-white/60 hover:text-white hover:bg-white/10 rounded font-body">{t.label}</button>
        ))}
        <div className="ml-auto flex gap-1">
          <button className="p-1 text-white/50 hover:text-white"><Undo className="w-3 h-3" /></button>
          <button className="p-1 text-white/50 hover:text-white"><Redo className="w-3 h-3" /></button>
          <button className="p-1 text-white/50 hover:text-white"><Save className="w-3 h-3" /></button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tool Panel */}
        <div className="w-10 bg-[hsl(220,30%,10%)] border-r border-white/10 flex flex-col items-center py-1 gap-0.5 overflow-y-auto">
          {TOOL_LIST.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTool(t.key)}
                title={t.label}
                className={`w-8 h-8 flex items-center justify-center rounded transition-all ${
                  activeTool === t.key ? "bg-white/15 text-white shadow-inner" : "text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}

          <div className="mt-auto mb-2 flex flex-col items-center gap-1">
            {/* Fore/back color */}
            <div className="relative w-7 h-7">
              <input type="color" value={foreColor} onChange={(e) => setForeColor(e.target.value)}
                className="absolute top-0 left-0 w-5 h-5 rounded border border-white/30 cursor-pointer" style={{ backgroundColor: foreColor }} />
              <input type="color" value={backColor} onChange={(e) => setBackColor(e.target.value)}
                className="absolute bottom-0 right-0 w-5 h-5 rounded border border-white/30 cursor-pointer" style={{ backgroundColor: backColor }} />
            </div>
          </div>
        </div>

        {/* Tool Options Bar */}
        <div className="flex-1 flex flex-col">
          <div className="h-8 bg-[hsl(220,25%,13%)] border-b border-white/10 flex items-center px-2 gap-3">
            <span className="text-[10px] text-white/40 font-body uppercase">{TOOL_LIST.find((t) => t.key === activeTool)?.label}</span>
            {(activeTool === "brush" || activeTool === "eraser" || activeTool === "line") && (
              <>
                <span className="text-[10px] text-white/30">Size:</span>
                <input type="range" min={1} max={50} value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20 h-1 accent-white/60" />
                <span className="text-[10px] text-white/50 w-5">{brushSize}</span>
              </>
            )}
            <div className="ml-auto flex items-center gap-1">
              <button onClick={() => setZoom((z) => Math.max(25, z - 25))} className="p-0.5 text-white/40 hover:text-white"><ZoomOut className="w-3 h-3" /></button>
              <span className="text-[10px] text-white/50 w-8 text-center">{zoom}%</span>
              <button onClick={() => setZoom((z) => Math.min(400, z + 25))} className="p-0.5 text-white/40 hover:text-white"><ZoomIn className="w-3 h-3" /></button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-[hsl(220,10%,18%)] overflow-auto flex items-center justify-center p-4"
            style={{ backgroundImage: "radial-gradient(circle at 16px 16px, hsl(220,10%,22%) 1px, transparent 0)", backgroundSize: "32px 32px" }}>
            <div className="shadow-2xl" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}>
              <canvas
                ref={canvasRef}
                width={640}
                height={400}
                className="cursor-crosshair rounded border border-white/10"
                onMouseDown={handleMouseDown}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
              />
            </div>
          </div>
        </div>

        {/* Right Panels */}
        <div className="w-44 bg-[hsl(220,25%,10%)] border-l border-white/10 flex flex-col">
          {/* Color Palette */}
          <div className="p-2 border-b border-white/10">
            <h4 className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1.5 flex items-center gap-1"><Palette className="w-3 h-3" /> Colors</h4>
            <div className="grid grid-cols-6 gap-1">
              {COLOR_PALETTE.map((c) => (
                <button key={c} onClick={() => setForeColor(c)}
                  className={`w-5 h-5 rounded border hover:scale-110 transition-transform ${foreColor === c ? "border-white ring-1 ring-white/50" : "border-white/20"}`}
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
                <div
                  key={l.id}
                  onClick={() => setActiveLayerId(l.id)}
                  className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[10px] cursor-pointer transition-all ${
                    activeLayerId === l.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5"
                  }`}
                >
                  <button onClick={(e) => { e.stopPropagation(); toggleLayerVisibility(l.id); }} className="hover:text-white">
                    {l.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                  <span className="flex-1 truncate">{l.name}</span>
                  {l.id !== "bg" && (
                    <button onClick={(e) => { e.stopPropagation(); deleteLayer(l.id); }} className="hover:text-red-400"><Trash2 className="w-2.5 h-2.5" /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brush preview */}
          <div className="p-2 border-t border-white/10">
            <h4 className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1">Brush Preview</h4>
            <div className="h-12 bg-white/5 rounded flex items-center justify-center">
              <div className="rounded-full" style={{ width: brushSize * 2, height: brushSize * 2, backgroundColor: foreColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[hsl(220,30%,10%)] border-t border-white/10 flex items-center px-3 justify-between">
        <span className="text-[9px] text-white/40 font-body">640 × 400 px | RGB</span>
        <span className="text-[9px] text-white/40 font-body">Zoom: {zoom}%</span>
      </div>
    </div>
  );
};

export default SimulatedGimpEditor;
