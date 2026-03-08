

## Feature Enhancement Plan — Making CodeChamps Market-Ready

Based on your selections, here are 7 features to be implemented across multiple rounds. All existing features remain untouched.

---

### Feature 1: AI Tutor Chatbot
A floating chat widget available on every student page. Students can ask doubts about any topic and get instant AI-powered explanations.

**Implementation:**
- New edge function `supabase/functions/ai-tutor/index.ts` using Lovable AI Gateway (`google/gemini-3-flash-preview`) with a system prompt tailored as a friendly CS tutor for Class 1-10 students
- New component `src/components/AiTutorChat.tsx` — floating bottom-right chat bubble with streaming responses, markdown rendering
- Integrated into `DashboardLayout.tsx` for student role only
- No database table needed — conversation is session-only (stateless)

### Feature 2: Typing Speed Practice
A built-in typing tutor with WPM/accuracy tracking, age-appropriate text passages, and a results summary.

**Implementation:**
- New page `src/pages/student/StudentTypingPractice.tsx` with:
  - Class-appropriate text passages (simple sentences for Class 1-2, paragraphs for 5+, code snippets for 9-10)
  - Real-time WPM + accuracy counter
  - Visual keyboard highlighting current key
  - Results card with stats after each session
- New DB table `typing_scores` (student_id, wpm, accuracy, duration, created_at) with RLS
- Add nav item "Typing Practice" to student sidebar in `DashboardLayout.tsx`
- Add route in `Dashboard.tsx`

### Feature 3: Announcements System
Teachers and schools can broadcast announcements; students see them on their dashboard.

**Implementation:**
- New DB table `announcements` (id, school_id, author_id, author_role, title, message, target_class, priority, created_at) with RLS policies
- New page `src/pages/school/SchoolAnnouncements.tsx` — create/manage announcements
- Teacher can also create announcements from a new section in `TeacherDashboard.tsx`
- Students see latest announcements as a card on `StudentDashboard.tsx`
- Add nav items and routes for school and teacher roles

### Feature 4: Interactive Flashcards
Auto-generated swipeable flashcards from curriculum topic keyTerms, with flip animation.

**Implementation:**
- New page `src/pages/student/StudentFlashcards.tsx`
  - Pulls keyTerms, comparisons, and key concepts from content files
  - Swipeable card UI with flip animation (front = term, back = definition)
  - "Know it" / "Study again" sorting (spaced repetition-lite, session only)
  - Filter by subject/topic
- Add nav item and route for students

### Feature 5: Student Notes
Students can take and save personal notes while studying each topic.

**Implementation:**
- New DB table `student_notes` (id, student_id, topic_id, content, updated_at) with RLS
- New component `src/components/topic-viewer/StudentNotes.tsx` — collapsible notes panel in TopicViewer
- Integrated into `TopicViewer.tsx` as a tab or side panel
- Auto-save on debounced input

### Feature 6: Landing Page Upgrade
Transform the current minimal landing page into a full marketing page.

**Implementation:**
- Expand `Landing.tsx` with new sections (no changes to existing hero/features/footer):
  - **Stats counter** — "1000+ Students, 50+ Schools, 75 Topics" animated counters
  - **How It Works** — 3-step visual (Sign Up → Learn → Achieve)
  - **Testimonials** — Rotating quote cards with school/teacher quotes
  - **Pricing Plans** — 3-tier pricing cards (Basic, Pro, Enterprise)
  - **FAQ section** — Accordion-based common questions
  - **Contact/Demo form** — Name, email, school name, message
  - **Screenshot carousel** — Show dashboard screenshots

### Feature 7: Multi-language (Hindi)
Toggle between English and Hindi for the entire interface.

**Implementation:**
- New `src/contexts/LanguageContext.tsx` with translation map
- Translation JSON files for `en` and `hi` covering all UI strings (~200 strings)
- Language toggle button in sidebar and landing page navbar
- All static text wrapped with `t("key")` translation function
- Content data (curriculum) stays English-only initially (too large to translate)

---

### Implementation Rounds

Due to scope, this will be built across multiple messages:

- **Round 1**: AI Tutor Chatbot + Typing Practice (highest engagement impact)
- **Round 2**: Announcements + Student Notes (school value features)
- **Round 3**: Interactive Flashcards + Landing Page Upgrade
- **Round 4**: Multi-language Hindi support

### Database Changes Summary

3 new tables: `typing_scores`, `announcements`, `student_notes` — all with proper RLS policies scoped to school/student boundaries.

