
-- Drop ALL existing policies on ALL tables and recreate as PERMISSIVE

-- === SCHOOLS ===
DROP POLICY IF EXISTS "Admins can manage all schools" ON public.schools;
DROP POLICY IF EXISTS "Schools can update own record" ON public.schools;
DROP POLICY IF EXISTS "Schools can view own record" ON public.schools;
DROP POLICY IF EXISTS "Students can view own school" ON public.schools;
DROP POLICY IF EXISTS "Teachers can view own school" ON public.schools;

CREATE POLICY "Admins can manage all schools" ON public.schools FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can view own record" ON public.schools FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Schools can update own record" ON public.schools FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view own school" ON public.schools FOR SELECT TO authenticated
  USING (id IN (SELECT school_id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own school" ON public.schools FOR SELECT TO authenticated
  USING (id IN (SELECT school_id FROM students WHERE user_id = auth.uid()));

-- === TEACHERS ===
DROP POLICY IF EXISTS "Admins can manage all teachers" ON public.teachers;
DROP POLICY IF EXISTS "Schools can manage own teachers" ON public.teachers;
DROP POLICY IF EXISTS "Students can view own teacher" ON public.teachers;
DROP POLICY IF EXISTS "Teachers can update own record" ON public.teachers;
DROP POLICY IF EXISTS "Teachers can view own record" ON public.teachers;

CREATE POLICY "Admins can manage all teachers" ON public.teachers FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can manage own teachers" ON public.teachers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM schools WHERE schools.id = teachers.school_id AND schools.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM schools WHERE schools.id = teachers.school_id AND schools.user_id = auth.uid()));

CREATE POLICY "Teachers can view own record" ON public.teachers FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can update own record" ON public.teachers FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Students can view own teacher" ON public.teachers FOR SELECT TO authenticated
  USING (id IN (SELECT teacher_id FROM students WHERE user_id = auth.uid()));

-- === STUDENTS ===
DROP POLICY IF EXISTS "Admins can manage all students" ON public.students;
DROP POLICY IF EXISTS "Schools can manage own students" ON public.students;
DROP POLICY IF EXISTS "Students can view own record" ON public.students;
DROP POLICY IF EXISTS "Teachers can update own students" ON public.students;
DROP POLICY IF EXISTS "Teachers can view own students" ON public.students;

CREATE POLICY "Admins can manage all students" ON public.students FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Schools can manage own students" ON public.students FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM schools WHERE schools.id = students.school_id AND schools.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM schools WHERE schools.id = students.school_id AND schools.user_id = auth.uid()));

CREATE POLICY "Teachers can view own students" ON public.students FOR SELECT TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "Teachers can update own students" ON public.students FOR UPDATE TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own record" ON public.students FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- === ASSIGNMENTS ===
DROP POLICY IF EXISTS "admin_manage_assignments" ON public.assignments;
DROP POLICY IF EXISTS "school_view_assignments" ON public.assignments;
DROP POLICY IF EXISTS "student_view_assignments" ON public.assignments;
DROP POLICY IF EXISTS "teacher_manage_assignments" ON public.assignments;

CREATE POLICY "admin_manage_assignments" ON public.assignments FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "teacher_manage_assignments" ON public.assignments FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()))
  WITH CHECK (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "school_view_assignments" ON public.assignments FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "student_view_assignments" ON public.assignments FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (SELECT class || '-' || section FROM students WHERE user_id = auth.uid())
  );

-- === PROJECTS ===
DROP POLICY IF EXISTS "admin_manage_projects" ON public.projects;
DROP POLICY IF EXISTS "school_view_projects" ON public.projects;
DROP POLICY IF EXISTS "student_view_projects" ON public.projects;
DROP POLICY IF EXISTS "teacher_manage_projects" ON public.projects;

CREATE POLICY "admin_manage_projects" ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "teacher_manage_projects" ON public.projects FOR ALL TO authenticated
  USING (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()))
  WITH CHECK (teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid()));

CREATE POLICY "school_view_projects" ON public.projects FOR SELECT TO authenticated
  USING (school_id IN (SELECT id FROM schools WHERE user_id = auth.uid()));

CREATE POLICY "student_view_projects" ON public.projects FOR SELECT TO authenticated
  USING (
    school_id IN (SELECT school_id FROM students WHERE user_id = auth.uid())
    AND target_class IN (SELECT class || '-' || section FROM students WHERE user_id = auth.uid())
  );

-- === SUBMISSIONS ===
DROP POLICY IF EXISTS "Admins manage submissions" ON public.submissions;
DROP POLICY IF EXISTS "Schools can view submissions" ON public.submissions;
DROP POLICY IF EXISTS "Students can submit" ON public.submissions;
DROP POLICY IF EXISTS "Students can view own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Teachers can view submissions" ON public.submissions;

CREATE POLICY "Admins manage submissions" ON public.submissions FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Teachers can view submissions" ON public.submissions FOR SELECT TO authenticated
  USING (assignment_id IN (SELECT id FROM assignments WHERE teacher_id IN (SELECT id FROM teachers WHERE user_id = auth.uid())));

CREATE POLICY "Schools can view submissions" ON public.submissions FOR SELECT TO authenticated
  USING (assignment_id IN (SELECT id FROM assignments WHERE school_id IN (SELECT id FROM schools WHERE user_id = auth.uid())));

CREATE POLICY "Students can submit" ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can view own submissions" ON public.submissions FOR SELECT TO authenticated
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- === USER_ROLES ===
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- === USER_SECURITY ===
DROP POLICY IF EXISTS "Users can manage own security" ON public.user_security;

CREATE POLICY "Users can manage own security" ON public.user_security FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
