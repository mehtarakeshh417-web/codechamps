import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, ExternalLink, Maximize2, Sparkles, BookOpen, Rocket, CheckCircle2, XCircle, Play } from "lucide-react";
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

// Scroll-reveal wrapper
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===== Rich text parser with bullet/numbered list support =====
const RichText = ({ text }: { text: string }) => {
  const paragraphs = text.split("\n\n");

  return (
    <div className="space-y-4">
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        // Check if this paragraph is a list (lines start with bullets/numbers/emojis)
        const isList = lines.length > 1 && lines.every(l => /^(\d+[\.\):]|[•\-🔤🔢⬜⏎⬅️🔠⬆️🔼⎋📋🖥️⌨️🖱️🔊📏📄👆👍➡️✋🔄🎮✏️🧮]|[A-Z]\.)/.test(l.trim()) || l.trim() === "");
        // Check if lines start with step patterns
        const isSteps = lines.some(l => /^\*\*Step \d/i.test(l.trim()));

        if (isSteps) {
          return (
            <div key={pi} className="space-y-3">
              {lines.map((line, li) => {
                const stepMatch = line.match(/^\*\*Step (\d+)[:\.]?\*\*\s*(.*)/i);
                if (stepMatch) {
                  return (
                    <div key={li} className="flex gap-3 items-start group">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <span className="text-xs font-display font-bold text-primary">{stepMatch[1]}</span>
                      </div>
                      <p className="text-[15px] font-body text-foreground/75 leading-relaxed pt-1">
                        <InlineFormat text={stepMatch[2]} />
                      </p>
                    </div>
                  );
                }
                return line.trim() ? (
                  <p key={li} className="text-[15px] font-body text-foreground/75 leading-relaxed">
                    <InlineFormat text={line} />
                  </p>
                ) : null;
              })}
            </div>
          );
        }

        if (isList) {
          return (
            <div key={pi} className="space-y-2 pl-1">
              {lines.filter(l => l.trim()).map((line, li) => (
                <div key={li} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 shrink-0" />
                  <p className="text-[15px] font-body text-foreground/75 leading-relaxed">
                    <InlineFormat text={line.replace(/^[•\-]\s*/, "")} />
                  </p>
                </div>
              ))}
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

// Inline bold formatter
const InlineFormat = ({ text }: { text: string }) => (
  <>
    {text.split("**").map((part, k) =>
      k % 2 === 1 ? (
        <strong key={k} className="text-foreground font-semibold">{part}</strong>
      ) : part
    )}
  </>
);

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
        <div className="relative rounded-2xl overflow-hidden border border-neon-orange/20 group hover:border-neon-orange/35 transition-all duration-300">
          {/* Gradient top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-orange" />
          <div className="p-6 bg-gradient-to-br from-neon-orange/[0.06] via-transparent to-neon-pink/[0.04]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-orange/25 to-neon-pink/20 flex items-center justify-center shrink-0 shadow-lg shadow-neon-orange/10 group-hover:scale-110 transition-transform">
                <Rocket className="w-5 h-5 text-neon-orange" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-display font-bold text-neon-orange uppercase tracking-[0.15em] mb-2">🚀 Practice Activity</div>
                <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">{exercise.question}</p>
                {editorInfo && (
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      size="sm"
                      onClick={() => { window.location.href = `/dashboard/coding-lab?editor=${editorKey}`; }}
                      className="bg-gradient-to-r from-neon-orange/20 to-neon-pink/20 text-neon-orange border border-neon-orange/25 hover:border-neon-orange/40 hover:from-neon-orange/30 hover:to-neon-pink/25 gap-2 text-xs rounded-xl font-body font-bold shadow-md shadow-neon-orange/5"
                    >
                      <Play className="w-3.5 h-3.5" /> Open {editorInfo.label}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => { window.open(`/dashboard/coding-lab?editor=${editorKey}&fullscreen=1`, "_blank"); }}
                      variant="ghost"
                      className="text-foreground/40 hover:text-foreground text-xs gap-2 rounded-xl"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Full Screen
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-all duration-300 group">
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${
          exercise.type === "true-false"
            ? "bg-gradient-to-r from-neon-purple to-neon-blue"
            : "bg-gradient-to-r from-neon-blue to-neon-green"
        }`} />
        <div className="p-6 bg-[hsl(var(--cyber-dark)/0.3)]">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              exercise.type === "true-false"
                ? "bg-gradient-to-br from-neon-purple/20 to-neon-blue/15 shadow-neon-purple/10"
                : "bg-gradient-to-br from-neon-blue/20 to-neon-green/15 shadow-neon-blue/10"
            }`}>
              <span className="text-base">{exercise.type === "true-false" ? "⚡" : "✏️"}</span>
            </div>
            <div className="flex-1">
              <div className={`text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-1.5 ${
                exercise.type === "true-false" ? "text-neon-purple" : "text-neon-blue"
              }`}>
                {exercise.type === "true-false" ? "True or False" : "Fill in the Blank"}
              </div>
              <p className="text-sm text-foreground/85 font-body leading-relaxed">{exercise.question}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-14 flex-wrap">
            {exercise.type === "true-false" ? (
              <div className="flex gap-2">
                {exercise.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setUserAnswer(opt); setChecked(false); }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-body font-bold transition-all duration-200 ${
                      userAnswer === opt
                        ? checked
                          ? isCorrect
                            ? "bg-neon-green/20 text-neon-green border-2 border-neon-green/40 scale-105 shadow-lg shadow-neon-green/10"
                            : "bg-destructive/20 text-red-400 border-2 border-red-400/40 scale-105"
                          : "bg-primary/20 text-primary border-2 border-primary/40 scale-105 shadow-lg shadow-primary/10"
                        : "bg-white/[0.05] text-foreground/50 hover:bg-white/[0.08] border-2 border-transparent hover:border-white/10"
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
                className="bg-white/[0.05] border-2 border-white/10 rounded-xl px-5 py-2.5 text-sm text-foreground font-body focus:outline-none focus:border-primary/50 focus:bg-primary/[0.03] w-60 transition-all placeholder:text-foreground/20"
              />
            )}
            <Button
              size="sm"
              onClick={() => setChecked(true)}
              disabled={!userAnswer}
              className="bg-white/[0.06] hover:bg-white/[0.12] text-foreground/60 hover:text-foreground text-xs rounded-xl px-5 h-10 font-body font-bold disabled:opacity-30 transition-all"
            >
              Check Answer
            </Button>
            {checked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl ${
                  isCorrect
                    ? "text-neon-green bg-neon-green/10 border border-neon-green/25 shadow-lg shadow-neon-green/10"
                    : "text-red-400 bg-red-400/10 border border-red-400/25"
                }`}
              >
                {isCorrect ? (
                  <><CheckCircle2 className="w-4 h-4" /> Correct!</>
                ) : (
                  <><XCircle className="w-4 h-4" /> Answer: {exercise.answer}</>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Section Renderer =====
export const PremiumSection = ({ section, index }: { section: ContentSection; index: number }) => {
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);

  return (
    <RevealOnScroll delay={index * 0.06}>
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 group">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-neon-green opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="bg-gradient-to-br from-[hsl(220,30%,11%)] to-[hsl(220,25%,9%)] p-0">
          {/* Section Header */}
          <div className="px-7 pt-7 pb-1">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground tracking-tight">{section.heading}</h3>
            </div>
          </div>

          {/* Image with overlay */}
          {section.image && (
            <div className="mx-7 mb-6">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30 group/img">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full max-h-80 object-cover group-hover/img:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )}

          {/* YouTube Video - lazy loaded */}
          {section.youtubeId && (
            <div className="mx-7 mb-6">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30">
                {!youtubeLoaded ? (
                  <button
                    onClick={() => setYoutubeLoaded(true)}
                    className="relative w-full group/yt cursor-pointer"
                    style={{ paddingBottom: '56.25%' }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/yt:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover/yt:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-body text-white/80 flex items-center gap-1.5">
                      <Play className="w-3 h-3" /> Watch Video Lesson
                    </div>
                  </button>
                ) : (
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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
          <div className="px-7 pb-2">
            <RichText text={section.body} />
          </div>

          {/* Tip Box */}
          {section.tip && (
            <div className="mx-7 my-5">
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue to-neon-green" />
                <div className="bg-gradient-to-r from-neon-blue/[0.08] via-neon-blue/[0.04] to-transparent border border-neon-blue/15 rounded-xl p-5 pl-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neon-blue/15 flex items-center justify-center shrink-0 shadow-md shadow-neon-blue/10">
                      <Lightbulb className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div>
                      <div className="text-[10px] font-display font-bold text-neon-blue uppercase tracking-[0.2em] mb-1.5">💡 Pro Tip</div>
                      <p className="text-sm font-body text-foreground/70 leading-relaxed">
                        <InlineFormat text={section.tip} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fun Fact Box */}
          {section.funFact && (
            <div className="mx-7 my-5">
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-orange to-neon-pink" />
                <div className="bg-gradient-to-r from-neon-orange/[0.08] via-neon-orange/[0.04] to-transparent border border-neon-orange/15 rounded-xl p-5 pl-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neon-orange/15 flex items-center justify-center shrink-0 shadow-md shadow-neon-orange/10">
                      <Sparkles className="w-4 h-4 text-neon-orange" />
                    </div>
                    <div>
                      <div className="text-[10px] font-display font-bold text-neon-orange uppercase tracking-[0.2em] mb-1.5">🌟 Fun Fact</div>
                      <p className="text-sm font-body text-foreground/70 leading-relaxed">{section.funFact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom padding */}
          <div className="h-5" />
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
    initial={{ y: -15, opacity: 0, scale: 0.98 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30 mb-8"
  >
    {bannerImage ? (
      <div className="relative h-56 md:h-64">
        <img src={bannerImage} alt={pageTitle} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        {/* Decorative dots */}
        <div className="absolute top-4 left-4 flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-display font-bold text-white/80 border border-white/10">
          {pageNumber} / {totalPages}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl leading-tight"
          >
            {pageTitle}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 font-body text-sm md:text-base mt-2 max-w-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    ) : (
      <div className={`bg-gradient-to-br ${bannerColor || "from-primary to-neon-blue"} p-8 md:p-10 relative overflow-hidden`}>
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-black/20 blur-3xl" />
        </div>
        <div className="absolute top-4 left-4 flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
        </div>
        <div className="absolute top-4 right-4 bg-black/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-display font-bold text-white/90">
          {pageNumber} / {totalPages}
        </div>
        <div className="relative z-10 pt-4">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{pageTitle}</h2>
          {subtitle && <p className="text-white/75 font-body text-sm md:text-base mt-2 max-w-xl">{subtitle}</p>}
        </div>
      </div>
    )}
  </motion.div>
);
