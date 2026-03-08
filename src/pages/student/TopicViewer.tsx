import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getTopicTextbook } from "@/lib/class5Content";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { BookOpen, ChevronLeft, ArrowLeft, ArrowRight, CheckCircle2, Circle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import TopicSidebar from "@/components/topic-viewer/TopicSidebar";
import TopicProgressPanel from "@/components/topic-viewer/TopicProgressPanel";
import { PremiumSection, PremiumExercise, PremiumPageHeader } from "@/components/topic-viewer/PremiumContentSections";

const xpLevel = (xp: number) => {
  if (xp < 500) return 1;
  if (xp < 1500) return 2;
  if (xp < 3000) return 3;
  if (xp < 5000) return 4;
  return 5;
};

const TopicViewer = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, refreshData } = useData();
  const textbook = useMemo(() => getTopicTextbook(topicId || ""), [topicId]);
  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  const currentSubject = useMemo(() => {
    if (!curriculum || !topicId) return null;
    return curriculum.subjects.find((s) => s.topics.some((t) => t.id === topicId)) || null;
  }, [curriculum, topicId]);

  useEffect(() => {
    if (currentSubject) setExpandedSubjectId(currentSubject.id);
  }, [currentSubject]);

  useEffect(() => {
    if (!student || !topicId) return;
    supabase
      .from("topic_completions")
      .select("id")
      .eq("student_id", student.id)
      .eq("topic_id", topicId)
      .then(({ data }) => {
        if (data && data.length > 0) setIsCompleted(true);
        else setIsCompleted(false);
      });
  }, [student, topicId]);

  useEffect(() => {
    if (!student) return;
    supabase
      .from("topic_completions")
      .select("topic_id")
      .eq("student_id", student.id)
      .then(({ data }) => {
        if (data) setCompletedTopics(data.map((d: any) => d.topic_id));
      });
  }, [student]);

  useEffect(() => {
    setCurrentPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topicId]);

  const toggleComplete = useCallback(async () => {
    if (!student || !topicId) return;
    if (isCompleted) {
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
      setIsCompleted(false);
      setCompletedTopics((prev) => prev.filter((id) => id !== topicId));
      toast.success("Topic unmarked");
    } else {
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      setIsCompleted(true);
      setCompletedTopics((prev) => [...prev, topicId]);
      toast.success("Topic completed! +50 XP 🎉");
    }
    await refreshData();
  }, [student, topicId, isCompleted, refreshData]);

  const handleSelectTopic = useCallback((newTopicId: string) => {
    if (newTopicId !== topicId) {
      navigate(`/dashboard/curriculum/topic/${newTopicId}`);
    }
  }, [topicId, navigate]);

  const moduleTotalTopics = currentSubject?.topics.length || 0;
  const moduleCompletedTopics = currentSubject?.topics.filter((t) => completedTopics.includes(t.id)).length || 0;

  if (!textbook) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-5">
          <BookOpen className="w-9 h-9 text-foreground/15" />
        </div>
        <h2 className="font-display text-lg text-foreground/50 mb-2">Content Not Found</h2>
        <p className="text-foreground/30 font-body text-sm mb-6">This topic doesn't have content yet.</p>
        <Button variant="ghost" onClick={() => navigate("/dashboard/curriculum")} className="text-primary gap-1.5">
          <ChevronLeft className="w-4 h-4" /> Back to Curriculum
        </Button>
      </div>
    );
  }

  const totalPages = textbook.pages.length;
  const page = textbook.pages[currentPage];
  const isLastPage = currentPage === totalPages - 1;
  const isFirstPage = currentPage === 0;
  const xp = student?.xp || 0;

  return (
    <div className="flex gap-6 -mx-2">
      {/* LEFT SIDEBAR */}
      {curriculum && (
        <TopicSidebar
          subjects={curriculum.subjects}
          currentTopicId={topicId || ""}
          completedTopics={completedTopics}
          expandedSubjectId={expandedSubjectId}
          onToggleSubject={(id) => setExpandedSubjectId((prev) => (prev === id ? null : id))}
          onSelectTopic={handleSelectTopic}
        />
      )}

      {/* CENTER CONTENT */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/curriculum")}
            className="text-foreground/40 hover:text-foreground gap-1.5 text-sm rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" /> Curriculum
          </Button>
          {isCompleted && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 text-xs font-display font-bold text-neon-green bg-neon-green/[0.08] border border-neon-green/20 px-4 py-1.5 rounded-full"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </motion.span>
          )}
        </motion.div>

        {/* Topic Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">{textbook.topicTitle}</h1>
          {currentSubject && (
            <p className="text-xs text-foreground/35 font-body mt-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" />
              {currentSubject.title}
            </p>
          )}
        </motion.div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${topicId}-${currentPage}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <PremiumPageHeader
              pageTitle={page.pageTitle}
              subtitle={page.subtitle}
              bannerImage={page.bannerImage}
              bannerColor={page.bannerColor}
              pageNumber={currentPage + 1}
              totalPages={totalPages}
            />

            <div className="space-y-7">
              {page.sections.map((section, i) => (
                <PremiumSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* Exercises */}
            {page.exercises && page.exercises.length > 0 && (
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 rounded-2xl overflow-hidden border border-primary/15 shadow-xl shadow-black/20"
              >
                <div className="bg-gradient-to-r from-primary/[0.08] via-secondary/[0.05] to-transparent px-7 py-5 border-b border-white/[0.06]">
                  <h3 className="font-display text-base md:text-lg font-bold text-foreground flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                      <span className="text-base">📝</span>
                    </div>
                    Test Your Understanding
                  </h3>
                  <p className="text-xs text-foreground/35 font-body mt-1 ml-12">Answer these questions to reinforce what you've learned</p>
                </div>
                <div className="p-6 space-y-4 bg-[hsl(220,30%,9%)]">
                  {page.exercises.map((ex, i) => (
                    <PremiumExercise key={i} exercise={ex} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 mb-10">
          {/* Page selector pills */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {textbook.pages.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`min-w-[42px] h-10 px-3 rounded-xl text-sm font-body font-bold transition-all duration-300 ${
                  i === currentPage
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-110 ring-2 ring-primary/20 ring-offset-2 ring-offset-[hsl(220,30%,8%)]"
                    : i < currentPage
                    ? "bg-neon-green/[0.1] text-neon-green hover:bg-neon-green/[0.18] border border-neon-green/15"
                    : "bg-white/[0.04] text-foreground/40 hover:bg-white/[0.08] hover:text-foreground/60 border border-white/[0.06]"
                }`}
                title={p.pageTitle}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Mobile nav buttons */}
          <div className="flex items-center justify-between xl:hidden">
            <Button
              variant="ghost"
              onClick={() => {
                setCurrentPage((p) => Math.max(0, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={isFirstPage}
              className="text-foreground/40 hover:text-foreground disabled:opacity-15 gap-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {isLastPage ? (
              <Button
                onClick={toggleComplete}
                className={`gap-2 rounded-xl h-11 font-bold ${
                  isCompleted
                    ? "bg-neon-green/15 text-neon-green border-2 border-neon-green/30 hover:bg-neon-green/25"
                    : "bg-gradient-to-r from-primary via-secondary to-neon-purple text-white hover:opacity-90 shadow-xl shadow-primary/25"
                }`}
              >
                {isCompleted ? (
                  <><CheckCircle2 className="w-4 h-4" /> Completed ✓</>
                ) : (
                  <><Award className="w-4 h-4" /> Mark Complete</>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 gap-2 rounded-xl shadow-xl shadow-primary/25 h-11 font-bold"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
      <TopicProgressPanel
        currentPage={currentPage}
        totalPages={totalPages}
        isCompleted={isCompleted}
        topicTitle={textbook.topicTitle}
        xp={xp}
        level={xpLevel(xp)}
        moduleTotalTopics={moduleTotalTopics}
        moduleCompletedTopics={moduleCompletedTopics}
        onToggleComplete={toggleComplete}
        onNextPage={() => {
          setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onPrevPage={() => {
          setCurrentPage((p) => Math.max(0, p - 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};

export default TopicViewer;
