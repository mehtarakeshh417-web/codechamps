import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ChevronDown, ChevronRight, CheckCircle2, XCircle, Clock, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";

interface SubmissionRow {
  id: string;
  assignment_id: string;
  student_id: string;
  answers: Record<string, string>;
  score: number;
  total_questions: number;
  submitted_at: string;
}

interface AssignmentWithSubs {
  id: string;
  title: string;
  targetClass: string;
  subject: string;
  questions: any[];
  totalStudents: number;
  submissions: (SubmissionRow & { studentName: string })[];
}

const TeacherResults = () => {
  const { user } = useAuth();
  const { teachers, getTeacherStudents } = useData();
  const teacher = teachers.find((t) => t.user_id === user?.id || t.id === user?.id);
  const allStudents = getTeacherStudents(user?.id || "");

  const [data, setData] = useState<AssignmentWithSubs[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    if (!teacher?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      // Fetch assignments
      const { data: assignments } = await supabase
        .from("assignments")
        .select("*")
        .eq("teacher_id", teacher.id)
        .order("created_at", { ascending: false });

      if (!assignments || assignments.length === 0) {
        setData([]);
        setLoading(false);
        return;
      }

      const assignmentIds = assignments.map((a) => a.id);

      // Fetch all submissions for these assignments
      const { data: submissions } = await supabase
        .from("submissions")
        .select("*")
        .in("assignment_id", assignmentIds);

      const subsMap = new Map<string, SubmissionRow[]>();
      (submissions || []).forEach((s: any) => {
        const list = subsMap.get(s.assignment_id) || [];
        list.push(s);
        subsMap.set(s.assignment_id, list);
      });

      const result: AssignmentWithSubs[] = assignments.map((a: any) => {
        const classStudents = allStudents.filter((s) => `${s.class}-${s.section}` === a.target_class);
        const subs = subsMap.get(a.id) || [];
        return {
          id: a.id,
          title: a.title,
          targetClass: a.target_class,
          subject: a.subject || "",
          questions: (a.questions as any[]) || [],
          totalStudents: classStudents.length,
          submissions: subs.map((sub) => {
            const student = allStudents.find((s) => s.id === sub.student_id);
            return { ...sub, studentName: student?.name || "Unknown Student" };
          }),
        };
      });

      setData(result);
    } catch (err) {
      console.error("Fetch results error:", err);
    }
    setLoading(false);
  }, [teacher?.id, allStudents]);

  useEffect(() => { fetchResults(); }, [fetchResults]);

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Results & Submissions</span></h1>
        <p className="text-white/50 font-body mb-8">Track student submissions and scores for each assignment</p>
      </motion.div>

      {data.length === 0 ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
          <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No assignments created yet. Create one to start tracking results.</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {data.map((a, i) => {
            const isExpanded = expandedId === a.id;
            const submittedCount = a.submissions.length;
            const notSubmitted = a.totalStudents - submittedCount;
            const avgScore = submittedCount > 0
              ? Math.round(a.submissions.reduce((sum, s) => sum + s.score, 0) / submittedCount)
              : 0;

            // Find students who haven't submitted
            const submittedStudentIds = new Set(a.submissions.map((s) => s.student_id));
            const classStudents = allStudents.filter((s) => `${s.class}-${s.section}` === a.targetClass);
            const pendingStudents = classStudents.filter((s) => !submittedStudentIds.has(s.id));

            return (
              <motion.div key={a.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-sm font-bold text-white">{a.title}</h3>
                      <p className="text-xs text-white/50 font-body">{a.targetClass} · {a.subject} · {a.questions.length} questions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full">
                        {submittedCount}/{a.totalStudents} submitted
                      </span>
                      {submittedCount > 0 && (
                        <span className="text-xs bg-neon-blue/15 text-neon-blue px-2 py-0.5 rounded-full">
                          Avg: {avgScore}%
                        </span>
                      )}
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-3">
                          {/* Submitted students */}
                          {a.submissions.length > 0 && (
                            <div>
                              <h4 className="text-xs text-white/60 font-body uppercase tracking-wider mb-2 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" /> Submitted ({submittedCount})
                              </h4>
                              <div className="space-y-2">
                                {a.submissions
                                  .sort((x, y) => y.score - x.score)
                                  .map((sub) => {
                                    const pct = sub.total_questions > 0 ? Math.round((sub.score / sub.total_questions) * 100) : 0;
                                    return (
                                      <div key={sub.id} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                                        <div>
                                          <span className="text-sm text-white/90 font-body font-semibold">{sub.studentName}</span>
                                          <p className="text-xs text-white/40 font-body">
                                            Submitted: {new Date(sub.submitted_at).toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className="text-sm font-display font-bold text-white">
                                            {sub.score}/{sub.total_questions}
                                          </span>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                                            pct >= 80 ? "bg-neon-green/15 text-neon-green" :
                                            pct >= 50 ? "bg-neon-orange/15 text-neon-orange" :
                                            "bg-destructive/15 text-destructive"
                                          }`}>
                                            {pct}%
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          )}

                          {/* Not submitted students */}
                          {pendingStudents.length > 0 && (
                            <div>
                              <h4 className="text-xs text-white/60 font-body uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-neon-orange" /> Not Submitted ({pendingStudents.length})
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {pendingStudents.map((s) => (
                                  <span key={s.id} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60 font-body flex items-center gap-1">
                                    <XCircle className="w-3 h-3 text-white/30" /> {s.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {a.submissions.length === 0 && pendingStudents.length === 0 && (
                            <p className="text-sm text-white/40 font-body text-center py-4">
                              No students found for this class.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherResults;
