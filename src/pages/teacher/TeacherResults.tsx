import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, ChevronDown, ChevronRight, CheckCircle2, XCircle,
  Clock, Loader2, Filter, Users, BookOpen, GraduationCap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentInfo {
  id: string;
  name: string;
  class: string;
  section: string;
}

interface SubmissionInfo {
  id: string;
  assignment_id: string;
  student_id: string;
  answers: Record<string, string>;
  score: number;
  total_questions: number;
  submitted_at: string;
}

interface AssignmentInfo {
  id: string;
  title: string;
  target_class: string;
  subject: string;
  assignment_type: string;
  questions: any[];
  created_at: string;
  due_date: string | null;
}

const TeacherResults = () => {
  const { user } = useAuth();

  const [assignments, setAssignments] = useState<AssignmentInfo[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionInfo[]>([]);
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filters
  const [classFilter, setClassFilter] = useState<string>("all");
  const [view, setView] = useState<string>("assignments");

  const fetchAll = useCallback(async () => {
    if (!user?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      // Get teacher record
      const { data: teacher } = await supabase
        .from("teachers")
        .select("id, school_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!teacher) { setLoading(false); return; }

      // Fetch all in parallel
      const [aRes, subRes, stRes] = await Promise.all([
        supabase.from("assignments").select("*").eq("teacher_id", teacher.id).order("created_at", { ascending: false }),
        supabase.from("submissions").select("*"),
        supabase.from("students").select("id, name, class, section").eq("school_id", teacher.school_id),
      ]);

      setAssignments((aRes.data || []) as AssignmentInfo[]);
      setSubmissions((subRes.data || []) as SubmissionInfo[]);
      setStudents((stRes.data || []) as StudentInfo[]);
    } catch (err) {
      console.error("Fetch results error:", err);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Derived data
  const classes = useMemo(() => {
    const set = new Set(assignments.map((a) => a.target_class));
    return Array.from(set).sort();
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    if (classFilter === "all") return assignments;
    return assignments.filter((a) => a.target_class === classFilter);
  }, [assignments, classFilter]);

  const subsMap = useMemo(() => {
    const m = new Map<string, SubmissionInfo[]>();
    submissions.forEach((s) => {
      const list = m.get(s.assignment_id) || [];
      list.push(s);
      m.set(s.assignment_id, list);
    });
    return m;
  }, [submissions]);

  const studentMap = useMemo(() => {
    const m = new Map<string, StudentInfo>();
    students.forEach((s) => m.set(s.id, s));
    return m;
  }, [students]);

  // Student-wise: aggregate all assignments per student
  const studentWiseData = useMemo(() => {
    const classStudents = classFilter === "all"
      ? students
      : students.filter((s) => `${s.class}-${s.section}` === classFilter);

    return classStudents.map((st) => {
      const studentSubs = submissions.filter((sub) => sub.student_id === st.id);
      const totalAssignments = filteredAssignments.filter(
        (a) => a.target_class === `${st.class}-${st.section}`
      ).length;
      const submitted = studentSubs.length;
      const avgScore = submitted > 0
        ? Math.round(studentSubs.reduce((sum, s) => {
            const pct = s.total_questions > 0 ? (s.score / s.total_questions) * 100 : 0;
            return sum + pct;
          }, 0) / submitted)
        : 0;
      return { ...st, submitted, totalAssignments, avgScore, subs: studentSubs };
    }).sort((a, b) => b.avgScore - a.avgScore);
  }, [students, submissions, filteredAssignments, classFilter]);

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" />
        <p className="text-white/40 mt-3 font-body text-sm">Loading results…</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1">
          <span className="text-gradient-brand">Results & Tracking</span>
        </h1>
        <p className="text-white/50 font-body mb-6">Track submissions, scores, and student performance</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <SummaryCard icon={<BookOpen className="w-5 h-5" />} label="Assignments" value={assignments.length} color="from-neon-blue to-neon-purple" />
        <SummaryCard icon={<Users className="w-5 h-5" />} label="Students" value={students.length} color="from-neon-green to-emerald-500" />
        <SummaryCard icon={<CheckCircle2 className="w-5 h-5" />} label="Submissions" value={submissions.length} color="from-neon-orange to-amber-500" />
        <SummaryCard icon={<GraduationCap className="w-5 h-5" />} label="Classes" value={classes.length} color="from-pink-500 to-rose-500" />
      </div>

      {/* Filter + Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={view} onValueChange={setView} className="flex-1">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="assignments" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue text-white/60">
              Assignment-wise
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green text-white/60">
              Student-wise
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ASSIGNMENT-WISE VIEW */}
      {view === "assignments" && (
        <div>
          {filteredAssignments.length === 0 ? (
            <EmptyState message="No assignments found for this filter." />
          ) : (
            <div className="space-y-3">
              {filteredAssignments.map((a, i) => {
                const isExpanded = expandedId === a.id;
                const subs = subsMap.get(a.id) || [];
                const classStudents = students.filter((s) => `${s.class}-${s.section}` === a.target_class);
                const submittedCount = subs.length;
                const totalStudents = classStudents.length;
                const avgScore = submittedCount > 0
                  ? Math.round(subs.reduce((sum, s) => sum + (s.total_questions > 0 ? (s.score / s.total_questions) * 100 : 0), 0) / submittedCount)
                  : 0;
                const submittedIds = new Set(subs.map((s) => s.student_id));
                const pending = classStudents.filter((s) => !submittedIds.has(s.id));

                return (
                  <motion.div key={a.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.02 }}>
                    <div className="glass-card overflow-hidden">
                      <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shrink-0">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="font-display text-sm font-bold text-white truncate">{a.title}</h3>
                          <p className="text-xs text-white/50 font-body">{a.target_class} · {a.subject} · {a.assignment_type} · {a.questions.length} Q</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full">
                            {submittedCount}/{totalStudents}
                          </span>
                          {submittedCount > 0 && (
                            <span className="text-xs bg-neon-blue/15 text-neon-blue px-2 py-0.5 rounded-full">
                              Avg {avgScore}%
                            </span>
                          )}
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-4 border-t border-white/10 pt-3">
                              {/* Submitted */}
                              {subs.length > 0 && (
                                <div>
                                  <h4 className="text-xs text-white/60 font-body uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" /> Submitted ({submittedCount})
                                  </h4>
                                  <div className="space-y-2">
                                    {subs.sort((x, y) => y.score - x.score).map((sub) => {
                                      const st = studentMap.get(sub.student_id);
                                      const pct = sub.total_questions > 0 ? Math.round((sub.score / sub.total_questions) * 100) : 0;
                                      return (
                                        <div key={sub.id} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                                          <div>
                                            <span className="text-sm text-white/90 font-body font-semibold">{st?.name || "Unknown"}</span>
                                            <p className="text-xs text-white/40 font-body">
                                              {new Date(sub.submitted_at).toLocaleString()}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <span className="text-sm font-display font-bold text-white">
                                              {sub.score}/{sub.total_questions}
                                            </span>
                                            <ScoreBadge pct={pct} />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Not submitted */}
                              {pending.length > 0 && (
                                <div>
                                  <h4 className="text-xs text-white/60 font-body uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-neon-orange" /> Not Submitted ({pending.length})
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {pending.map((s) => (
                                      <span key={s.id} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60 font-body flex items-center gap-1">
                                        <XCircle className="w-3 h-3 text-white/30" /> {s.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {subs.length === 0 && pending.length === 0 && (
                                <p className="text-sm text-white/40 font-body text-center py-4">No students found for this class.</p>
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
      )}

      {/* STUDENT-WISE VIEW */}
      {view === "students" && (
        <div>
          {studentWiseData.length === 0 ? (
            <EmptyState message="No students found for this filter." />
          ) : (
            <div className="space-y-3">
              {studentWiseData.map((st, i) => {
                const isExpanded = expandedId === st.id;
                return (
                  <motion.div key={st.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.02 }}>
                    <div className="glass-card overflow-hidden">
                      <button onClick={() => setExpandedId(isExpanded ? null : st.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-emerald-500 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="font-display text-sm font-bold text-white truncate">{st.name}</h3>
                          <p className="text-xs text-white/50 font-body">{st.class}-{st.section}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full">
                            {st.submitted}/{st.totalAssignments} done
                          </span>
                          {st.submitted > 0 && <ScoreBadge pct={st.avgScore} />}
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
                              {st.subs.length === 0 ? (
                                <p className="text-sm text-white/40 font-body text-center py-3">No submissions yet.</p>
                              ) : (
                                st.subs.map((sub) => {
                                  const assignment = assignments.find((a) => a.id === sub.assignment_id);
                                  const pct = sub.total_questions > 0 ? Math.round((sub.score / sub.total_questions) * 100) : 0;
                                  return (
                                    <div key={sub.id} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                                      <div>
                                        <span className="text-sm text-white/90 font-body font-semibold">{assignment?.title || "Unknown"}</span>
                                        <p className="text-xs text-white/40 font-body">{assignment?.subject} · {new Date(sub.submitted_at).toLocaleDateString()}</p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-sm font-display font-bold text-white">{sub.score}/{sub.total_questions}</span>
                                        <ScoreBadge pct={pct} />
                                      </div>
                                    </div>
                                  );
                                })
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
      )}
    </div>
  );
};

// ---- Small sub-components ----

const SummaryCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) => (
  <div className="glass-card p-4 flex items-center gap-3">
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-xl font-display font-bold text-white">{value}</p>
      <p className="text-xs text-white/50 font-body">{label}</p>
    </div>
  </div>
);

const ScoreBadge = ({ pct }: { pct: number }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
    pct >= 80 ? "bg-neon-green/15 text-neon-green" :
    pct >= 50 ? "bg-neon-orange/15 text-neon-orange" :
    "bg-destructive/15 text-destructive"
  }`}>
    {pct}%
  </span>
);

const EmptyState = ({ message }: { message: string }) => (
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
    <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
    <p className="text-white/40 font-body">{message}</p>
  </motion.div>
);

export default TeacherResults;
