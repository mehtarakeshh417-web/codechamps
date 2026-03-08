import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Zap, Clock, Trophy, Star, Target, Flame, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopicProgressPanelProps {
  currentPage: number;
  totalPages: number;
  isCompleted: boolean;
  topicTitle: string;
  xp: number;
  level: number;
  moduleTotalTopics: number;
  moduleCompletedTopics: number;
  onToggleComplete: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const xpLevelTitle = (level: number) => {
  const titles = ["Byte Beginner", "Code Cadet", "Script Ninja", "Dev Master", "Legendary Coder"];
  return titles[Math.min(level - 1, 4)];
};

const xpLevelEmoji = (level: number) => {
  const emojis = ["🌱", "⚡", "🥷", "🏆", "👑"];
  return emojis[Math.min(level - 1, 4)];
};

const TopicProgressPanel = ({
  currentPage,
  totalPages,
  isCompleted,
  topicTitle,
  xp,
  level,
  moduleTotalTopics,
  moduleCompletedTopics,
  onToggleComplete,
  onNextPage,
  onPrevPage,
  isFirstPage,
  isLastPage,
}: TopicProgressPanelProps) => {
  const pageProgress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;
  const moduleProgress = moduleTotalTopics > 0 ? Math.round((moduleCompletedTopics / moduleTotalTopics) * 100) : 0;
  const estimatedMinutes = Math.max(3, totalPages * 4);

  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-[280px] shrink-0 hidden xl:block"
    >
      <div className="sticky top-6 space-y-4">
        {/* Topic Progress Ring */}
        <div className="bg-gradient-to-br from-[hsl(220,30%,12%)] to-[hsl(220,25%,9%)] rounded-2xl border border-white/[0.08] p-5 shadow-xl shadow-black/20">
          <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Reading Progress</h4>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#progressGrad2)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 264` }}
                  animate={{ strokeDasharray: `${pageProgress * 2.64} ${264 - pageProgress * 2.64}` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(200,100%,50%)" />
                    <stop offset="50%" stopColor="hsl(260,80%,60%)" />
                    <stop offset="100%" stopColor="hsl(145,80%,50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={pageProgress}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-2xl font-bold text-foreground"
                >
                  {pageProgress}%
                </motion.span>
                <span className="text-[10px] text-foreground/35 font-body mt-0.5">Page {currentPage + 1} of {totalPages}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-foreground/35 text-xs font-body">
            <Clock className="w-3.5 h-3.5" />
            <span>~{estimatedMinutes} min read</span>
          </div>
        </div>

        {/* XP & Level Card */}
        <div className="bg-gradient-to-br from-[hsl(220,30%,12%)] to-[hsl(220,25%,9%)] rounded-2xl border border-white/[0.08] p-5 shadow-xl shadow-black/20">
          <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Your Level</h4>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/15 flex items-center justify-center shadow-lg shadow-neon-green/5">
              <span className="text-2xl">{xpLevelEmoji(level)}</span>
            </div>
            <div>
              <div className="font-display text-sm font-bold text-neon-green">{xpLevelTitle(level)}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-neon-orange" />
                <span className="font-display text-sm font-bold text-foreground">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* XP Reward Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-green/[0.06] to-neon-blue/[0.04] border border-neon-green/10"
          >
            <div className="w-8 h-8 rounded-lg bg-neon-green/15 flex items-center justify-center">
              <Star className="w-4 h-4 text-neon-green" />
            </div>
            <div>
              <div className="text-xs font-body font-bold text-neon-green">+50 XP</div>
              <div className="text-[10px] text-foreground/35 font-body">on completion</div>
            </div>
          </motion.div>
        </div>

        {/* Module Progress */}
        <div className="bg-gradient-to-br from-[hsl(220,30%,12%)] to-[hsl(220,25%,9%)] rounded-2xl border border-white/[0.08] p-5 shadow-xl shadow-black/20">
          <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-3">Module Progress</h4>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs font-body font-bold text-foreground/70">{moduleCompletedTopics}/{moduleTotalTopics} topics</span>
            </div>
            <span className="text-xs font-display font-bold text-primary">{moduleProgress}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${moduleProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-neon-green shadow-lg shadow-primary/20"
            />
          </div>
          {moduleProgress === 100 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-neon-green/[0.08] border border-neon-green/15 mt-3"
            >
              <Trophy className="w-4 h-4 text-neon-green" />
              <span className="text-xs font-body text-neon-green font-bold">Module Complete! 🎉</span>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-2.5">
          {isLastPage ? (
            <Button
              onClick={onToggleComplete}
              className={`w-full gap-2 rounded-xl h-12 font-body font-bold text-sm transition-all duration-300 ${
                isCompleted
                  ? "bg-neon-green/15 text-neon-green border-2 border-neon-green/30 hover:bg-neon-green/25 shadow-lg shadow-neon-green/10"
                  : "bg-gradient-to-r from-primary via-secondary to-neon-purple text-white hover:opacity-90 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
              }`}
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-5 h-5" /> Completed ✓</>
              ) : (
                <><Award className="w-5 h-5" /> Mark as Complete</>
              )}
            </Button>
          ) : (
            <Button
              onClick={onNextPage}
              className="w-full gap-2 rounded-xl h-12 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 font-body font-bold text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
            >
              Next Page <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={onPrevPage}
            disabled={isFirstPage}
            variant="ghost"
            className="w-full gap-2 rounded-xl h-10 text-foreground/35 hover:text-foreground/70 disabled:opacity-15 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Page
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default TopicProgressPanel;
