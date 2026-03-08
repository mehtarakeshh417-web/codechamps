

## Expand All Curriculum Content — Deep Enrichment Plan

### Current State

All 75 topics across Classes 1-10 already have textbook content, but many are thin:
- Many topics have only **1-2 pages** with **1 section each**
- Class 9-10 content is the thinnest (367 lines total for 10 topics — ~37 lines per topic)
- Class 3-4 topics average ~41 lines each
- Class 1-2 and 5 are the richest, but still have sections with only text

### What Will Be Done

**For every existing topic across all 5 content files**, expand to:
- **4-6 pages minimum** per topic (up from 1-3)
- **3-4 sections per page** (up from 1-2)
- Every section gets at least one visual element: `illustration`, `keyTerms`, `comparison`, `table`, `tip`, `funFact`, `stepByStep`, or `warningNote`
- Multi-paragraph body text with real educational content, examples, and explanations
- Exercises on every page (not just the last)

### Implementation Rounds

Due to file size constraints, this will be done across multiple messages:

**Round 1**: Class 9-10 content (currently thinnest at 367 lines — needs the most work). Expand all 10 topics (Python Advanced, Web Dev, SQL, Cybersecurity, Data Science, Python Projects, Web Apps, AI Fundamentals, App Dev, Capstone) to 4-6 pages each with rich sections, illustrations, code blocks, tables, and comparisons.

**Round 2**: Class 3-4 content (696 lines, 17 topics). Expand IPO, Windows, Paint, Word, Scratch topics with more pages, visual elements, and detailed content.

**Round 3**: Class 6-8 content (1362 lines, 25 topics). Enrich HTML, CSS, Python, Excel, GIMP, Access, Krita, Canva, App Inventor topics.

**Round 4**: Class 1-2 content (1013 lines, 14 topics). Add more pages and visual elements to Computer Basics, Paint, Scratch Jr topics.

**Round 5**: Class 5 content (1121 lines, 9 topics). Final polish — add more pages to Word, PPT, Excel, Scratch topics.

### Content Approach Per Section

Each new section will include:
- **Heading** with clear topic
- **Body** with 3+ paragraphs of real educational content (definitions, explanations, examples, real-world connections)
- **At least one** of: `illustration` grid, `keyTerms` cards, `comparison` cards, `table`, `stepByStep` guide, `tip`, `funFact`, `warningNote`, `codeBlock`
- Exercises: mix of `fill-in-blank`, `true-false`, `mcq`, `match`, `ordering`

### No Changes To

- `PremiumContentSections.tsx` (renderer) — already enhanced
- `curriculumData.ts` (structure) — topic IDs stay the same
- Any existing content — only additions, no removals
- Design, layout, routing — untouched

