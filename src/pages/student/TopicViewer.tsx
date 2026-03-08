import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getTopicTextbook } from "@/lib/class5Content";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { BookOpen, ChevronLeft, ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
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

  // Find which subject this topic belongs to
  const currentSubject = useMemo(() => {
    if (!curriculum || !topicId) return null;
    return curriculum.subjects.find((s) => s.topics.some((t) => t.id === topicId)) || null;
  }, [curriculum, topicId]);

  // Auto-expand the current subject
  useEffect(() => {
    if (currentSubject) setExpandedSubjectId(currentSubject.id);
  }, [currentSubject]);

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
        else setIsCompleted(false);
      });
  }, [student, topicId]);

  // Load all completed topics
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

  // Reset page when topic changes
  useEffect(() => {
    setCurrentPage(0);
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

  // Module stats
  const moduleTotalTopics = currentSubject?.topics.length || 0;
  const moduleCompletedTopics = currentSubject?.topics.filter((t) => completedTopics.includes(t.id)).length || 0;

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
  const xp = student?.xp || 0;

  return (
    <div className="flex gap-6 -mx-2">
      {/* LEFT SIDEBAR - Module Navigation */}
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

      {/* CENTER - Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-5">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/curriculum")}
            className="text-white/50 hover:text-white gap-1.5 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Curriculum
          </Button>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-body text-neon-green bg-neon-green/10 border border-neon-green/20 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
        </motion.div>

        {/* Topic Title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-2xl font-bold text-white">{textbook.topicTitle}</h1>
          {currentSubject && (
            <p className="text-sm text-white/40 font-body mt-1">{currentSubject.title}</p>
          )}
        </motion.div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${topicId}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* Page Header Banner */}
            <PremiumPageHeader
              pageTitle={page.pageTitle}
              subtitle={page.subtitle}
              bannerImage={page.bannerImage}
              bannerColor={page.bannerColor}
              pageNumber={currentPage + 1}
              totalPages={totalPages}
            />

            {/* Content Sections */}
            <div className="space-y-6">
              {page.sections.map((section, i) => (
                <PremiumSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* Exercises */}
            {page.exercises && page.exercises.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-[hsl(220,30%,10%)] rounded-2xl border-2 border-primary/15 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-primary/10 to-transparent px-6 py-4 border-b border-white/5">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm">📝</span>
                    Test Your Understanding
                  </h3>
                  <p className="text-xs text-white/40 font-body mt-1">Answer these questions to reinforce what you've learned</p>
                </div>
                <div className="p-6 space-y-4">
                  {page.exercises.map((ex, i) => (
                    <PremiumExercise key={i} exercise={ex} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 mb-8"
        >
          {/* Page selector */}
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {textbook.pages.map((p, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`min-w-[40px] h-10 px-2.5 rounded-xl text-sm font-body font-bold transition-all duration-200 ${
                  i === currentPage
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-110"
                    : i < currentPage
                    ? "bg-neon-green/15 text-neon-green hover:bg-neon-green/25 border border-neon-green/20"
                    : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white border border-white/8"
                }`}
                title={p.pageTitle}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Nav buttons (mobile/tablet - visible when right panel hidden) */}
          <div className="flex items-center justify-between xl:hidden">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={isFirstPage}
              className="text-white/50 hover:text-white disabled:opacity-20 gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {isLastPage ? (
              <Button
                onClick={toggleComplete}
                className={`gap-1.5 rounded-xl ${
                  isCompleted
                    ? "bg-neon-green/15 text-neon-green border border-neon-green/30 hover:bg-neon-green/25"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg"
                }`}
              >
                {isCompleted ? (
                  <><CheckCircle2 className="w-4 h-4" /> Completed ✓</>
                ) : (
                  <><Circle className="w-4 h-4" /> Mark Complete</>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 gap-1.5 rounded-xl shadow-lg"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL - Progress & Actions */}
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
        onNextPage={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
        onPrevPage={() => setCurrentPage((p) => Math.max(0, p - 1))}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};

export default TopicViewer;
