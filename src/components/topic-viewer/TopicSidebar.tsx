import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen, Layers } from "lucide-react";
import type { Subject, Topic } from "@/lib/curriculumData";

interface TopicSidebarProps {
  subjects: Subject[];
  currentTopicId: string;
  completedTopics: string[];
  expandedSubjectId: string | null;
  onToggleSubject: (id: string) => void;
  onSelectTopic: (topicId: string) => void;
}

const colorMap: Record<string, string> = {
  "neon-blue": "from-[hsl(200,100%,50%)] to-[hsl(220,90%,60%)]",
  "neon-green": "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]",
  "neon-orange": "from-[hsl(25,100%,55%)] to-[hsl(45,100%,55%)]",
  "neon-purple": "from-[hsl(260,80%,60%)] to-[hsl(280,80%,55%)]",
  "neon-pink": "from-[hsl(330,90%,60%)] to-[hsl(350,90%,55%)]",
};

const TopicSidebar = ({
  subjects,
  currentTopicId,
  completedTopics,
  expandedSubjectId,
  onToggleSubject,
  onSelectTopic,
}: TopicSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[260px] shrink-0 hidden lg:block"
    >
      <div className="sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 scrollbar-thin">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 px-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/15 flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em]">Module</h3>
            <h3 className="font-display text-xs font-bold text-foreground/80 -mt-0.5">Navigation</h3>
          </div>
        </div>

        <div className="space-y-2">
          {subjects.map((subject) => {
            const gradient = colorMap[subject.color] || colorMap["neon-blue"];
            const isExpanded = expandedSubjectId === subject.id;
            const completedInSubject = subject.topics.filter((t) => completedTopics.includes(t.id)).length;
            const allDone = completedInSubject === subject.topics.length && subject.topics.length > 0;

            return (
              <div key={subject.id} className="rounded-xl overflow-hidden">
                {/* Subject Header */}
                <button
                  onClick={() => onToggleSubject(subject.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 transition-all duration-200 rounded-xl group ${
                    isExpanded ? "bg-white/[0.06]" : "bg-white/[0.03] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    {allDone ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-[10px] font-display font-bold text-white">{completedInSubject}/{subject.topics.length}</span>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-xs font-body font-bold text-foreground/85 block truncate">{subject.title}</span>
                    {allDone && (
                      <span className="text-[9px] font-body text-neon-green">All complete ✓</span>
                    )}
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-foreground/30" />
                  </motion.div>
                </button>

                {/* Topics List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-white/[0.06] pl-3 pb-2">
                        {subject.topics.map((topic, ti) => {
                          const isCurrent = topic.id === currentTopicId;
                          const isDone = completedTopics.includes(topic.id);

                          return (
                            <motion.button
                              key={topic.id}
                              initial={{ x: -8, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: ti * 0.03 }}
                              onClick={() => onSelectTopic(topic.id)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group/topic ${
                                isCurrent
                                  ? "bg-primary/[0.12] border border-primary/25 shadow-sm shadow-primary/5"
                                  : "hover:bg-white/[0.04]"
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                              ) : isCurrent ? (
                                <div className="w-4 h-4 rounded-full border-2 border-primary shrink-0 flex items-center justify-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-primary"
                                  />
                                </div>
                              ) : (
                                <Circle className="w-4 h-4 text-foreground/15 shrink-0 group-hover/topic:text-foreground/30" />
                              )}
                              <span
                                className={`text-xs font-body leading-snug ${
                                  isCurrent
                                    ? "text-primary font-bold"
                                    : isDone
                                    ? "text-foreground/50 line-through decoration-foreground/20"
                                    : "text-foreground/45 group-hover/topic:text-foreground/65"
                                }`}
                              >
                                {topic.title}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

export default TopicSidebar;
