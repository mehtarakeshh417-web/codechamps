import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, Info, ExternalLink, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
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

// ===== Premium Exercise Component =====
export const PremiumExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = exercise.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

  if (exercise.type === "practice") {
    const editorKey = getEditorForPractice(exercise.question);
    const editorInfo = editorKey ? EDITOR_URLS[editorKey] : null;

    return (
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className="bg-gradient-to-br from-neon-orange/8 to-neon-orange/3 rounded-xl p-5 border border-neon-orange/15 hover:border-neon-orange/25 transition-colors"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-orange/15 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm">✍️</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-display font-bold text-neon-orange uppercase tracking-wider mb-2">Practice Activity</div>
            <p className="text-sm text-white/80 font-body leading-relaxed mb-3">{exercise.question}</p>
            {editorInfo && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => { window.location.href = `/dashboard/coding-lab?editor=${editorKey}`; }}
                  className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 gap-1.5 text-xs rounded-lg"
                >
                  <ExternalLink className="w-3 h-3" /> Open {editorInfo.label}
                </Button>
                <Button
                  size="sm"
                  onClick={() => { window.open(`/dashboard/coding-lab?editor=${editorKey}&fullscreen=1`, "_blank"); }}
                  variant="ghost"
                  className="text-white/40 hover:text-white text-xs gap-1.5"
                >
                  <Maximize2 className="w-3 h-3" /> Full Screen
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/[0.03] rounded-xl p-5 border border-white/8 hover:border-white/15 transition-colors"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
          exercise.type === "true-false" ? "bg-neon-purple/15" : "bg-neon-blue/15"
        }`}>
          <span className="text-sm">{exercise.type === "true-false" ? "✓✗" : "📝"}</span>
        </div>
        <div className="flex-1">
          <div className={`text-xs font-display font-bold uppercase tracking-wider mb-1.5 ${
            exercise.type === "true-false" ? "text-neon-purple" : "text-neon-blue"
          }`}>
            {exercise.type === "true-false" ? "True or False" : "Fill in the Blank"}
          </div>
          <p className="text-sm text-white/85 font-body leading-relaxed">{exercise.question}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-11">
        {exercise.type === "true-false" ? (
          <div className="flex gap-2">
            {exercise.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => { setUserAnswer(opt); setChecked(false); }}
                className={`px-5 py-2 rounded-lg text-sm font-body font-bold transition-all ${
                  userAnswer === opt
                    ? "bg-primary/25 text-primary border-2 border-primary/40 scale-105"
                    : "bg-white/8 text-white/50 hover:bg-white/12 border-2 border-transparent"
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
            className="bg-white/8 border-2 border-white/8 rounded-lg px-4 py-2 text-sm text-white font-body focus:outline-none focus:border-primary/40 w-56 transition-colors placeholder:text-white/25"
          />
        )}
        <Button
          size="sm"
          onClick={() => setChecked(true)}
          className="bg-white/8 hover:bg-white/15 text-white/70 text-xs rounded-lg px-4"
        >
          Check
        </Button>
        {checked && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
              isCorrect
                ? "text-neon-green bg-neon-green/10 border border-neon-green/20"
                : "text-red-400 bg-red-400/10 border border-red-400/20"
            }`}
          >
            {isCorrect ? "✓ Correct!" : `✗ Answer: ${exercise.answer}`}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

// ===== Premium Section Renderer =====
export const PremiumSection = ({ section, index }: { section: ContentSection; index: number }) => {
  const [expandedAdvanced, setExpandedAdvanced] = useState(false);

  // Parse body to detect sections - split into paragraphs
  const paragraphs = section.body.split("\n\n");

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="bg-[hsl(220,30%,11%)] rounded-2xl border border-white/8 overflow-hidden hover:border-white/12 transition-all duration-300"
    >
      {/* Section Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-neon-blue" />
          <h3 className="font-display text-xl font-bold text-white">{section.heading}</h3>
        </div>

        {/* Image */}
        {section.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 rounded-xl overflow-hidden border border-white/8 shadow-lg shadow-black/20"
          >
            <img
              src={section.image}
              alt={section.heading}
              className="w-full max-h-72 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* YouTube Video */}
        {section.youtubeId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 rounded-xl overflow-hidden border border-white/8 shadow-lg shadow-black/20"
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${section.youtubeId}`}
                className="absolute inset-0 w-full h-full"
                title={section.heading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {/* Body Content - Premium formatted */}
        <div className="space-y-3">
          {paragraphs.map((para, pi) => (
            <p key={pi} className="text-white/75 font-body text-[15px] leading-[1.85]">
              {para.split("\n").map((line, li) => (
                <span key={li}>
                  {line.split("**").map((part, pk) =>
                    pk % 2 === 1 ? (
                      <strong key={pk} className="text-white font-semibold">{part}</strong>
                    ) : part
                  )}
                  {li < para.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Tip Box */}
      {section.tip && (
        <div className="mx-6 mb-4">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3 bg-gradient-to-r from-neon-blue/10 to-transparent border border-neon-blue/15 rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-blue/15 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-neon-blue" />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-neon-blue uppercase tracking-wider mb-1">💡 Pro Tip</div>
              <p className="text-sm font-body text-white/70 leading-relaxed">
                {section.tip.split("**").map((part, k) =>
                  k % 2 === 1 ? <strong key={k} className="text-white">{part}</strong> : part
                )}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Fun Fact Box */}
      {section.funFact && (
        <div className="mx-6 mb-5">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-start gap-3 bg-gradient-to-r from-neon-orange/10 to-transparent border border-neon-orange/15 rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-orange/15 flex items-center justify-center shrink-0">
              <span className="text-sm">🌟</span>
            </div>
            <div>
              <div className="text-xs font-display font-bold text-neon-orange uppercase tracking-wider mb-1">Fun Fact</div>
              <p className="text-sm font-body text-white/70 leading-relaxed">{section.funFact}</p>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
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
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-8"
  >
    {bannerImage ? (
      <div className="relative h-52">
        <img src={bannerImage} alt={pageTitle} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-body text-white/70 border border-white/10">
          Page {pageNumber} of {totalPages}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{pageTitle}</h2>
          {subtitle && <p className="text-white/60 font-body text-sm mt-1.5">{subtitle}</p>}
        </div>
      </div>
    ) : (
      <div className={`bg-gradient-to-r ${bannerColor || "from-primary to-neon-blue"} p-8 relative`}>
        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-body text-white/80">
          Page {pageNumber} of {totalPages}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white">{pageTitle}</h2>
        {subtitle && <p className="text-white/80 font-body text-sm mt-1.5">{subtitle}</p>}
      </div>
    )}
  </motion.div>
);
