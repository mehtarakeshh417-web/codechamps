

# Bug Report & Fix Plan

## Bugs Found

### Bug 1: Console Warning — "Function components cannot be given refs"
**Location**: `src/pages/Index.tsx` and `src/pages/Landing.tsx` / `ParticleBackground.tsx`
**Issue**: `Index` renders `<Landing />` and React Router tries to pass a ref to it. `Landing` is a plain function component without `forwardRef`. Similarly, `Landing` renders `<ParticleBackground />` which also lacks `forwardRef`.
**Fix**: Wrap both `Landing` and `ParticleBackground` with `React.forwardRef`.

### Bug 2: Web search triggers on nearly every message
**Location**: `supabase/functions/ai-tutor/index.ts` line 81
**Issue**: `needsWebSearch()` includes `"?"` as a trigger, meaning virtually every student question triggers a DuckDuckGo search, adding latency and noise. Also includes extremely broad terms like `"how"`, `"what"`, `"why"` as standalone checks using `.includes()` — the word "what" matches "whatever", etc.
**Fix**: Remove `"?"` trigger. Use word-boundary matching for short generic words, or just rely on the longer, more specific phrases.

### Bug 3: AI Tutor chat visible during quiz/topic viewer
**Location**: `src/components/DashboardLayout.tsx`
**Issue**: The AI chatbot is hidden on `/assignments` and `/projects` routes to prevent cheating, but it's still visible on `/curriculum/topic/` routes where students take quizzes. Students could use the AI tutor to cheat on topic quizzes.
**Fix**: Also hide the chatbot when the route includes `/curriculum/topic/`.

### Bug 4: Contact form uses `alert()` instead of toast
**Location**: `src/pages/Landing.tsx` line 437
**Issue**: The contact form uses `alert()` for the success message, which is jarring and inconsistent with the rest of the app that uses `sonner` toasts.
**Fix**: Replace `alert()` with `toast.success()` from sonner.

### Bug 5: `StudentDashboard` className parsing issue
**Location**: `src/pages/student/StudentDashboard.tsx` line 115
**Issue**: `user?.className` contains format like `"5 (A)"` from the DB function. The line displays it raw. `getCurriculumForClass` may not parse this format correctly, leading to empty curriculum.
**Fix**: Verify `getCurriculumForClass` handles this format. If not, extract the class number before passing.

---

## Implementation Plan

### 1. Fix forwardRef warnings
- Wrap `Landing` component with `React.forwardRef` in `Landing.tsx`
- Wrap `ParticleBackground` component with `React.forwardRef` in `ParticleBackground.tsx`

### 2. Fix overly broad web search triggers
- In `supabase/functions/ai-tutor/index.ts`, remove `"?"` from `searchTriggers`
- Remove standalone short words (`"how"`, `"what"`, `"why"`, `"which"`, `"where"`, `"when"`) since longer phrases already cover the relevant cases

### 3. Hide AI chatbot during topic quizzes
- In `DashboardLayout.tsx`, add `/curriculum/topic/` to the route exclusion check

### 4. Replace `alert()` with toast
- Import `toast` from `sonner` in `Landing.tsx`
- Replace `alert(...)` with `toast.success(...)`

### 5. Verify className parsing
- Check `getCurriculumForClass` function to confirm it handles the `"5 (A)"` format correctly

