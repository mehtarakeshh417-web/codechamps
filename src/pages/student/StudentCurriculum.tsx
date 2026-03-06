import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getCurriculumForClass, type Topic } from "@/lib/curriculumData";
import { getTopicContent, type Exercise } from "@/lib/class5Content";
import { BookOpen, ChevronRight, ChevronDown, CheckCircle2, Circle, Play, Code, FileText, Sparkles, Monitor, Palette, Gamepad2, Table, HardDrive, Cpu, Image, Terminal, Layers, Database, Paintbrush, Layout, Smartphone, Presentation, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useData } from "@/contexts/DataContext";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Palette, Gamepad2, FileText, Code, Cpu, HardDrive, AppWindow: Monitor, Table,
  Image, Terminal, Layers, Database, Paintbrush, Layout, Smartphone, Sparkles, Presentation, BarChart3,
};

const colorMap: Record<string, string> = {
  "neon-blue": "from-[hsl(200,100%,50%)] to-[hsl(220,90%,60%)]",
  "neon-green": "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]",
  "neon-orange": "from-[hsl(25,100%,55%)] to-[hsl(45,100%,55%)]",
  "neon-purple": "from-[hsl(260,80%,60%)] to-[hsl(280,80%,55%)]",
  "neon-pink": "from-[hsl(330,90%,60%)] to-[hsl(350,90%,55%)]",
};

const StudentCurriculum = () => {
  const { user } = useAuth();
  const { students } = useData();
  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);

  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [viewingLesson, setViewingLesson] = useState<{ subjectId: string; topicId: string; lessonIdx: number } | null>(null);

  // Load completions from DB
  useEffect(() => {
    if (!student) { setLoading(false); return; }
    const load = async () => {
      const { data } = await supabase
        .from("topic_completions")
        .select("topic_id")
        .eq("student_id", student.id);
      if (data) setCompletedTopics(data.map((d: any) => d.topic_id));
      setLoading(false);
    };
    load();
  }, [student]);

  const toggleComplete = useCallback(async (topicId: string) => {
    if (!student) return;
    const isCompleted = completedTopics.includes(topicId);

    if (isCompleted) {
      // Remove completion
      setCompletedTopics((prev) => prev.filter((id) => id !== topicId));
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
    } else {
      // Add completion
      setCompletedTopics((prev) => [...prev, topicId]);
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      toast.success("Topic completed! +50 XP 🎉");
    }
  }, [student, completedTopics]);

  if (!curriculum) {
    return (
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Curriculum</span></h1>
          <p className="text-white/50 font-body mb-8">Your class-wise learning path</p>
        </motion.div>
        <div className="glass-card p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No curriculum found for your class. Please contact your teacher.</p>
        </div>
      </div>
    );
  }

  const totalTopics = curriculum.subjects.reduce((s, sub) => s + sub.topics.length, 0);
  const completedCount = completedTopics.length;

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Curriculum</span></h1>
        <p className="text-white/60 font-body mb-2">{curriculum.className} · {completedCount}/{totalTopics} topics completed</p>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-8">
          <motion.div initial={{ width: 0 }} animate={{ width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue" />
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-white/40 font-body">Loading...</div>
      ) : (
        <div className="space-y-4">
          {curriculum.subjects.map((subject, si) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const isExpanded = expandedSubject === subject.id;
            const subjectCompleted = subject.topics.filter((t) => completedTopics.includes(t.id)).length;
            const gradient = colorMap[subject.color] || colorMap["neon-blue"];

            return (
              <motion.div key={subject.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: si * 0.05 }}>
                <button onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="w-full glass-card p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-lg font-bold text-white">{subject.title}</h3>
                    <p className="text-xs text-white/50 font-body">{subjectCompleted}/{subject.topics.length} topics completed</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue" style={{ width: `${subject.topics.length > 0 ? (subjectCompleted / subject.topics.length) * 100 : 0}%` }} />
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-white/40" /> : <ChevronRight className="w-5 h-5 text-white/40" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="ml-6 mt-2 space-y-2 border-l-2 border-white/10 pl-4">
                        {subject.topics.map((topic) => (
                          <TopicCard
                            key={topic.id}
                            topic={topic}
                            isCompleted={completedTopics.includes(topic.id)}
                            isExpanded={expandedTopic === topic.id}
                            onToggleExpand={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                            onToggleComplete={() => toggleComplete(topic.id)}
                            viewingLesson={viewingLesson}
                            onViewLesson={(lessonIdx) => setViewingLesson(viewingLesson?.topicId === topic.id && viewingLesson.lessonIdx === lessonIdx ? null : { subjectId: subject.id, topicId: topic.id, lessonIdx })}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Exercise component
const ExerciseItem = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = exercise.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

  if (exercise.type === "practice") {
    return (
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex items-start gap-2">
          <span className="text-xs bg-neon-orange/20 text-neon-orange px-2 py-0.5 rounded-full font-bold shrink-0 mt-0.5">Practice</span>
          <p className="text-sm text-white/80 font-body">{exercise.question}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex items-start gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 mt-0.5 ${exercise.type === "true-false" ? "bg-neon-purple/20 text-neon-purple" : "bg-neon-blue/20 text-neon-blue"}`}>
          {exercise.type === "true-false" ? "True/False" : "Fill in the Blank"}
        </span>
        <p className="text-sm text-white/80 font-body">{exercise.question}</p>
      </div>
      <div className="flex items-center gap-2 ml-0">
        {exercise.type === "true-false" ? (
          <div className="flex gap-2">
            {exercise.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => { setUserAnswer(opt); setChecked(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-body font-bold transition-colors ${userAnswer === opt ? "bg-primary/30 text-primary border border-primary/50" : "bg-white/10 text-white/60 hover:bg-white/15"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <input
            value={userAnswer}
            onChange={(e) => { setUserAnswer(e.target.value); setChecked(false); }}
            placeholder="Your answer..."
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-body focus:outline-none focus:border-primary/50 w-48"
          />
        )}
        <Button size="sm" variant="ghost" onClick={() => setChecked(true)} className="text-xs text-white/60 hover:text-white">
          Check
        </Button>
        {checked && (
          <span className={`text-xs font-bold ${isCorrect ? "text-neon-green" : "text-red-400"}`}>
            {isCorrect ? "✓ Correct!" : `✗ Answer: ${exercise.answer}`}
          </span>
        )}
      </div>
    </div>
  );
};

interface TopicCardProps {
  topic: Topic;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleComplete: () => void;
  viewingLesson: { subjectId: string; topicId: string; lessonIdx: number } | null;
  onViewLesson: (idx: number) => void;
}

const TopicCard = ({ topic, isCompleted, isExpanded, onToggleExpand, onToggleComplete, viewingLesson, onViewLesson }: TopicCardProps) => {
  const richContent = getTopicContent(topic.id);

  return (
    <div>
      <div className="flex items-center gap-2">
        <button onClick={(e) => { e.stopPropagation(); onToggleComplete(); }} className="shrink-0" title={isCompleted ? "Mark as incomplete" : "Mark as complete"}>
          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-neon-green" /> : <Circle className="w-5 h-5 text-white/40 hover:text-white/60" />}
        </button>
        <button onClick={onToggleExpand} className={`flex-1 p-4 rounded-xl border transition-all text-left flex items-center gap-3 ${isCompleted ? "bg-[hsl(145,80%,50%,0.08)] border-[hsl(145,80%,50%,0.3)]" : "bg-white/5 border-white/10 hover:bg-white/8"}`}>
          <div className="flex-1">
            <span className="font-body text-sm font-semibold text-white">{topic.title}</span>
            <span className="text-xs text-white/50 ml-2">{topic.lessons.length} lessons · {topic.activities.length} activities</span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="ml-4 mt-2 space-y-4 pb-2 bg-[hsl(220,30%,12%)] rounded-xl p-4">

              {/* Rich Theory Content with Image */}
              {richContent && (
                <div className="space-y-3">
                  <p className="text-xs text-neon-green/60 font-body uppercase tracking-wider font-bold px-1">📖 Theory</p>
                  <img src={richContent.image} alt={topic.title} className="w-full max-h-48 object-cover rounded-lg border border-white/10" />
                  <div className="bg-[hsl(220,28%,16%)] rounded-lg p-4 border border-white/10">
                    {richContent.theory.split("\n\n").map((para, i) => (
                      <p key={i} className="text-white/80 font-body text-sm leading-relaxed mb-2 last:mb-0">
                        {para.split("**").map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons (for topics without rich content) */}
              {!richContent && (
                <div className="space-y-1">
                  <p className="text-xs text-neon-blue/60 font-body uppercase tracking-wider mb-1 px-2 font-bold">Lessons</p>
                  {topic.lessons.map((lesson, li) => {
                    const isViewing = viewingLesson?.topicId === topic.id && viewingLesson.lessonIdx === li;
                    return (
                      <div key={lesson.id}>
                        <button onClick={() => onViewLesson(li)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 transition-colors ${isViewing ? "bg-primary/20 text-primary font-semibold" : "text-white/90 hover:bg-white/10 hover:text-white"}`}>
                          <Play className="w-3.5 h-3.5 shrink-0" /> {lesson.title}
                        </button>
                        <AnimatePresence>
                          {isViewing && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mx-3 my-2 p-4 rounded-xl bg-[hsl(220,28%,18%)] border border-white/10">
                                <p className="text-white/80 font-body text-sm leading-relaxed">{lesson.content}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Exercises (for topics with rich content) */}
              {richContent && richContent.exercises.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-neon-purple/60 font-body uppercase tracking-wider font-bold px-1">📝 Exercises</p>
                  {richContent.exercises.map((ex, i) => (
                    <ExerciseItem key={i} exercise={ex} index={i} />
                  ))}
                </div>
              )}

              {/* Activities & Projects */}
              <div className="space-y-1">
                <p className="text-xs text-neon-orange/60 font-body uppercase tracking-wider mb-1 px-2 font-bold">Activities & Projects</p>
                {topic.activities.map((act) => (
                  <div key={act.id} className="px-3 py-2 rounded-lg text-sm font-body flex items-center gap-2 text-white/90">
                    {act.type === "project" ? <Code className="w-3.5 h-3.5 text-neon-orange shrink-0" /> : <FileText className="w-3.5 h-3.5 text-neon-blue shrink-0" />}
                    <span>{act.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ml-auto font-display uppercase tracking-wider font-bold ${act.type === "project" ? "bg-neon-orange/20 text-neon-orange" : "bg-neon-blue/20 text-neon-blue"}`}>
                      {act.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mark as Complete button */}
              <div className="pt-2 border-t border-white/10">
                <Button
                  onClick={onToggleComplete}
                  variant={isCompleted ? "outline" : "default"}
                  className={`w-full ${isCompleted ? "border-neon-green/30 text-neon-green hover:bg-neon-green/10" : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"}`}
                >
                  {isCompleted ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Completed ✓</>
                  ) : (
                    <><Circle className="w-4 h-4 mr-2" /> Mark as Complete</>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentCurriculum;
