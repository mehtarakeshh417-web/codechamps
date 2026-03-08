import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Zap, Clock, Trophy, Star, Target } from "lucide-react";
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
      className="w-72 shrink-0 hidden xl:block"
    >
      <div className="sticky top-6 space-y-4">
        {/* Topic Progress */}
        <div className="bg-[hsl(220,30%,12%)] rounded-2xl border border-white/10 p-5">
          <h4 className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Topic Progress</h4>
          
          {/* Circular Progress */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${pageProgress * 2.64} ${264 - pageProgress * 2.64}`}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(200,100%,50%)" />
                    <stop offset="100%" stopColor="hsl(145,80%,50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-bold text-white">{pageProgress}%</span>
                <span className="text-[10px] text-white/40 font-body">Page {currentPage + 1}/{totalPages}</span>
              </div>
            </div>
          </div>

          {/* Time Estimate */}
          <div className="flex items-center gap-2 text-white/40 text-xs font-body mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>~{estimatedMinutes} min read</span>
          </div>
        </div>

        {/* XP & Level */}
        <div className="bg-[hsl(220,30%,12%)] rounded-2xl border border-white/10 p-5">
          <h4 className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Your Stats</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-neon-green">{xp} XP</div>
                <div className="text-[10px] text-white/40 font-body">Level {level} · {xpLevelTitle(level)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-green/5 border border-neon-green/10">
              <Star className="w-4 h-4 text-neon-orange" />
              <span className="text-xs font-body text-white/60">+50 XP on completion</span>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="bg-[hsl(220,30%,12%)] rounded-2xl border border-white/10 p-5">
          <h4 className="font-display text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Module Progress</h4>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs font-body text-white/60">{moduleCompletedTopics}/{moduleTotalTopics} topics done</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${moduleProgress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-neon-blue"
            />
          </div>
          {moduleProgress === 100 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-green/10 border border-neon-green/20">
              <Trophy className="w-4 h-4 text-neon-green" />
              <span className="text-xs font-body text-neon-green font-bold">Module Complete! 🎉</span>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-2">
          {isLastPage ? (
            <Button
              onClick={onToggleComplete}
              className={`w-full gap-2 rounded-xl h-11 font-body font-bold text-sm ${
                isCompleted
                  ? "bg-neon-green/15 text-neon-green border border-neon-green/30 hover:bg-neon-green/25"
                  : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/20"
              }`}
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-4 h-4" /> Completed ✓</>
              ) : (
                <><Circle className="w-4 h-4" /> Mark as Complete</>
              )}
            </Button>
          ) : (
            <Button
              onClick={onNextPage}
              className="w-full gap-2 rounded-xl h-11 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 font-body font-bold text-sm shadow-lg shadow-primary/20"
            >
              Next Page <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={onPrevPage}
            disabled={isFirstPage}
            variant="ghost"
            className="w-full gap-2 rounded-xl h-10 text-white/40 hover:text-white/70 disabled:opacity-20 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Page
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default TopicProgressPanel;
