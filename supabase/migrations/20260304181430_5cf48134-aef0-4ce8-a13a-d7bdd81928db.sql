
-- Create submissions table for tracking student assignment submissions
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}',
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 0,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Students can insert their own submissions
CREATE POLICY "Students can submit" ON public.submissions
  FOR INSERT TO authenticated
  WITH CHECK (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  );

-- Students can view their own submissions
CREATE POLICY "Students can view own submissions" ON public.submissions
  FOR SELECT TO authenticated
  USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  );

-- Teachers can view submissions for their assignments
CREATE POLICY "Teachers can view submissions" ON public.submissions
  FOR SELECT TO authenticated
  USING (
    assignment_id IN (SELECT id FROM assignments WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()))
  );

-- Admins can manage all
CREATE POLICY "Admins manage submissions" ON public.submissions
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- School can view submissions for their school's assignments
CREATE POLICY "Schools can view submissions" ON public.submissions
  FOR SELECT TO authenticated
  USING (
    assignment_id IN (SELECT id FROM assignments WHERE school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()))
  );

-- Now fix ALL existing RLS policies to be PERMISSIVE (they are currently RESTRICTIVE)
-- Drop and recreate assignments policies
DO $$ 
DECLARE pol record;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'assignments' AND schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.assignments', pol.policyname);
  END LOOP;
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'projects' AND schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.projects', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "admin_manage_assignments" ON public.assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "school_view_assignments" ON public.assignments FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "teacher_manage_assignments" ON public.assignments FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "student_view_assignments" ON public.assignments FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (SELECT (class || '-' || section) FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "admin_manage_projects" ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "school_view_projects" ON public.projects FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "teacher_manage_projects" ON public.projects FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "student_view_projects" ON public.projects FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (SELECT (class || '-' || section) FROM students WHERE user_id = auth.uid())
  );
