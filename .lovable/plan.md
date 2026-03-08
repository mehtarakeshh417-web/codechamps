

## Add Images Throughout All Curriculum Content

### Approach

Every `ContentSection` already supports an `image` field. Currently, most sections lack images — only ~20 sections across all 5 files have local image imports. The fix is straightforward: add the `image` property with high-quality, freely-licensed image URLs to every major section.

**Image sources**: Unsplash, Pixabay, and Pexels provide free, high-resolution, kid-friendly educational images accessible via direct URLs. These work perfectly in the existing `<img>` renderer without any code changes.

### What will be done

**No changes to**: renderer (`PremiumContentSections.tsx`), structure, layout, existing text, or topics.

**Only addition**: `image` URLs on sections that currently lack them.

### Scope per file

| File | Total sections (approx) | Currently have images | Will add images to |
|------|------------------------|----------------------|-------------------|
| `class1_2Content.ts` | ~40 | 4 | ~35 |
| `class3_4Content.ts` | ~50 | 3 | ~45 |
| `class5Content.ts` | ~45 | 15 | ~30 |
| `class6_8Content.ts` | ~60 | 8 | ~50 |
| `class9_10Content.ts` | ~70 | 0 | ~65 |

**Total: ~225 images to be added across all files**

### Image selection strategy

Each image will be topically relevant:
- Computer parts → photos of keyboards, monitors, CPUs
- Programming → code on screens, developer setups
- Paint/Art → kids drawing, color palettes, digital art
- Excel/Word → spreadsheet/document screenshots
- Internet → network diagrams, browser screenshots
- AI/Data Science → robot illustrations, data visualizations
- Cybersecurity → lock/shield imagery

### Implementation rounds

Due to file size, this will be done across multiple messages:

- **Round 1**: `class1_2Content.ts` + `class3_4Content.ts` (younger classes, most visual impact)
- **Round 2**: `class5Content.ts` + `class6_8Content.ts`
- **Round 3**: `class9_10Content.ts`

