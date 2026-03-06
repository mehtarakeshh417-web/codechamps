import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

// HTML/CSS/JS Editor (existing)
export const HtmlEditor = () => {
  const [html, setHtml] = useState("<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: Arial; text-align: center; padding: 40px; background: #f0f8ff; }\n    h1 { color: #2563eb; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>Edit this code and click Run!</p>\n</body>\n</html>");
  const [output, setOutput] = useState("");

  return (
    <div className="grid md:grid-cols-2 gap-4 h-[500px]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/50 font-body uppercase tracking-wider">HTML / CSS / JS Editor</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => { setHtml("<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello!</h1>\n</body>\n</html>"); setOutput(""); }} className="text-white/40 hover:text-white"><RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset</Button>
            <Button size="sm" onClick={() => setOutput(html)} className="bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/30"><Play className="w-3.5 h-3.5 mr-1" /> Run</Button>
          </div>
        </div>
        <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="flex-1 bg-[hsl(220,30%,10%)] border border-white/10 rounded-xl p-4 font-mono text-sm text-neon-green resize-none focus:outline-none focus:border-primary/50" spellCheck={false} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-white/50 font-body uppercase tracking-wider mb-2">Preview</span>
        <div className="flex-1 bg-white rounded-xl overflow-hidden">
          {output ? <iframe srcDoc={output} className="w-full h-full border-0" title="HTML Preview" sandbox="allow-scripts" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Click "Run" to see output</div>}
        </div>
      </div>
    </div>
  );
};

// Python Compiler (OneCompiler embed)
export const PythonEditor = () => (
  <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
    <iframe
      src="https://onecompiler.com/embed/python?theme=dark"
      className="w-full h-full border-0"
      title="Python Compiler"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  </div>
);

// Java Compiler (OneCompiler embed)
export const JavaEditor = () => (
  <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
    <iframe
      src="https://onecompiler.com/embed/java?theme=dark"
      className="w-full h-full border-0"
      title="Java Compiler"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  </div>
);

// MS Paint (JSPaint clone)
export const MsPaintEditor = () => (
  <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
    <iframe
      src="https://jspaint.app"
      className="w-full h-full border-0"
      title="MS Paint"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
    />
  </div>
);

// Block Coding Editor (Snap! - Berkeley's visual block programming, Scratch-like)
export const ScratchEditor = () => (
  <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
    <iframe
      src="https://snap.berkeley.edu/snap/snap.html"
      className="w-full h-full border-0"
      title="Block Coding Editor"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
    />
  </div>
);

// Scratch Jr
export const ScratchJrEditor = () => (
  <div className="space-y-4">
    <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src="https://codejr.org/scratchjr/index.html"
        className="w-full h-full border-0"
        title="Scratch Jr Editor"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
    <p className="text-white/40 text-xs font-body text-center">Powered by CodeJr.org — a free Scratch Jr web editor</p>
  </div>
);
