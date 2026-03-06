import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Plus, Trash2, ChevronDown, ChevronRight, Users, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  targetClass: string;
  technology: string;
  submissionType: string;
  dueDate: string;
  createdAt: string;
}

interface ProjectSubmissionRecord {
  id: string;
  studentName: string;
  notes: string;
  submittedAt: string;
}

const TECH_OPTIONS = ["Scratch Jr", "Scratch", "MS Paint", "MS Word", "MS PowerPoint", "MS Excel", "MS Access", "HTML/CSS", "Python", "GIMP", "KRITA", "Canva", "MIT App Inventor"];
const SUBMISSION_TYPES = ["Screenshot", "File Upload", "Code", "Link"];

const TeacherProjects = () => {
  const { user } = useAuth();
  const { teachers, getTeacherStudents } = useData();
  const teacher = teachers.find((t) => t.user_id === user?.id || t.id === user?.id);
  const myClasses = teacher?.classes || [];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [projSubsMap, setProjSubsMap] = useState<Record<string, ProjectSubmissionRecord[]>>({});
  const [form, setForm] = useState({ title: "", description: "", targetClass: myClasses[0] || "", technology: TECH_OPTIONS[0], submissionType: SUBMISSION_TYPES[0], dueDate: "" });

  const fetchProjects = useCallback(async () => {
    if (!teacher?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("teacher_id", teacher.id)
        .order("created_at", { ascending: false });
      if (error) { console.error("Fetch projects error:", error); toast.error("Failed to load projects. Please refresh."); }
      else {
        const mapped = (data || []).map((p: any) => ({
          id: p.id, title: p.title, description: p.description,
          targetClass: p.target_class, technology: p.technology,
          submissionType: p.submission_type || "Screenshot",
          dueDate: p.due_date || "", createdAt: p.created_at,
        }));
        setProjects(mapped);

        // Fetch project submissions
        if (mapped.length > 0) {
          const ids = mapped.map(p => p.id);
          const { data: subs } = await supabase
            .from("project_submissions" as any)
            .select("*, students(name)")
            .in("project_id", ids);
          
          const map: Record<string, ProjectSubmissionRecord[]> = {};
          ((subs || []) as any[]).forEach((s: any) => {
            if (!map[s.project_id]) map[s.project_id] = [];
            map[s.project_id].push({
              id: s.id,
              studentName: s.students?.name || "Unknown",
              notes: s.notes,
              submittedAt: s.submitted_at,
            });
          });
          setProjSubsMap(map);
        }
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      toast.error("Failed to load projects. Please refresh.");
    }
    setLoading(false);
  }, [teacher?.id]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  useEffect(() => {
    if (myClasses.length > 0 && !form.targetClass) {
      setForm(f => ({ ...f, targetClass: myClasses[0] }));
    }
  }, [myClasses]);

  const createProject = useCallback(async () => {
    if (!form.title.trim() || !form.description.trim() || !form.targetClass) { toast.error("Fill all fields"); return; }
    if (!teacher?.id || !teacher?.schoolId) { toast.error("Teacher data not loaded"); return; }

    const { error } = await supabase.from("projects").insert({
      title: form.title, description: form.description,
      target_class: form.targetClass, technology: form.technology,
      submission_type: form.submissionType,
      school_id: teacher.schoolId, teacher_id: teacher.id,
      due_date: form.dueDate,
    });

    if (error) { toast.error("Failed to save project: " + error.message); return; }

    await fetchProjects();
    setShowForm(false);
    setForm({ title: "", description: "", targetClass: myClasses[0] || "", technology: TECH_OPTIONS[0], submissionType: SUBMISSION_TYPES[0], dueDate: "" });
    toast.success("Project assigned!");
  }, [form, teacher, myClasses, fetchProjects]);

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error("Delete failed"); return; }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const allStudents = getTeacherStudents(user?.id || "");

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Projects</span></h1>
          <p className="text-white/60 font-body">{projects.length} project(s) assigned</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">
          <Plus className="w-4 h-4 mr-1" /> Assign Project
        </Button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-white">Assign New Project</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project Title" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                <select value={form.targetClass} onChange={(e) => setForm({ ...form, targetClass: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  {myClasses.map((c) => <option key={c} value={c} className="bg-[hsl(220,30%,15%)]">{c}</option>)}
                </select>
                <select value={form.technology} onChange={(e) => setForm({ ...form, technology: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  {TECH_OPTIONS.map((t) => <option key={t} value={t} className="bg-[hsl(220,30%,15%)]">{t}</option>)}
                </select>
                <select value={form.submissionType} onChange={(e) => setForm({ ...form, submissionType: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  {SUBMISSION_TYPES.map((t) => <option key={t} value={t} className="bg-[hsl(220,30%,15%)]">{t}</option>)}
                </select>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
              </div>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Project description and instructions..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50 resize-none" />
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setShowForm(false)} className="text-white/50">Cancel</Button>
                <Button onClick={createProject} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">Assign Project</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="glass-card p-12 text-center">
          <Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" />
        </div>
      ) : projects.length === 0 && !showForm ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
          <Code className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No projects assigned yet. Click "Assign Project" to create one.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => {
            const isExpanded = expandedId === p.id;
            const classStudents = allStudents.filter((s) => p.targetClass.includes(s.class));
            return (
              <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setExpandedId(isExpanded ? null : p.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center shrink-0">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-sm font-bold text-white">{p.title}</h3>
                      <p className="text-xs text-white/50 font-body">{p.targetClass} · {p.technology} · {(projSubsMap[p.id] || []).length} submissions</p>
                    </div>
                    <span className="text-xs bg-neon-orange/15 text-neon-orange px-2 py-0.5 rounded-full">{p.technology}</span>
                    {(projSubsMap[p.id] || []).length > 0 && <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full">{projSubsMap[p.id].length}</span>}
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                          <p className="text-sm text-white/70 font-body">{p.description}</p>
                          <p className="text-xs text-white/40 font-body">Submission: {p.submissionType}</p>
                          {p.dueDate && <p className="text-xs text-white/40 font-body">Due: {new Date(p.dueDate).toLocaleDateString()}</p>}
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-xs text-white/50 font-body flex items-center gap-1 mb-2"><Users className="w-3.5 h-3.5" /> Assigned to {classStudents.length} students</p>
                            <div className="flex flex-wrap gap-1">
                              {classStudents.slice(0, 10).map((s) => (
                                <span key={s.id} className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-white/60">{s.name}</span>
                              ))}
                              {classStudents.length > 10 && <span className="text-xs text-white/40">+{classStudents.length - 10} more</span>}
                            </div>
                          </div>
                          {/* Project Submissions */}
                          {(projSubsMap[p.id] || []).length > 0 && (
                            <div className="border-t border-white/10 pt-3">
                              <p className="text-xs text-white/50 font-body flex items-center gap-1 mb-2"><CheckCircle2 className="w-3.5 h-3.5" /> {projSubsMap[p.id].length} Student Submission(s)</p>
                              <div className="space-y-1.5">
                                {projSubsMap[p.id].map((sub) => (
                                  <div key={sub.id} className="bg-white/5 rounded-lg p-2.5">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="text-sm text-white/90 font-body font-semibold">{sub.studentName}</p>
                                      <p className="text-xs text-white/50 font-body">{new Date(sub.submittedAt).toLocaleString()}</p>
                                    </div>
                                    <p className="text-xs text-white/60 font-body">{sub.notes}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end">
                            <Button size="sm" variant="ghost" onClick={() => deleteProject(p.id)} className="text-destructive hover:text-destructive/80">
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </div>
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

export default TeacherProjects;
