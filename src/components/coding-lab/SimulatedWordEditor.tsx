import { useState, useCallback } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Image, Type, Heading1, Heading2, Heading3,
  Undo, Redo, Printer, Save, FileText, ChevronDown, Minus, Plus,
  Strikethrough, Subscript, Superscript, Paintbrush, Highlighter,
  Table, Link2, Pilcrow, IndentIncrease, IndentDecrease, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];
const FONTS = ["Arial", "Times New Roman", "Calibri", "Georgia", "Verdana", "Courier New", "Comic Sans MS", "Impact"];
const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#cccccc", "#ffffff",
  "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc",
  "#8e7cc3", "#c27ba0", "#cc0000", "#e69138", "#f1c232", "#6aa84f",
  "#45818e", "#3d85c6", "#674ea7", "#a64d79",
];

type TabKey = "home" | "insert" | "layout" | "view";

const SimulatedWordEditor = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("Calibri");
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [zoom, setZoom] = useState(100);

  const execCmd = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
  }, []);

  const ribbonTabs: { key: TabKey; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "insert", label: "Insert" },
    { key: "layout", label: "Layout" },
    { key: "view", label: "View" },
  ];

  const ToolBtn = ({ icon: Icon, label, onClick, active }: { icon: React.ElementType; label: string; onClick?: () => void; active?: boolean }) => (
    <button
      onClick={onClick}
      title={label}
      className={`flex flex-col items-center justify-center p-1.5 rounded-md transition-all text-[10px] gap-0.5 min-w-[40px]
        ${active ? "bg-primary/20 text-primary" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
    >
      <Icon className="w-4 h-4" />
      <span className="leading-none">{label}</span>
    </button>
  );

  const Divider = () => <div className="w-px h-12 bg-white/10 mx-1" />;

  return (
    <div className="flex flex-col h-[650px] bg-[hsl(220,25%,12%)] rounded-xl border border-white/10 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center h-8 bg-[hsl(220,30%,18%)] px-3 gap-2 border-b border-white/10">
        <FileText className="w-4 h-4 text-primary" />
        <span className="text-xs text-white/80 font-body">Document1 - CodeChamps Word</span>
        <div className="ml-auto flex gap-1">
          <button onClick={() => execCmd("undo")} title="Undo" className="p-1 text-white/50 hover:text-white"><Undo className="w-3.5 h-3.5" /></button>
          <button onClick={() => execCmd("redo")} title="Redo" className="p-1 text-white/50 hover:text-white"><Redo className="w-3.5 h-3.5" /></button>
          <button title="Save" className="p-1 text-white/50 hover:text-white"><Save className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <div className="flex items-center bg-[hsl(220,28%,15%)] px-2 border-b border-white/10">
        {ribbonTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-1.5 text-xs font-body transition-all border-b-2 ${
              activeTab === t.key ? "border-primary text-primary" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[hsl(220,28%,14%)] border-b border-white/10 px-2 py-1.5 flex items-center gap-1 flex-wrap min-h-[56px]">
        {activeTab === "home" && (
          <>
            {/* Clipboard */}
            <div className="flex items-center gap-0.5 px-1">
              <ToolBtn icon={Paintbrush} label="Paste" onClick={() => execCmd("paste")} />
            </div>
            <Divider />

            {/* Font group */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    onClick={() => { setShowFontDropdown(!showFontDropdown); setShowSizeDropdown(false); }}
                    className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-white/80 min-w-[100px]"
                  >
                    <span style={{ fontFamily }}>{fontFamily}</span>
                    <ChevronDown className="w-3 h-3 ml-auto" />
                  </button>
                  {showFontDropdown && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-[hsl(220,25%,15%)] border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto w-48">
                      {FONTS.map((f) => (
                        <button key={f} onClick={() => { setFontFamily(f); execCmd("fontName", f); setShowFontDropdown(false); }}
                          className="block w-full text-left px-3 py-1.5 text-xs text-white/70 hover:bg-primary/20 hover:text-white" style={{ fontFamily: f }}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => { setShowSizeDropdown(!showSizeDropdown); setShowFontDropdown(false); }}
                    className="flex items-center gap-1 bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-white/80 w-14"
                  >
                    {fontSize} <ChevronDown className="w-3 h-3 ml-auto" />
                  </button>
                  {showSizeDropdown && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-[hsl(220,25%,15%)] border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto w-14">
                      {FONT_SIZES.map((s) => (
                        <button key={s} onClick={() => { setFontSize(s); execCmd("fontSize", "3"); setShowSizeDropdown(false); }}
                          className="block w-full text-left px-3 py-1.5 text-xs text-white/70 hover:bg-primary/20 hover:text-white">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setFontSize((s) => Math.max(8, s - 1))} className="p-0.5 text-white/50 hover:text-white"><Minus className="w-3 h-3" /></button>
                <button onClick={() => setFontSize((s) => Math.min(72, s + 1))} className="p-0.5 text-white/50 hover:text-white"><Plus className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={() => execCmd("bold")} title="Bold" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Bold className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("italic")} title="Italic" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Italic className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("underline")} title="Underline" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Underline className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("strikeThrough")} title="Strikethrough" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Strikethrough className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("subscript")} title="Subscript" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Subscript className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("superscript")} title="Superscript" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Superscript className="w-3.5 h-3.5" /></button>
                <div className="relative">
                  <button onClick={() => setShowColorPicker(!showColorPicker)} title="Font Color" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-0.5">
                    <Palette className="w-3.5 h-3.5" />
                    <div className="w-3 h-1 rounded-sm" style={{ backgroundColor: textColor }} />
                  </button>
                  {showColorPicker && (
                    <div className="absolute top-full left-0 z-50 mt-1 bg-[hsl(220,25%,15%)] border border-white/10 rounded-lg shadow-xl p-2 grid grid-cols-6 gap-1 w-36">
                      {COLORS.map((c) => (
                        <button key={c} onClick={() => { setTextColor(c); execCmd("foreColor", c); setShowColorPicker(false); }}
                          className="w-5 h-5 rounded border border-white/20 hover:scale-125 transition-transform" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => execCmd("hiliteColor", "#ffd966")} title="Highlight" className="p-1 rounded text-white/70 hover:bg-white/10 hover:text-white"><Highlighter className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <Divider />

            {/* Paragraph */}
            <div className="flex flex-col gap-1 px-1">
              <div className="flex items-center gap-0.5">
                <button onClick={() => execCmd("justifyLeft")} className="p-1 rounded text-white/70 hover:bg-white/10"><AlignLeft className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("justifyCenter")} className="p-1 rounded text-white/70 hover:bg-white/10"><AlignCenter className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("justifyRight")} className="p-1 rounded text-white/70 hover:bg-white/10"><AlignRight className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("justifyFull")} className="p-1 rounded text-white/70 hover:bg-white/10"><AlignJustify className="w-3.5 h-3.5" /></button>
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={() => execCmd("insertUnorderedList")} className="p-1 rounded text-white/70 hover:bg-white/10"><List className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("insertOrderedList")} className="p-1 rounded text-white/70 hover:bg-white/10"><ListOrdered className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("indent")} className="p-1 rounded text-white/70 hover:bg-white/10"><IndentIncrease className="w-3.5 h-3.5" /></button>
                <button onClick={() => execCmd("outdent")} className="p-1 rounded text-white/70 hover:bg-white/10"><IndentDecrease className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <Divider />

            {/* Heading styles */}
            <div className="flex items-center gap-0.5 px-1">
              <ToolBtn icon={Heading1} label="H1" onClick={() => execCmd("formatBlock", "h1")} />
              <ToolBtn icon={Heading2} label="H2" onClick={() => execCmd("formatBlock", "h2")} />
              <ToolBtn icon={Heading3} label="H3" onClick={() => execCmd("formatBlock", "h3")} />
              <ToolBtn icon={Pilcrow} label="Normal" onClick={() => execCmd("formatBlock", "p")} />
            </div>
          </>
        )}

        {activeTab === "insert" && (
          <>
            <ToolBtn icon={Table} label="Table" onClick={() => execCmd("insertHTML", "<table border='1' style='border-collapse:collapse;width:100%'><tr><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td></tr><tr><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td><td style='padding:8px;border:1px solid #ccc'>&nbsp;</td></tr></table>")} />
            <ToolBtn icon={Image} label="Image" onClick={() => execCmd("insertHTML", "<div style='border:2px dashed #ccc;padding:40px;text-align:center;color:#999;margin:10px 0'>📷 Image Placeholder</div>")} />
            <ToolBtn icon={Link2} label="Link" onClick={() => { const url = prompt("Enter URL:"); if (url) execCmd("createLink", url); }} />
            <ToolBtn icon={Minus} label="Line" onClick={() => execCmd("insertHorizontalRule")} />
          </>
        )}

        {activeTab === "layout" && (
          <div className="flex items-center gap-2 text-xs text-white/60 px-2">
            <span className="font-body">Margins: Normal (1")</span>
            <span>|</span>
            <span className="font-body">Orientation: Portrait</span>
            <span>|</span>
            <span className="font-body">Size: A4 (210×297mm)</span>
          </div>
        )}

        {activeTab === "view" && (
          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-white/60 font-body">Zoom:</span>
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="p-1 text-white/50 hover:text-white"><Minus className="w-3.5 h-3.5" /></button>
            <span className="text-xs text-white/80 w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="p-1 text-white/50 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
            <ToolBtn icon={Printer} label="Print" />
          </div>
        )}
      </div>

      {/* Ruler */}
      <div className="h-5 bg-[hsl(220,20%,18%)] border-b border-white/5 flex items-center px-16">
        <div className="flex-1 h-2 bg-white/5 rounded relative">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="absolute top-0 h-full w-px bg-white/20" style={{ left: `${(i / 7) * 100}%` }}>
              <span className="absolute -top-3 -translate-x-1/2 text-[8px] text-white/30">{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Document Canvas */}
      <div className="flex-1 bg-[hsl(220,15%,20%)] overflow-auto flex justify-center py-6 px-4">
        <div
          className="bg-white rounded shadow-2xl"
          style={{ width: `${6.5 * zoom / 100 * 96}px`, minHeight: `${9 * zoom / 100 * 96}px`, transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div
            contentEditable
            suppressContentEditableWarning
            className="p-12 outline-none text-black min-h-full"
            style={{ fontSize: `${fontSize}px`, fontFamily, lineHeight: 1.6 }}
            onClick={() => { setShowFontDropdown(false); setShowSizeDropdown(false); setShowColorPicker(false); }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>Welcome to CodeChamps Word</h1>
            <p style={{ marginBottom: "8px" }}>Start typing your document here. Use the toolbar above to format your text, insert images, and more!</p>
            <p style={{ marginBottom: "8px" }}>Try these features:</p>
            <ul style={{ paddingLeft: "24px", listStyleType: "disc" }}>
              <li>Select text and make it <strong>bold</strong>, <em>italic</em>, or <u>underlined</u></li>
              <li>Change font family and size</li>
              <li>Add headings (H1, H2, H3)</li>
              <li>Insert tables and images</li>
              <li>Align text left, center, right, or justify</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[hsl(220,30%,10%)] border-t border-white/10 flex items-center px-3 justify-between">
        <span className="text-[10px] text-white/40 font-body">Page 1 of 1 | Words: ~50</span>
        <span className="text-[10px] text-white/40 font-body">Zoom: {zoom}%</span>
      </div>
    </div>
  );
};

export default SimulatedWordEditor;
