import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getTopicTextbook, type Exercise, type TextbookPage, type ContentSection } from "@/lib/class5Content";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, ChevronLeft, ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { openEditorPopup, EDITOR_URLS } from "@/components/coding-lab/editors";

// Color mappings for banner gradients
const subjectColorMap: Record<string, string> = {
  "neon-blue": "from-[hsl(200,100%,50%)] to-[hsl(220,90%,60%)]",
  "neon-green": "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]",
  "neon-orange": "from-[hsl(25,100%,55%)] to-[hsl(45,100%,55%)]",
  "neon-purple": "from-[hsl(260,80%,60%)] to-[hsl(280,80%,55%)]",
};

// Determine best editor for a practice exercise based on context
const getEditorForPractice = (question: string): string | null => {
  const q = question.toLowerCase();
  if (q.includes("ms word") || q.includes("word") || q.includes("document") || q.includes("letter") || q.includes("newsletter") || q.includes("invitation") || q.includes("report") || q.includes("card") || q.includes("format")) return "msword";
  if (q.includes("paint") || q.includes("draw") || q.includes("color") || q.includes("art") || q.includes("picture")) return "mspaint";
  if (q.includes("scratch") || q.includes("sprite") || q.includes("block") || q.includes("animation") || q.includes("game")) return "scratch";
  if (q.includes("python")) return "python";
  if (q.includes("html") || q.includes("web")) return "html";
  if (q.includes("java")) return "java";
  if (q.includes("excel") || q.includes("spreadsheet") || q.includes("cell")) return "msword"; // closest available
  return null;
};

// Exercise component
const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = exercise.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

  if (exercise.type === "practice") {
    const editorKey = getEditorForPractice(exercise.question);
    const editorInfo = editorKey ? EDITOR_URLS[editorKey] : null;

    return (
      <div className="bg-gradient-to-r from-neon-orange/10 to-transparent rounded-xl p-5 border border-neon-orange/20">
        <div className="flex items-start gap-3">
          <span className="text-xs bg-neon-orange/20 text-neon-orange px-3 py-1 rounded-full font-bold shrink-0 mt-0.5">✍️ Practice</span>
          <div className="flex-1">
            <p className="text-sm text-white/80 font-body leading-relaxed mb-3">{exercise.question}</p>
            {editorInfo && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => {
                    window.location.href = `/dashboard/coding-lab?editor=${editorKey}`;
                  }}
                  className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 gap-1 text-xs"
                >
                  <ExternalLink className="w-3 h-3" /> Open {editorInfo.label}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    window.open(`/dashboard/coding-lab?editor=${editorKey}&fullscreen=1`, "_blank");
                  }}
                  variant="ghost"
                  className="text-white/50 hover:text-white text-xs gap-1"
                >
                  <Maximize2 className="w-3 h-3" /> Full Screen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <span className={`text-xs px-3 py-1 rounded-full font-bold shrink-0 mt-0.5 ${exercise.type === "true-false" ? "bg-neon-purple/20 text-neon-purple" : "bg-neon-blue/20 text-neon-blue"}`}>
          {exercise.type === "true-false" ? "✓✗ True/False" : "📝 Fill in the Blank"}
        </span>
        <p className="text-sm text-white/90 font-body leading-relaxed">{exercise.question}</p>
      </div>
      <div className="flex items-center gap-3 ml-0">
        {exercise.type === "true-false" ? (
          <div className="flex gap-2">
            {exercise.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => { setUserAnswer(opt); setChecked(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-body font-bold transition-all ${userAnswer === opt ? "bg-primary/30 text-primary border-2 border-primary/50 scale-105" : "bg-white/10 text-white/60 hover:bg-white/15 border-2 border-transparent"}`}
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
            className="bg-white/10 border-2 border-white/10 rounded-xl px-4 py-2 text-sm text-white font-body focus:outline-none focus:border-primary/50 w-56 transition-colors"
          />
        )}
        <Button size="sm" onClick={() => setChecked(true)} className="bg-white/10 hover:bg-white/20 text-white/80 text-xs rounded-xl">
          Check ➜
        </Button>
        {checked && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className={`text-sm font-bold px-3 py-1 rounded-full ${isCorrect ? "text-neon-green bg-neon-green/10" : "text-red-400 bg-red-400/10"}`}
          >
            {isCorrect ? "✓ Correct!" : `✗ Answer: ${exercise.answer}`}
          </motion.span>
        )}
      </div>
    </div>
  );
};

// Section renderer
const SectionRenderer = ({ section }: { section: ContentSection }) => (
  <div className="space-y-4">
    <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
      <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-neon-blue" />
      {section.heading}
    </h3>

    {section.image && (
      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        src={section.image}
        alt={section.heading}
        className="w-full max-h-64 object-cover rounded-2xl border-2 border-white/10 shadow-lg"
      />
    )}

    {section.youtubeId && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg"
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

    <div className="space-y-3">
      {section.body.split("\n\n").map((para, i) => (
        <p key={i} className="text-white/80 font-body text-[15px] leading-[1.8]">
          {para.split("\n").map((line, j) => (
            <span key={j}>
              {line.split("**").map((part, k) =>
                k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : part
              )}
              {j < para.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>

    {section.tip && (
      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-gradient-to-r from-neon-blue/15 to-transparent border-l-4 border-neon-blue rounded-r-xl p-4">
        <p className="text-sm font-body text-white/80">
          <span className="text-neon-blue font-bold">💡 Tip: </span>
          {section.tip.split("**").map((part, k) =>
            k % 2 === 1 ? <strong key={k} className="text-white">{part}</strong> : part
          )}
        </p>
      </motion.div>
    )}

    {section.funFact && (
      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-gradient-to-r from-neon-orange/15 to-transparent border-l-4 border-neon-orange rounded-r-xl p-4">
        <p className="text-sm font-body text-white/80">
          <span className="text-neon-orange font-bold">🌟 Fun Fact: </span>{section.funFact}
        </p>
      </motion.div>
    )}
  </div>
);

// Page renderer
const PageRenderer = ({ page }: { page: TextbookPage }) => (
  <motion.div
    key={page.pageTitle}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4 }}
    className="space-y-8"
  >
    {/* Page Header */}
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      {page.bannerImage ? (
        <div className="relative">
          <img src={page.bannerImage} alt={page.pageTitle} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{page.pageTitle}</h2>
            {page.subtitle && <p className="text-white/70 font-body text-sm mt-1">{page.subtitle}</p>}
          </div>
        </div>
      ) : (
        <div className={`bg-gradient-to-r ${page.bannerColor || "from-primary to-neon-blue"} p-8`}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">{page.pageTitle}</h2>
          {page.subtitle && <p className="text-white/80 font-body text-sm mt-1">{page.subtitle}</p>}
        </div>
      )}
    </div>

    {/* Content Sections */}
    <div className="space-y-8">
      {page.sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[hsl(220,30%,12%)] rounded-2xl p-6 md:p-8 border border-white/10"
        >
          <SectionRenderer section={section} />
        </motion.div>
      ))}
    </div>

    {/* Exercises */}
    {page.exercises && page.exercises.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(220,30%,10%)] rounded-2xl p-6 md:p-8 border-2 border-primary/20"
      >
        <h3 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">📝</span>
          Exercises — Test Your Understanding
        </h3>
        <div className="space-y-4">
          {page.exercises.map((ex, i) => (
            <ExerciseItem key={i} exercise={ex} />
          ))}
        </div>
      </motion.div>
    )}
  </motion.div>
);

// Main TopicViewer
const TopicViewer = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students } = useData();
  const textbook = useMemo(() => getTopicTextbook(topicId || ""), [topicId]);
  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load completion status
  useEffect(() => {
    if (!student || !topicId) return;
    supabase
      .from("topic_completions")
      .select("id")
      .eq("student_id", student.id)
      .eq("topic_id", topicId)
      .then(({ data }) => {
        if (data && data.length > 0) setIsCompleted(true);
      });
  }, [student, topicId]);

  const toggleComplete = useCallback(async () => {
    if (!student || !topicId) return;
    if (isCompleted) {
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
      setIsCompleted(false);
    } else {
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      setIsCompleted(true);
      toast.success("Topic completed! +50 XP 🎉");
    }
  }, [student, topicId, isCompleted]);

  if (!textbook) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <p className="text-white/40 font-body">Topic content not found.</p>
        <Button variant="ghost" onClick={() => navigate("/dashboard/curriculum")} className="mt-4 text-primary">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Curriculum
        </Button>
      </div>
    );
  }

  const totalPages = textbook.pages.length;
  const page = textbook.pages[currentPage];
  const isLastPage = currentPage === totalPages - 1;
  const isFirstPage = currentPage === 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Navigation Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard/curriculum")} className="text-white/60 hover:text-white gap-1">
          <ChevronLeft className="w-4 h-4" /> Curriculum
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-body font-semibold text-white/70">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
      </motion.div>

      {/* Topic Title */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <h1 className="font-display text-xl font-bold text-white/90">{textbook.topicTitle}</h1>
      </motion.div>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <PageRenderer page={page} />
      </AnimatePresence>

      {/* Bottom Navigation - READABLE PAGE NUMBERS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex items-center justify-between pb-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={isFirstPage}
          className="text-white/60 hover:text-white disabled:opacity-20 gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>

        {/* Readable page selector with good contrast */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[60%]">
          {textbook.pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-body font-bold transition-all ${
                i === currentPage
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                  : i < currentPage
                  ? "bg-neon-green/20 text-neon-green hover:bg-neon-green/30 border border-neon-green/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10"
              }`}
              title={p.pageTitle}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {isLastPage ? (
          <Button onClick={toggleComplete} className={`gap-1 ${isCompleted ? "bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/30" : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"}`}>
            {isCompleted ? <><CheckCircle2 className="w-4 h-4" /> Completed ✓</> : <><Circle className="w-4 h-4" /> Mark Complete</>}
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 gap-1"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default TopicViewer;
