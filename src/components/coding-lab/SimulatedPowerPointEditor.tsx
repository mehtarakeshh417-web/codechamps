import { useState, useRef } from "react";
import {
  Plus, Trash2, Copy, Type, Square, Circle, Triangle, Image, Play,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  ChevronLeft, ChevronRight, Undo, Redo, Save, Presentation,
  Palette, Move, MousePointer, Minus
} from "lucide-react";

type SlideElement = {
  id: string;
  type: "text" | "shape" | "image";
  x: number; y: number; width: number; height: number;
  content?: string;
  shape?: "rect" | "circle" | "triangle";
  color?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
};

type Slide = {
  id: string;
  elements: SlideElement[];
  bg: string;
};

const SLIDE_COLORS = ["#1a1a2e", "#16213e", "#0f3460", "#533483", "#2b2d42", "#ffffff", "#f0f0f0", "#1e3a5f"];
const SHAPE_COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22", "#1abc9c", "#ecf0f1"];

let idCounter = 0;
const uid = () => `el-${++idCounter}`;

const SimulatedPowerPointEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "s1",
      bg: "#1a1a2e",
      elements: [
        { id: uid(), type: "text", x: 80, y: 100, width: 500, height: 60, content: "Welcome to CodeChamps", fontSize: 36, bold: true, color: "#ffffff" },
        { id: uid(), type: "text", x: 120, y: 200, width: 400, height: 40, content: "Click to add subtitle", fontSize: 20, color: "#cccccc" },
        { id: uid(), type: "shape", x: 250, y: 280, width: 120, height: 80, shape: "rect", color: "#3498db" },
      ],
    },
  ]);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [selectedElId, setSelectedElId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeSlideIdx];
  const selectedEl = activeSlide?.elements.find((e) => e.id === selectedElId);

  const updateSlides = (fn: (s: Slide[]) => Slide[]) => setSlides(fn);
  const updateActiveSlide = (fn: (s: Slide) => Slide) => {
    setSlides((prev) => prev.map((s, i) => (i === activeSlideIdx ? fn(s) : s)));
  };

  const addSlide = () => {
    const newSlide: Slide = { id: `s${slides.length + 1}`, bg: "#1a1a2e", elements: [] };
    setSlides((p) => [...p, newSlide]);
    setActiveSlideIdx(slides.length);
    setSelectedElId(null);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    setSlides((p) => p.filter((_, i) => i !== activeSlideIdx));
    setActiveSlideIdx(Math.max(0, activeSlideIdx - 1));
    setSelectedElId(null);
  };

  const addElement = (type: SlideElement["type"], extra?: Partial<SlideElement>) => {
    const el: SlideElement = {
      id: uid(), type, x: 100 + Math.random() * 200, y: 100 + Math.random() * 150,
      width: type === "text" ? 300 : 100, height: type === "text" ? 40 : 80,
      content: type === "text" ? "New text" : undefined,
      color: type === "shape" ? "#3498db" : "#ffffff",
      fontSize: 18, ...extra,
    };
    updateActiveSlide((s) => ({ ...s, elements: [...s.elements, el] }));
    setSelectedElId(el.id);
  };

  const updateElement = (id: string, updates: Partial<SlideElement>) => {
    updateActiveSlide((s) => ({
      ...s,
      elements: s.elements.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const deleteElement = () => {
    if (!selectedElId) return;
    updateActiveSlide((s) => ({ ...s, elements: s.elements.filter((e) => e.id !== selectedElId) }));
    setSelectedElId(null);
  };

  const handleMouseDown = (e: React.MouseEvent, elId: string) => {
    e.stopPropagation();
    setSelectedElId(elId);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const el = activeSlide.elements.find((e) => e.id === elId);
    if (!el) return;
    const scaleX = 660 / 960;
    setDragging({ id: elId, offX: e.clientX - rect.left - el.x * scaleX, offY: e.clientY - rect.top - el.y * scaleX });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = 660 / 960;
    const newX = (e.clientX - rect.left - dragging.offX) / scaleX;
    const newY = (e.clientY - rect.top - dragging.offY) / scaleX;
    updateElement(dragging.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
  };

  const handleMouseUp = () => setDragging(null);

  const tabs = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "design", label: "Design" },
    { key: "transitions", label: "Transitions" },
    { key: "slideshow", label: "Slide Show" },
  ];

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center h-8 bg-[hsl(15,70%,40%)] px-3 gap-2 border-b border-white/10">
        <Presentation className="w-4 h-4 text-white" />
        <span className="text-xs text-white/90 font-body">Presentation1 - CodeChamps PowerPoint</span>
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
            className={`px-3 py-1.5 text-xs font-body border-b-2 ${activeTab === t.key ? "border-orange-400 text-orange-400" : "border-transparent text-white/60 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[hsl(220,28%,14%)] border-b border-white/10 px-2 py-1.5 flex items-center gap-1 min-h-[44px] flex-wrap">
        {activeTab === "home" && (
          <>
            <button onClick={() => addElement("text")} className="flex items-center gap-1 px-2 py-1 rounded text-xs text-white/60 hover:bg-white/10"><Type className="w-3.5 h-3.5" /> Text</button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            {selectedEl && (
              <>
                <button onClick={() => updateElement(selectedElId!, { bold: !selectedEl.bold })} className={`p-1.5 rounded ${selectedEl.bold ? "bg-orange-500/20 text-orange-400" : "text-white/60 hover:bg-white/10"}`}><Bold className="w-3.5 h-3.5" /></button>
                <button onClick={() => updateElement(selectedElId!, { italic: !selectedEl.italic })} className={`p-1.5 rounded ${selectedEl.italic ? "bg-orange-500/20 text-orange-400" : "text-white/60 hover:bg-white/10"}`}><Italic className="w-3.5 h-3.5" /></button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button onClick={deleteElement} className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-400 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
              </>
            )}
          </>
        )}
        {activeTab === "insert" && (
          <>
            <button onClick={() => addElement("text")} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-white/60 hover:bg-white/10"><Type className="w-4 h-4" /><span className="text-[10px]">Text Box</span></button>
            <button onClick={() => addElement("shape", { shape: "rect" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-white/60 hover:bg-white/10"><Square className="w-4 h-4" /><span className="text-[10px]">Rectangle</span></button>
            <button onClick={() => addElement("shape", { shape: "circle", color: "#2ecc71" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-white/60 hover:bg-white/10"><Circle className="w-4 h-4" /><span className="text-[10px]">Circle</span></button>
            <button onClick={() => addElement("shape", { shape: "triangle", color: "#f1c40f" })} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-white/60 hover:bg-white/10"><Triangle className="w-4 h-4" /><span className="text-[10px]">Triangle</span></button>
            <button onClick={() => addElement("image")} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded text-white/60 hover:bg-white/10"><Image className="w-4 h-4" /><span className="text-[10px]">Image</span></button>
          </>
        )}
        {activeTab === "design" && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs text-white/50 font-body">Background:</span>
            {SLIDE_COLORS.map((c) => (
              <button key={c} onClick={() => updateActiveSlide((s) => ({ ...s, bg: c }))}
                className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${activeSlide.bg === c ? "border-orange-400" : "border-white/20"}`}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        {activeTab === "transitions" && (
          <div className="flex items-center gap-2 px-1 text-xs text-white/50">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 cursor-pointer hover:border-orange-400">None</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 cursor-pointer hover:border-orange-400">Fade</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 cursor-pointer hover:border-orange-400">Push</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 cursor-pointer hover:border-orange-400">Wipe</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 cursor-pointer hover:border-orange-400">Zoom</span>
          </div>
        )}
        {activeTab === "slideshow" && (
          <button className="flex items-center gap-2 px-4 py-1.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 text-xs">
            <Play className="w-4 h-4" /> From Beginning
          </button>
        )}
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Panel */}
        <div className="w-36 bg-[hsl(220,25%,10%)] border-r border-white/10 overflow-y-auto p-2 flex flex-col gap-2">
          {slides.map((s, i) => (
            <div
              key={s.id}
              onClick={() => { setActiveSlideIdx(i); setSelectedElId(null); }}
              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all aspect-[16/9] ${
                i === activeSlideIdx ? "border-orange-400 shadow-lg shadow-orange-500/20" : "border-white/10 hover:border-white/30"
              }`}
              style={{ backgroundColor: s.bg }}
            >
              <div className="absolute bottom-0.5 left-1 text-[8px] text-white/40">{i + 1}</div>
              {/* Mini preview of elements */}
              {s.elements.map((el) => (
                <div key={el.id} className="absolute" style={{
                  left: `${(el.x / 960) * 100}%`, top: `${(el.y / 540) * 100}%`,
                  width: `${(el.width / 960) * 100}%`, height: `${(el.height / 540) * 100}%`,
                }}>
                  {el.type === "text" && <div className="text-[4px] text-white/70 truncate">{el.content}</div>}
                  {el.type === "shape" && (
                    el.shape === "circle" ? <div className="w-full h-full rounded-full" style={{ backgroundColor: el.color }} />
                      : <div className="w-full h-full rounded-sm" style={{ backgroundColor: el.color }} />
                  )}
                </div>
              ))}
            </div>
          ))}
          <button onClick={addSlide} className="flex items-center justify-center gap-1 py-2 rounded-lg border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 text-xs">
            <Plus className="w-3 h-3" /> Add Slide
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-[hsl(220,15%,20%)] flex items-center justify-center p-4 overflow-auto">
          <div
            ref={canvasRef}
            className="relative rounded-lg shadow-2xl cursor-crosshair select-none"
            style={{ width: 660, height: 371, backgroundColor: activeSlide.bg }}
            onClick={() => setSelectedElId(null)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {activeSlide.elements.map((el) => {
              const scale = 660 / 960;
              const isSelected = el.id === selectedElId;
              return (
                <div
                  key={el.id}
                  className={`absolute cursor-move ${isSelected ? "ring-2 ring-orange-400 ring-offset-1 ring-offset-transparent" : ""}`}
                  style={{
                    left: el.x * scale, top: el.y * scale,
                    width: el.width * scale, height: el.height * scale,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {el.type === "text" && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="w-full h-full outline-none"
                      style={{
                        color: el.color || "#fff",
                        fontSize: (el.fontSize || 18) * scale,
                        fontWeight: el.bold ? "bold" : "normal",
                        fontStyle: el.italic ? "italic" : "normal",
                        lineHeight: 1.3,
                      }}
                      onInput={(e) => updateElement(el.id, { content: (e.target as HTMLDivElement).textContent || "" })}
                    >
                      {el.content}
                    </div>
                  )}
                  {el.type === "shape" && (
                    <>
                      {el.shape === "circle" ? (
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: el.color }} />
                      ) : el.shape === "triangle" ? (
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <polygon points="50,5 95,95 5,95" fill={el.color} />
                        </svg>
                      ) : (
                        <div className="w-full h-full rounded-sm" style={{ backgroundColor: el.color }} />
                      )}
                      {isSelected && (
                        <div className="absolute -bottom-6 left-0 flex gap-1">
                          {SHAPE_COLORS.slice(0, 6).map((c) => (
                            <button key={c} onClick={() => updateElement(el.id, { color: c })}
                              className="w-3.5 h-3.5 rounded-full border border-white/30 hover:scale-125 transition-transform"
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {el.type === "image" && (
                    <div className="w-full h-full border-2 border-dashed border-white/30 rounded flex items-center justify-center">
                      <Image className="w-6 h-6 text-white/30" />
                    </div>
                  )}
                  {isSelected && (
                    <>
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-400 rounded-full" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full" />
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedEl && (
          <div className="w-48 bg-[hsl(220,25%,10%)] border-l border-white/10 p-3 overflow-y-auto">
            <h4 className="text-xs text-white/50 font-body uppercase tracking-wider mb-3">Properties</h4>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-white/40 font-body">Type</label>
                <p className="text-xs text-white/80 capitalize">{selectedEl.type}</p>
              </div>
              <div>
                <label className="text-[10px] text-white/40 font-body">Position</label>
                <p className="text-xs text-white/60">X: {Math.round(selectedEl.x)} Y: {Math.round(selectedEl.y)}</p>
              </div>
              <div>
                <label className="text-[10px] text-white/40 font-body">Size</label>
                <p className="text-xs text-white/60">W: {selectedEl.width} H: {selectedEl.height}</p>
              </div>
              {selectedEl.type === "text" && (
                <div>
                  <label className="text-[10px] text-white/40 font-body">Font Size</label>
                  <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => updateElement(selectedElId!, { fontSize: Math.max(8, (selectedEl.fontSize || 18) - 2) })} className="p-0.5 text-white/40 hover:text-white"><Minus className="w-3 h-3" /></button>
                    <span className="text-xs text-white/70 w-6 text-center">{selectedEl.fontSize}</span>
                    <button onClick={() => updateElement(selectedElId!, { fontSize: (selectedEl.fontSize || 18) + 2 })} className="p-0.5 text-white/40 hover:text-white"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              )}
              <button onClick={deleteElement} className="w-full flex items-center justify-center gap-1 py-1.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs hover:bg-red-500/20">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[hsl(220,30%,10%)] border-t border-white/10 flex items-center px-3 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40 font-body">Slide {activeSlideIdx + 1} of {slides.length}</span>
          <button onClick={deleteSlide} className="text-[10px] text-red-400/60 hover:text-red-400 font-body">Delete Slide</button>
        </div>
        <span className="text-[10px] text-white/40 font-body">{activeSlide.elements.length} objects</span>
      </div>
    </div>
  );
};

export default SimulatedPowerPointEditor;
