import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Lightbulb, Maximize2, Sparkles, BookOpen, Rocket, CheckCircle2, XCircle, Play,
  AlertTriangle, Info, Cpu, Code2, Monitor, Zap, Brain, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContentSection, Exercise } from "@/lib/class5Content";
import { EDITOR_URLS } from "@/components/coding-lab/editors";

// Determine best editor for a practice exercise
const getEditorForPractice = (question: string): string | null => {
  const q = question.toLowerCase();
  if (q.includes("ms word") || q.includes("word") || q.includes("document") || q.includes("letter") || q.includes("newsletter") || q.includes("invitation") || q.includes("report") || q.includes("card") || q.includes("format")) return "msword";
  if (q.includes("paint") || q.includes("draw") || q.includes("color") || q.includes("art") || q.includes("picture")) return "mspaint";
  if (q.includes("scratch") || q.includes("sprite") || q.includes("block") || q.includes("animation") || q.includes("game")) return "scratch";
  if (q.includes("python")) return "python";
  if (q.includes("html") || q.includes("web")) return "html";
  if (q.includes("java")) return "java";
  if (q.includes("excel") || q.includes("spreadsheet") || q.includes("cell")) return "msexcel";
  if (q.includes("powerpoint") || q.includes("slide") || q.includes("presentation")) return "mspowerpoint";
  if (q.includes("gimp") || q.includes("photo edit")) return "gimp";
  if (q.includes("krita") || q.includes("digital art") || q.includes("digital paint")) return "krita";
  return null;
};

// Section color themes that alternate
const sectionThemes = [
  { accent: "from-primary/15 to-secondary/10", border: "border-primary/15", icon: "text-primary", iconBg: "from-primary/20 to-secondary/15", bar: "from-primary via-secondary to-neon-blue" },
  { accent: "from-neon-green/12 to-neon-blue/8", border: "border-neon-green/15", icon: "text-neon-green", iconBg: "from-neon-green/20 to-neon-blue/15", bar: "from-neon-green via-neon-blue to-primary" },
  { accent: "from-neon-purple/12 to-neon-pink/8", border: "border-neon-purple/15", icon: "text-neon-purple", iconBg: "from-neon-purple/20 to-neon-pink/15", bar: "from-neon-purple via-neon-pink to-secondary" },
  { accent: "from-neon-orange/12 to-neon-pink/8", border: "border-neon-orange/15", icon: "text-neon-orange", iconBg: "from-neon-orange/20 to-neon-pink/15", bar: "from-neon-orange via-neon-pink to-neon-purple" },
  { accent: "from-neon-blue/12 to-neon-purple/8", border: "border-neon-blue/15", icon: "text-neon-blue", iconBg: "from-neon-blue/20 to-neon-purple/15", bar: "from-neon-blue via-primary to-neon-green" },
];

// Section icons that rotate
const sectionIcons = [BookOpen, Brain, Eye, Monitor, Code2, Cpu, Zap, Sparkles];

// Scroll-reveal wrapper
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===== Rich text parser =====
const RichText = ({ text }: { text: string }) => {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-4">
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const isSteps = lines.some(l => /^\*\*Step \d/i.test(l.trim()));

        if (isSteps) {
          return (
            <div key={pi} className="space-y-3 my-2">
              {lines.map((line, li) => {
                const stepMatch = line.match(/^\*\*Step (\d+)[:\.]?\*\*\s*(.*)/i);
                if (stepMatch) {
                  return (
                    <motion.div
                      key={li}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: li * 0.05 }}
                      className="flex gap-4 items-start group"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/15 transition-all duration-300">
                          <span className="text-sm font-display font-bold text-primary">{stepMatch[1]}</span>
                        </div>
                        {li < lines.length - 1 && (
                          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-primary/20 to-transparent" />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-[15px] font-body text-foreground/80 leading-relaxed">
                          <InlineFormat text={stepMatch[2]} />
                        </p>
                      </div>
                    </motion.div>
                  );
                }
                return line.trim() ? (
                  <p key={li} className="text-[15px] font-body text-foreground/75 leading-relaxed ml-14">
                    <InlineFormat text={line} />
                  </p>
                ) : null;
              })}
            </div>
          );
        }

        // Check for list items (bullets, emojis, etc.)
        const isList = lines.length > 1 && lines.filter(l => l.trim()).every(l =>
          /^([•\-]|\d+[\.\):]|[🔤🔢⬜⏎⬅️🔠⬆️🔼⎋📋🖥️⌨️🖱️🔊📏📄👆👍➡️✋🔄🎮✏️🧮📝📌🎯💡⚡🌟🏆🎨🔧💻📊🔍✨🚀🎓📚🎮🖼️🎵🔒🌍🔑])/u.test(l.trim()) || l.trim() === ""
        );

        if (isList) {
          return (
            <div key={pi} className="space-y-2.5 pl-1 my-2">
              {lines.filter(l => l.trim()).map((line, li) => {
                // Check if line starts with emoji
                const emojiMatch = line.match(/^([^\w\s]{1,4})\s*\*\*(.*?)\*\*\s*[—\-–:]\s*(.*)/);
                if (emojiMatch) {
                  return (
                    <div key={li} className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform duration-200">
                      <span className="text-lg mt-0.5 shrink-0">{emojiMatch[1]}</span>
                      <div>
                        <span className="text-[15px] font-body font-bold text-foreground">{emojiMatch[2]}</span>
                        <span className="text-[15px] font-body text-foreground/65"> — {emojiMatch[3]}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={li} className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform duration-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <p className="text-[15px] font-body text-foreground/75 leading-relaxed">
                      <InlineFormat text={line.replace(/^[•\-]\s*/, "")} />
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <p key={pi} className="text-[15px] font-body text-foreground/75 leading-[1.9]">
            {lines.map((line, li) => (
              <span key={li}>
                <InlineFormat text={line} />
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

const InlineFormat = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, k) =>
      k % 2 === 1 ? (
        <strong key={k} className="text-foreground font-semibold bg-primary/[0.06] px-1 rounded">{part}</strong>
      ) : part
    )}
  </>
);

// ===== Gradient Section Divider =====
const SectionDivider = ({ index }: { index: number }) => {
  const theme = sectionThemes[index % sectionThemes.length];
  return (
    <div className="flex items-center gap-4 py-2">
      <div className={`flex-1 h-px bg-gradient-to-r ${theme.bar} opacity-20`} />
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.bar} opacity-40`} />
      <div className={`flex-1 h-px bg-gradient-to-l ${theme.bar} opacity-20`} />
    </div>
  );
};

// ===== Premium Exercise Component =====
export const PremiumExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = exercise.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

  if (exercise.type === "practice") {
    const editorKey = getEditorForPractice(exercise.question);
    const editorInfo = editorKey ? EDITOR_URLS[editorKey] : null;

    return (
      <RevealOnScroll delay={index * 0.05}>
        <div className="relative rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-neon-orange/5 transition-all duration-500">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple" />
          <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/[0.04] via-transparent to-neon-pink/[0.03]" />
          <div className="relative border border-neon-orange/20 hover:border-neon-orange/35 rounded-2xl transition-colors duration-300">
            <div className="p-7">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-orange/30 to-neon-pink/25 flex items-center justify-center shrink-0 shadow-xl shadow-neon-orange/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Rocket className="w-6 h-6 text-neon-orange" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-display font-bold text-neon-orange uppercase tracking-[0.15em]">Practice Activity</span>
                    <span className="text-lg">🚀</span>
                  </div>
                  <p className="text-sm text-foreground/80 font-body leading-relaxed mb-5">{exercise.question}</p>
                  {editorInfo && (
                    <div className="flex gap-3 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => { window.location.href = `/dashboard/coding-lab?editor=${editorKey}`; }}
                        className="bg-gradient-to-r from-neon-orange to-neon-pink text-white hover:opacity-90 gap-2 text-xs rounded-xl font-body font-bold shadow-lg shadow-neon-orange/20 hover:shadow-neon-orange/30 hover:scale-105 transition-all duration-300 h-10 px-5"
                      >
                        <Play className="w-3.5 h-3.5" /> Open {editorInfo.label}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => { window.open(`/dashboard/coding-lab?editor=${editorKey}&fullscreen=1`, "_blank"); }}
                        variant="ghost"
                        className="text-foreground/40 hover:text-neon-orange text-xs gap-2 rounded-xl h-10"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Full Screen
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500">
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          exercise.type === "true-false"
            ? "bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple"
            : "bg-gradient-to-r from-neon-blue via-neon-green to-neon-blue"
        }`} />
        <div className="border border-white/[0.08] hover:border-white/[0.16] rounded-2xl transition-colors duration-300 bg-gradient-to-br from-white/[0.02] to-transparent">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 ${
                exercise.type === "true-false"
                  ? "bg-gradient-to-br from-neon-purple/25 to-neon-blue/20 shadow-neon-purple/10"
                  : "bg-gradient-to-br from-neon-blue/25 to-neon-green/20 shadow-neon-blue/10"
              }`}>
                <span className="text-xl">{exercise.type === "true-false" ? "⚡" : "✏️"}</span>
              </div>
              <div className="flex-1">
                <div className={`text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-2 ${
                  exercise.type === "true-false" ? "text-neon-purple" : "text-neon-blue"
                }`}>
                  {exercise.type === "true-false" ? "True or False" : "Fill in the Blank"}
                </div>
                <p className="text-sm text-foreground/85 font-body leading-relaxed">{exercise.question}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-16 flex-wrap">
              {exercise.type === "true-false" ? (
                <div className="flex gap-3">
                  {exercise.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setUserAnswer(opt); setChecked(false); }}
                      className={`px-7 py-3 rounded-xl text-sm font-body font-bold transition-all duration-300 ${
                        userAnswer === opt
                          ? checked
                            ? isCorrect
                              ? "bg-neon-green/20 text-neon-green border-2 border-neon-green/40 scale-105 shadow-xl shadow-neon-green/15"
                              : "bg-destructive/20 text-red-400 border-2 border-red-400/40 scale-105"
                            : "bg-primary/20 text-primary border-2 border-primary/40 scale-105 shadow-xl shadow-primary/15"
                          : "bg-white/[0.04] text-foreground/50 hover:bg-white/[0.08] border-2 border-white/[0.08] hover:border-white/15 hover:scale-105"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  value={userAnswer}
                  onChange={(e) => { setUserAnswer(e.target.value); setChecked(false); }}
                  placeholder="Type your answer..."
                  className="bg-white/[0.04] border-2 border-white/10 rounded-xl px-5 py-3 text-sm text-foreground font-body focus:outline-none focus:border-primary/50 focus:bg-primary/[0.03] focus:shadow-lg focus:shadow-primary/10 w-64 transition-all placeholder:text-foreground/20"
                />
              )}
              <Button
                size="sm"
                onClick={() => setChecked(true)}
                disabled={!userAnswer}
                className="bg-gradient-to-r from-primary/15 to-secondary/15 hover:from-primary/25 hover:to-secondary/25 text-foreground/70 hover:text-foreground text-xs rounded-xl px-6 h-11 font-body font-bold disabled:opacity-20 transition-all border border-primary/15 hover:border-primary/25"
              >
                Check Answer
              </Button>
              {checked && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl ${
                    isCorrect
                      ? "text-neon-green bg-neon-green/10 border border-neon-green/25 shadow-lg shadow-neon-green/10"
                      : "text-red-400 bg-red-400/10 border border-red-400/25"
                  }`}
                >
                  {isCorrect ? (
                    <><CheckCircle2 className="w-4 h-4" /> Correct! 🎉</>
                  ) : (
                    <><XCircle className="w-4 h-4" /> Answer: {exercise.answer}</>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Section Renderer =====
export const PremiumSection = ({ section, index }: { section: ContentSection; index: number }) => {
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const theme = sectionThemes[index % sectionThemes.length];
  const IconComponent = sectionIcons[index % sectionIcons.length];

  return (
    <RevealOnScroll delay={index * 0.08}>
      {/* Decorative separator between sections */}
      {index > 0 && <SectionDivider index={index} />}

      <div className="relative rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/[0.05] transition-all duration-700">
        {/* Left gradient accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.bar} opacity-30 group-hover:opacity-70 transition-opacity duration-700`} />

        {/* Background decorative shapes */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.02] bg-gradient-to-br from-primary to-secondary blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-[0.015] bg-gradient-to-br from-neon-green to-neon-blue blur-3xl pointer-events-none" />

        <div className={`border ${theme.border} rounded-3xl bg-gradient-to-br from-[hsl(220,30%,11%)] via-[hsl(220,28%,10%)] to-[hsl(220,25%,9%)] transition-colors duration-500 hover:border-opacity-100`}>
          {/* Section Header */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.iconBg} border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl transition-all duration-500`}>
                <IconComponent className={`w-5 h-5 ${theme.icon}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight">{section.heading}</h3>
                <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${theme.bar} mt-2 opacity-50 group-hover:w-24 transition-all duration-500`} />
              </div>
            </div>
          </div>

          {/* Image with elegant frame */}
          {section.image && (
            <div className="mx-8 mb-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 group/img">
                {/* Window chrome decoration */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-white/[0.04] to-white/[0.02] border-b border-white/[0.06] flex items-center gap-1.5 px-3 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[9px] font-body text-foreground/20 ml-2">{section.heading}</span>
                </div>
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full max-h-80 object-cover pt-8 group-hover/img:scale-[1.03] transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          )}

          {/* YouTube Video */}
          {section.youtubeId && (
            <div className="mx-8 mb-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
                {/* Video window chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-white/[0.04] to-white/[0.02] border-b border-white/[0.06] flex items-center gap-1.5 px-3 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[9px] font-body text-foreground/20 ml-2">📺 Video Lesson</span>
                </div>
                {!youtubeLoaded ? (
                  <button
                    onClick={() => setYoutubeLoaded(true)}
                    className="relative w-full group/yt cursor-pointer"
                    style={{ paddingBottom: '56.25%', marginTop: '32px' }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 group-hover/yt:from-black/40 group-hover/yt:via-black/20 group-hover/yt:to-black/40 transition-all duration-500 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-red-500/30 blur-xl animate-pulse" />
                        <div className="relative w-18 h-18 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover/yt:scale-110 transition-all duration-500">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-body text-white/90 flex items-center gap-2 border border-white/10">
                      <Play className="w-3.5 h-3.5 text-red-400" /> Watch Video Lesson
                    </div>
                  </button>
                ) : (
                  <div className="relative w-full" style={{ paddingBottom: '56.25%', marginTop: '32px' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${section.youtubeId}?autoplay=1`}
                      className="absolute inset-0 w-full h-full"
                      title={section.heading}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="px-8 pb-3">
            <RichText text={section.body} />
          </div>

          {/* Tip Box - Glassmorphism style */}
          {section.tip && (
            <div className="mx-8 my-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-blue via-neon-green to-neon-blue" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.06] via-transparent to-neon-green/[0.03]" />
                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-neon-blue/15 rounded-2xl p-6 pl-7">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-blue/25 to-neon-green/15 flex items-center justify-center shrink-0 shadow-lg shadow-neon-blue/10">
                      <Lightbulb className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-display font-bold text-neon-blue uppercase tracking-[0.2em]">Pro Tip</span>
                        <span className="text-sm">💡</span>
                      </div>
                      <p className="text-sm font-body text-foreground/75 leading-relaxed">
                        <InlineFormat text={section.tip} />
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Fun Fact Box */}
          {section.funFact && (
            <div className="mx-8 my-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="relative rounded-2xl overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-orange via-neon-pink to-neon-orange" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/[0.06] via-transparent to-neon-pink/[0.03]" />
                <div className="relative bg-white/[0.02] backdrop-blur-sm border border-neon-orange/15 rounded-2xl p-6 pl-7">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-orange/25 to-neon-pink/15 flex items-center justify-center shrink-0 shadow-lg shadow-neon-orange/10">
                      <Sparkles className="w-5 h-5 text-neon-orange" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-display font-bold text-neon-orange uppercase tracking-[0.2em]">Fun Fact</span>
                        <span className="text-sm">🌟</span>
                      </div>
                      <p className="text-sm font-body text-foreground/75 leading-relaxed">{section.funFact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Bottom padding */}
          <div className="h-6" />
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Page Header =====
export const PremiumPageHeader = ({
  pageTitle,
  subtitle,
  bannerImage,
  bannerColor,
  pageNumber,
  totalPages,
}: {
  pageTitle: string;
  subtitle?: string;
  bannerImage?: string;
  bannerColor?: string;
  pageNumber: number;
  totalPages: number;
}) => (
  <motion.div
    initial={{ y: -15, opacity: 0, scale: 0.97 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 mb-10 group"
  >
    {bannerImage ? (
      <div className="relative h-60 md:h-72">
        <img src={bannerImage} alt={pageTitle} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        {/* Decorative elements */}
        <div className="absolute top-5 left-5 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/30" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/30" />
        </div>
        <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-display font-bold text-white/90">{pageNumber}</span>
            <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(pageNumber / totalPages) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-neon-green"
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <span className="text-xs font-display font-bold text-white/50">{totalPages}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl leading-tight mb-2">{pageTitle}</h2>
            {subtitle && (
              <p className="text-white/60 font-body text-sm md:text-base max-w-2xl leading-relaxed">{subtitle}</p>
            )}
          </motion.div>
        </div>
      </div>
    ) : (
      <div className={`bg-gradient-to-br ${bannerColor || "from-primary to-neon-blue"} relative overflow-hidden`}>
        {/* Abstract decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.08] blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-black/[0.1] blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/[0.05] blur-2xl" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative z-10 p-8 md:p-10 py-12">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/15" />
          </div>
          <div className="absolute top-6 right-6 bg-black/15 backdrop-blur-sm rounded-full px-5 py-2 border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display font-bold text-white/90">{pageNumber}</span>
              <div className="w-10 h-1.5 rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(pageNumber / totalPages) * 100}%` }}
                  className="h-full rounded-full bg-white/50"
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <span className="text-xs font-display font-bold text-white/60">{totalPages}</span>
            </div>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">{pageTitle}</h2>
          {subtitle && <p className="text-white/70 font-body text-sm md:text-base max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    )}
  </motion.div>
);
