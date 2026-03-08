import { motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen } from "lucide-react";
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
      className="w-72 shrink-0 hidden lg:block"
    >
      <div className="sticky top-6 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
        <div className="flex items-center gap-2 mb-4 px-1">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-display text-sm font-bold text-white/90 uppercase tracking-wider">Module Navigation</h3>
        </div>

        {subjects.map((subject) => {
          const gradient = colorMap[subject.color] || colorMap["neon-blue"];
          const isExpanded = expandedSubjectId === subject.id;
          const completedInSubject = subject.topics.filter((t) => completedTopics.includes(t.id)).length;

          return (
            <div key={subject.id} className="rounded-xl overflow-hidden">
              {/* Subject Header */}
              <button
                onClick={() => onToggleSubject(subject.id)}
                className="w-full flex items-center gap-3 px-3 py-3 bg-white/5 hover:bg-white/8 transition-colors rounded-xl"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-xs font-bold text-white">{completedInSubject}/{subject.topics.length}</span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-body font-semibold text-white/90">{subject.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-white/40" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-white/40" />
                )}
              </button>

              {/* Topics List */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-3 mt-1 space-y-0.5 border-l-2 border-white/10 pl-3 pb-2"
                >
                  {subject.topics.map((topic) => {
                    const isCurrent = topic.id === currentTopicId;
                    const isDone = completedTopics.includes(topic.id);

                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                          isCurrent
                            ? "bg-primary/15 border border-primary/30 shadow-sm shadow-primary/10"
                            : "hover:bg-white/5"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-primary shrink-0 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          </div>
                        ) : (
                          <Circle className="w-4 h-4 text-white/20 shrink-0 group-hover:text-white/40" />
                        )}
                        <span
                          className={`text-xs font-body leading-snug ${
                            isCurrent
                              ? "text-primary font-bold"
                              : isDone
                              ? "text-white/60"
                              : "text-white/50 group-hover:text-white/70"
                          }`}
                        >
                          {topic.title}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
};

export default TopicSidebar;
