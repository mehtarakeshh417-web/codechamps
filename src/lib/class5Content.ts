// Detailed multi-page textbook content for Class 5 curriculum
// Each topic has multiple pages with theory, images, and exercises

import c5WordPage from "@/assets/curriculum/c5-word-page.jpg";
import c5WordMargins from "@/assets/curriculum/c5-word-margins.jpg";
import c5WordOrientation from "@/assets/curriculum/c5-word-orientation.jpg";
import c5WordWatermark from "@/assets/curriculum/c5-word-watermark.jpg";
import c5WordColumns from "@/assets/curriculum/c5-word-columns.jpg";
import c5PptAnim from "@/assets/curriculum/c5-ppt-anim.jpg";
import c5PptTransitions from "@/assets/curriculum/c5-ppt-transitions.jpg";
import c5PptAnimTypes from "@/assets/curriculum/c5-ppt-animation-types.jpg";
import c5PptMedia from "@/assets/curriculum/c5-ppt-media.jpg";
import c5ExcelIntro from "@/assets/curriculum/c5-excel-intro.jpg";
import c5ExcelInterface from "@/assets/curriculum/c5-excel-interface.jpg";
import c5ExcelWork from "@/assets/curriculum/c5-excel-work.jpg";
import c5ExcelFormatting from "@/assets/curriculum/c5-excel-formatting.jpg";
import c5ExcelInsertDelete from "@/assets/curriculum/c5-excel-insert-delete.jpg";
import c5Scratch from "@/assets/curriculum/c5-scratch.jpg";
import c5ScratchBlocks from "@/assets/curriculum/c5-scratch-blocks.jpg";
import c5ScratchVariables from "@/assets/curriculum/c5-scratch-variables.jpg";

export interface Exercise {
  type: "fill-in-blank" | "true-false" | "practice" | "mcq" | "match" | "ordering";
  question: string;
  answer: string;
  options?: string[];
  /** MCQ: 4 choices, answer is the correct one */
  choices?: string[];
  /** Match: pairs of [term, definition] */
  matchPairs?: [string, string][];
  /** Ordering: correct order of items (user must reorder) */
  orderItems?: string[];
}

export interface ContentSection {
  heading: string;
  body: string; // supports **bold** and line breaks
  image?: string;
  tip?: string;
  funFact?: string;
  youtubeId?: string; // YouTube video ID for embedding
  /** Syntax-highlighted code block */
  codeBlock?: { language: string; code: string };
  /** Comparison/data table */
  table?: { headers: string[]; rows: string[][] };
  /** Glossary-style key terms */
  keyTerms?: { term: string; definition: string }[];
  /** Warning or important note callout */
  warningNote?: string;
  /** Side-by-side comparison */
  comparison?: { left: { title: string; points: string[] }; right: { title: string; points: string[] } };
  /** Numbered step-by-step guide */
  stepByStep?: { steps: { title: string; description: string; image?: string }[] };
  /** Emoji illustration grid */
  illustration?: { emoji: string; label: string }[];
}

export interface TextbookPage {
  pageTitle: string;
  subtitle?: string;
  bannerImage?: string;
  bannerColor?: string; // gradient class
  sections: ContentSection[];
  exercises?: Exercise[];
}

export interface TopicTextbook {
  topicId: string;
  topicTitle: string;
  subjectColor: string;
  pages: TextbookPage[];
}

// ======================== MS WORD - PAGE FORMATTING ========================
const wordPageFormatting: TopicTextbook = {
  topicId: "c5-word-pf",
  topicTitle: "MS Word – Page Layout & Design",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Introduction to Page Formatting",
      subtitle: "Making your documents look professional and beautiful",
      bannerImage: c5WordPage,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "What is Page Formatting?",
          body: "**Page formatting** means changing how your document page looks. It includes setting margins, choosing page orientation, adding backgrounds, watermarks, borders, and columns.\n\nWhen you write a letter, a report, or a project, page formatting makes it look neat and professional. Imagine reading a book with no margins — the text would go right to the edge of the paper! Formatting fixes that.\n\n**Why is Page Formatting Important?**\n• Makes documents easy to read\n• Gives a professional appearance\n• Helps organize information\n• Makes printed documents look great",
          tip: "All page formatting options are found in the **Page Layout** tab in MS Word.",
          illustration: [
            { emoji: "📏", label: "Margins" },
            { emoji: "📄", label: "Orientation" },
            { emoji: "🎨", label: "Page Color" },
            { emoji: "💧", label: "Watermark" },
            { emoji: "🖼️", label: "Borders" },
            { emoji: "📰", label: "Columns" },
          ],
          keyTerms: [
            { term: "Page Formatting", definition: "Changing the layout and appearance of your document pages." },
            { term: "Page Layout Tab", definition: "The tab in MS Word ribbon where all page formatting tools are located." },
            { term: "Ribbon", definition: "The toolbar at the top of MS Word with tabs like Home, Insert, Page Layout." },
          ]
        },
        {
          heading: "Where to Find Page Layout",
          body: "To access page formatting tools:\n\n**Step 1:** Open Microsoft Word\n**Step 2:** Click on the **Page Layout** tab at the top ribbon\n**Step 3:** You will see groups like Page Setup, Page Background, and Paragraph\n\nEach group contains different tools for formatting your page. Let's learn about each one in the following pages!",
          funFact: "Microsoft Word was first released in 1983 — that's over 40 years ago! It has been helping people create beautiful documents ever since."
        }
      ]
    },
    {
      pageTitle: "Page Margins",
      subtitle: "The blank spaces around your content",
      bannerImage: c5WordMargins,
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "What are Margins?",
          body: "**Margins** are the blank spaces between the edge of the paper and where your text begins. Every page has four margins:\n\n📏 **Top Margin** — space above the text\n📏 **Bottom Margin** — space below the text\n📏 **Left Margin** — space on the left side\n📏 **Right Margin** — space on the right side\n\nMargins prevent text from going to the very edge of the paper, making your document easier to read and print.",
          image: c5WordMargins
        },
        {
          heading: "Types of Margin Settings",
          body: "MS Word provides several preset margin options:\n\n📄 **Normal** — Top: 2.54cm, Bottom: 2.54cm, Left: 3.17cm, Right: 3.17cm (most common)\n📄 **Narrow** — 1.27cm on all sides (fits more text on page)\n📄 **Wide** — 5.08cm left and right (gives more white space)\n📄 **Moderate** — 2.54cm top/bottom, 1.91cm left/right\n📄 **Custom Margins** — You set your own values!\n\n**How to Change Margins:**\n1. Go to **Page Layout** tab\n2. Click **Margins**\n3. Choose a preset OR click **Custom Margins**\n4. Set your desired values\n5. Click **OK**",
          tip: "For school projects, the **Normal** margin setting works best. It gives enough space for binding on the left side."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The blank spaces between the edge of the paper and the text are called ___.", answer: "margins" },
        { type: "fill-in-blank", question: "The ___ margin preset gives the least white space around the text.", answer: "narrow" },
        { type: "true-false", question: "Every page has only two margins — left and right.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can set custom margin values in MS Word.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Page Orientation",
      subtitle: "Portrait vs Landscape — choosing the right direction",
      bannerImage: c5WordOrientation,
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "What is Page Orientation?",
          body: "**Page orientation** refers to the direction in which your page is displayed. There are two types:\n\n📄 **Portrait** — The page is taller than it is wide (like a standing book). This is the **default** orientation.\n\n📄 **Landscape** — The page is wider than it is tall (like a lying-down book). Used for wide tables, images, or certificates.",
          image: c5WordOrientation
        },
        {
          heading: "When to Use Each Orientation",
          body: "**Use Portrait for:**\n• Letters and essays\n• Reports and homework\n• Story writing\n• Most regular documents\n\n**Use Landscape for:**\n• Wide tables with many columns\n• Certificates and awards\n• Photo layouts\n• Landscape drawings\n• Timetables\n\n**How to Change Orientation:**\n1. Go to **Page Layout** tab\n2. Click **Orientation**\n3. Choose **Portrait** or **Landscape**\n\nThe entire document will change to the selected orientation.",
          tip: "You can even have different orientations on different pages using **Section Breaks**! This is an advanced feature you'll learn later."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The default page orientation in MS Word is ___.", answer: "portrait" },
        { type: "fill-in-blank", question: "___ orientation makes the page wider than it is tall.", answer: "landscape" },
        { type: "true-false", question: "Landscape orientation is best for writing essays.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Open MS Word. Create a new document. Change the orientation to Landscape. Type a wide table with 6 columns showing your weekly timetable. Then change it back to Portrait and notice the difference.", answer: "" },
      ]
    },
    {
      pageTitle: "Page Background Color",
      subtitle: "Adding colors to make your pages pop!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "Adding a Background Color",
          body: "You can change the entire background color of your page to make it more attractive or to match a theme.\n\n**How to Add Page Color:**\n1. Go to **Page Layout** tab\n2. Click **Page Color** in the Page Background group\n3. Choose a color from the color palette\n4. Your entire page background will change!\n\n**More Options:**\n• Click **More Colors** to see the full color spectrum\n• Click **Fill Effects** to add gradients, textures, or patterns\n\n**Types of Fill Effects:**\n🎨 **Gradient** — smooth blend of two colors\n🎨 **Texture** — looks like fabric, marble, wood, etc.\n🎨 **Pattern** — repeating designs like stripes or dots\n🎨 **Picture** — use an image as background",
          tip: "Light colors work best for page backgrounds. Dark backgrounds make text hard to read!"
        },
        {
          heading: "Important Things to Remember",
          body: "⚠️ **Page color does NOT print by default!** To print the background color:\n1. Go to **File → Options → Display**\n2. Check **Print Background Colors and Images**\n\n⚠️ Use **light colors** so the text remains readable\n⚠️ Page color applies to the **entire document** — you cannot color just one page easily\n⚠️ To remove the color, go to **Page Color → No Color**",
          funFact: "Did you know? Professional designers often use very light pastel backgrounds instead of pure white. It's easier on the eyes!",
          warningNote: "Page background color does NOT print by default! You must go to **File → Options → Display** and check **Print Background Colors and Images** to make it appear on printed copies.",
          comparison: {
            left: {
              title: "Solid Colors",
              points: ["Simple, clean look", "Easy to apply", "Best for formal documents", "Light pastel colors recommended"]
            },
            right: {
              title: "Fill Effects",
              points: ["Gradients blend two colors", "Textures add depth", "Patterns create visual interest", "Pictures as background possible"]
            }
          }
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To change page background, go to Page Layout → ___.", answer: "page color" },
        { type: "true-false", question: "Page background color prints automatically when you press Print.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can add gradient effects as a page background.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Word. Add a light yellow page background. Then try adding a gradient fill effect with two colors of your choice. Finally, try a texture fill like 'Parchment'.", answer: "" },
      ]
    },
    {
      pageTitle: "Watermarks",
      subtitle: "Faded text or images behind your content",
      bannerImage: c5WordWatermark,
      bannerColor: "from-gray-500 to-blue-500",
      sections: [
        {
          heading: "What is a Watermark?",
          body: "A **watermark** is a faded text or image that appears **behind** the main content of your document. It is semi-transparent so you can still read the text over it.\n\n**Common uses of watermarks:**\n• Mark a document as **CONFIDENTIAL** or **DRAFT**\n• Add a company or school logo behind text\n• Show ownership of a document\n• Add a decorative background element",
          image: c5WordWatermark
        },
        {
          heading: "How to Add a Watermark",
          body: "**Adding a Text Watermark:**\n1. Go to **Page Layout** tab\n2. Click **Watermark**\n3. Choose from preset options like CONFIDENTIAL, DO NOT COPY, DRAFT, SAMPLE, or ASAP\n4. The watermark appears on every page!\n\n**Creating a Custom Watermark:**\n1. Click **Watermark → Custom Watermark**\n2. Choose **Text watermark** — type your own text, choose font, size, color, and layout (Diagonal or Horizontal)\n3. OR choose **Picture watermark** — select an image from your computer\n4. Click **OK**\n\n**Removing a Watermark:**\n• Go to **Page Layout → Watermark → Remove Watermark**",
          tip: "Use a large font size and light gray color for text watermarks so they don't interfere with the main content."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a faded text or image that appears behind the main content.", answer: "watermark" },
        { type: "fill-in-blank", question: "Watermarks can be laid out in Diagonal or ___ direction.", answer: "horizontal" },
        { type: "true-false", question: "Watermarks appear on every page of the document.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You can only use text for watermarks, not pictures.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a document and add a 'DRAFT' watermark. Then remove it and create a custom watermark with your name. Try both diagonal and horizontal layouts.", answer: "" },
      ]
    },
    {
      pageTitle: "Page Borders",
      subtitle: "Beautiful decorative frames around your pages",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "What are Page Borders?",
          body: "**Page borders** are decorative frames that go around the entire page. They make your documents look attractive and professional — perfect for certificates, greeting cards, and project covers!\n\n**Types of Page Borders:**\n🔲 **Box** — simple rectangular border all around\n🔲 **Shadow** — border with a shadow effect\n🔲 **3-D** — border with a 3D raised effect\n🔲 **Custom** — different borders on each side\n🎨 **Art** — decorative borders with shapes like stars, hearts, trees, balloons, and more!",
          table: {
            headers: ["Border Type", "Description", "Best Use"],
            rows: [
              ["Box", "Simple rectangle around page", "Formal reports, essays"],
              ["Shadow", "Border with shadow effect", "Certificates, awards"],
              ["3-D", "Raised 3D border effect", "Project covers, cards"],
              ["Custom", "Different style per side", "Creative documents"],
              ["Art", "Decorative shapes (stars, flowers)", "Birthday cards, invitations"],
            ]
          }
        },
        {
          heading: "How to Add Page Borders",
          body: "**Steps to add a page border:**\n1. Go to **Page Layout** tab (or **Design** tab in newer versions)\n2. Click **Page Borders**\n3. The **Borders and Shading** dialog box opens\n4. Choose a **Setting** (Box, Shadow, 3-D, or Custom)\n5. Select a **Style** (solid, dotted, dashed, double line, etc.)\n6. Choose a **Color** for your border\n7. Set the **Width** (thickness) of the border\n8. Click **OK**\n\n**For Art Borders:**\n1. In the same dialog box, click the **Art** dropdown\n2. Browse through dozens of decorative designs!\n3. Choose your favorite (stars, flowers, ice cream, apples, etc.)\n4. Adjust the width\n5. Click **OK**",
          tip: "Art borders are perfect for birthday cards, certificates, and project cover pages!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The four types of page border settings are Box, Shadow, 3-D, and ___.", answer: "custom" },
        { type: "fill-in-blank", question: "___ borders have decorative designs like stars, hearts, and flowers.", answer: "art" },
        { type: "true-false", question: "You can change the color and width of page borders.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a birthday invitation card. Use an Art border with a festive design. Add a colorful page background. Type the invitation text in decorative fonts.", answer: "" },
      ]
    },
    {
      pageTitle: "Columns",
      subtitle: "Split your text like a newspaper!",
      bannerImage: c5WordColumns,
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "What are Columns?",
          body: "**Columns** allow you to split your text into two or more vertical sections, just like a newspaper or magazine!\n\nNormally, text flows from the left edge to the right edge of the page. With columns, the page is divided and text flows down one column before continuing to the next.\n\n**Column Options:**\n📰 **One** — normal full-width (default)\n📰 **Two** — page split into 2 equal columns\n📰 **Three** — page split into 3 equal columns\n📰 **Left** — 2 columns with the left one narrower\n📰 **Right** — 2 columns with the right one narrower",
          image: c5WordColumns
        },
        {
          heading: "How to Create Columns",
          body: "**Steps to add columns:**\n1. Select the text you want to put in columns (or select all text with Ctrl+A)\n2. Go to **Page Layout** tab\n3. Click **Columns**\n4. Choose **Two** or **Three**\n5. Your text automatically reformats into columns!\n\n**For More Options:**\n1. Click **Columns → More Columns**\n2. Set the exact number of columns\n3. Adjust the **spacing** between columns\n4. Check **Line between** to add a vertical line separating columns\n5. Click **OK**\n\n**Column Break:**\nTo force text to move to the next column:\n1. Place your cursor where you want the break\n2. Go to **Page Layout → Breaks → Column**",
          tip: "Columns work great for newsletters, brochures, and newspaper-style projects. Try combining columns with a large heading that spans the full width!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The default column setting in MS Word is ___ column(s).", answer: "one" },
        { type: "fill-in-blank", question: "To add a vertical line between columns, check the '___ between' option.", answer: "line" },
        { type: "true-false", question: "MS Word can only create a maximum of 2 columns.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "Column breaks force text to move to the next column.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a class newsletter with a big title spanning the full width, then format the body text into 2 columns. Add a line between the columns. Include at least 3 news items about your class.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review & Assessment",
      subtitle: "Test your knowledge of Page Formatting!",
      bannerColor: "from-amber-500 to-orange-500",
      sections: [
        {
          heading: "Summary — What You Learned",
          body: "In this chapter, you learned about **Page Formatting** in MS Word:\n\n✅ **Margins** — blank spaces around the edges (Normal, Narrow, Wide, Custom)\n✅ **Orientation** — Portrait (tall) or Landscape (wide)\n✅ **Page Color** — background color with gradients, textures, and patterns\n✅ **Watermarks** — faded text/images behind content\n✅ **Page Borders** — decorative frames including Art borders\n✅ **Columns** — newspaper-style text layouts\n\nAll these tools are found in the **Page Layout** tab. Together, they help you create beautiful, professional-looking documents!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "All page formatting tools are found in the ___ tab.", answer: "page layout" },
        { type: "fill-in-blank", question: "A document that is wider than it is tall uses ___ orientation.", answer: "landscape" },
        { type: "fill-in-blank", question: "___ are faded text or images that appear behind the document content.", answer: "watermarks" },
        { type: "fill-in-blank", question: "Decorative borders with shapes like stars and flowers are called ___ borders.", answer: "art" },
        { type: "true-false", question: "Narrow margins give less white space around the text.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Page color prints automatically without any settings change.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can split text into 3 columns in MS Word.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Watermarks can only be placed diagonally.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a complete project cover page with: (1) Landscape orientation (2) A page border with Art design (3) A light blue page background (4) A 'DRAFT' watermark (5) The title in WordArt. Then, on page 2, change to Portrait with 2-column text for the project content.", answer: "" },
      ]
    },
  ]
};

// ======================== MS PPT - ANIMATIONS ========================
const pptAnimations: TopicTextbook = {
  topicId: "c5-ppt-anim",
  topicTitle: "MS PowerPoint – Animations, Transitions & Media",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Introduction to Animations & Transitions",
      subtitle: "Making your presentations come alive!",
      bannerImage: c5PptAnim,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Why Animations Matter",
          body: "**Animations** and **transitions** make your PowerPoint presentations exciting and engaging! Without them, your slides just appear one after another — but with them, text flies in, images spin, and slides fade beautifully.\n\n**Animations** = Effects applied to **objects** on a slide (text, images, shapes)\n**Transitions** = Effects applied **between slides** (how one slide changes to the next)\n\nThink of animations like special effects in a movie — they grab attention and keep your audience interested!",
          tip: "Don't use too many different animations in one presentation. Pick 2-3 effects and use them consistently for a professional look."
        },
        {
          heading: "Where to Find These Tools",
          body: "📍 **Transitions** are in the **Transitions** tab\n📍 **Animations** are in the **Animations** tab\n📍 **Media (Audio/Video)** are in the **Insert** tab\n\nLet's explore each one in detail on the following pages!"
        }
      ]
    },
    {
      pageTitle: "Slide Transitions",
      subtitle: "Beautiful effects between your slides",
      bannerImage: c5PptTransitions,
      bannerColor: "from-amber-500 to-yellow-500",
      sections: [
        {
          heading: "What are Slide Transitions?",
          body: "A **slide transition** is the visual effect that plays when you move from one slide to the next during a slideshow.\n\n**Popular Transition Effects:**\n\n🌟 **Subtle Transitions:**\n• **Fade** — slide gently fades in\n• **Push** — new slide pushes old one away\n• **Wipe** — new slide wipes across like a curtain\n• **Split** — slide splits open\n\n🌟 **Exciting Transitions:**\n• **Morph** — objects smoothly transform position\n• **Zoom** — dramatic zoom effect\n• **Curtains** — like opening theater curtains\n• **Airplane** — slide flies in like a paper airplane\n\n🌟 **Dynamic Transitions:**\n• **Rotate** — slide rotates into view\n• **Fracture** — slide breaks apart\n• **Ripple** — creates a water ripple effect",
          image: c5PptTransitions
        },
        {
          heading: "How to Apply Transitions",
          body: "**Steps to add a transition:**\n1. Click on the slide you want to add a transition to\n2. Go to the **Transitions** tab\n3. Browse the transition effects\n4. Click on one to preview it!\n5. The transition plays automatically so you can see the effect\n\n**Customizing Transitions:**\n• **Effect Options** — change direction (from left, right, top, bottom)\n• **Sound** — add a sound effect (like applause, drum roll)\n• **Duration** — how long the transition takes (fast: 0.5s, slow: 3s)\n• **Apply To All** — same transition on every slide\n\n**Advancing Slides:**\n• **On Mouse Click** — click to move to next slide\n• **After** — automatically advance after set time (e.g., 5 seconds)",
          tip: "The **Morph** transition is one of the coolest! It smoothly animates objects from one position to another between slides."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The visual effect that plays between two slides is called a ___.", answer: "transition" },
        { type: "fill-in-blank", question: "The ___ transition makes objects smoothly move from one position to another.", answer: "morph" },
        { type: "true-false", question: "You can add sound effects to slide transitions.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You can only apply one type of transition to the entire presentation.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Animation Effects",
      subtitle: "Making objects on your slides move and appear",
      bannerImage: c5PptAnimTypes,
      bannerColor: "from-red-500 to-orange-500",
      sections: [
        {
          heading: "Four Types of Animations",
          body: "PowerPoint has **4 categories** of animation effects:\n\n🟢 **Entrance Animations** (Green) — How objects **appear** on the slide\n• Fly In — object flies in from a direction\n• Fade In — object gradually appears\n• Bounce — object bounces into view\n• Zoom — object zooms from small to full size\n• Appear — object just pops up instantly\n\n🟡 **Emphasis Animations** (Yellow) — How objects get **highlighted**\n• Spin — object rotates\n• Grow/Shrink — object gets bigger or smaller\n• Pulse — object pulses with a glow\n• Teeter — object wobbles\n• Color Change — object changes color\n\n🔴 **Exit Animations** (Red) — How objects **disappear**\n• Fly Out — object flies away\n• Fade Out — object gradually vanishes\n• Shrink & Turn — object shrinks and spins away\n• Bounce Out — object bounces off screen\n\n🔵 **Motion Paths** (Blue) — Object **moves** along a path\n• Lines — straight line movement\n• Arcs — curved movement\n• Turns — zigzag movement\n• Custom Path — draw your own path!",
          image: c5PptAnimTypes,
          funFact: "The Motion Path animation lets you draw any path you want! You could make a bee fly around the screen in loops!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The four types of animations are Entrance, Emphasis, Exit, and ___.", answer: "motion paths" },
        { type: "fill-in-blank", question: "Entrance animations are shown in ___ color in PowerPoint.", answer: "green" },
        { type: "true-false", question: "Emphasis animations make objects appear on the slide.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can draw your own custom motion path.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Animation Timing & Order",
      subtitle: "Controlling when and how fast animations play",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "Animation Timing Controls",
          body: "After adding an animation, you need to control **when** it plays and **how long** it takes.\n\n**Start Options:**\n🖱️ **On Click** — animation plays when you click the mouse (default)\n▶️ **With Previous** — plays at the same time as the previous animation\n⏭️ **After Previous** — plays automatically after the previous animation finishes\n\n**Duration:** How long the animation takes\n• Fast: 0.25 - 0.50 seconds\n• Medium: 1.00 second\n• Slow: 2.00 - 3.00 seconds\n\n**Delay:** Wait time before the animation starts\n• Example: Set delay to 1 second — the animation waits 1 second before playing",
        },
        {
          heading: "Animation Pane & Multiple Animations",
          body: "The **Animation Pane** is your control center for managing all animations on a slide.\n\n**How to open Animation Pane:**\n1. Go to **Animations** tab\n2. Click **Animation Pane** (on the right side of the ribbon)\n3. A panel opens on the right showing all animations in order\n\n**Multiple Animations on One Object:**\nYes! You can add more than one animation to the same object!\n1. Select the object\n2. Click **Add Animation** (NOT the main animation button — that replaces!)\n3. Choose another animation\n4. Use the Animation Pane to reorder them\n\n**Reordering Animations:**\n• Drag animations up or down in the Animation Pane\n• Use the ↑ and ↓ arrows to move them",
          tip: "Use 'With Previous' to make multiple objects appear at the same time. Use 'After Previous' for a sequence!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The three start options for animations are On Click, With Previous, and ___.", answer: "after previous" },
        { type: "fill-in-blank", question: "The ___ Pane shows all animations in order on the right side.", answer: "animation" },
        { type: "true-false", question: "You can add multiple animations to the same object.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a slide with a title and 3 bullet points. Apply Fly In animation to each bullet point, set to 'After Previous' with 1 second delay between each. The bullets should appear one by one automatically.", answer: "" },
      ]
    },
    {
      pageTitle: "Inserting Audio & Video",
      subtitle: "Adding multimedia to your presentations",
      bannerImage: c5PptMedia,
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Adding Audio to Slides",
          body: "You can add background music, narration, or sound effects to your slides!\n\n**How to Insert Audio:**\n1. Go to **Insert** tab\n2. Click **Audio** (in the Media group)\n3. Choose:\n   • **Audio on My PC** — select a sound file from your computer\n   • **Record Audio** — record your own voice!\n\n**Audio Options:**\n• **Play in Background** — music plays across all slides\n• **Start Automatically** or **On Click**\n• **Loop until Stopped** — repeats the audio\n• **Hide During Show** — hides the speaker icon\n• **Volume** — adjust loud/quiet",
          image: c5PptMedia
        },
        {
          heading: "Adding Video to Slides",
          body: "Videos make your presentations even more engaging!\n\n**How to Insert Video:**\n1. Go to **Insert** tab\n2. Click **Video** (in the Media group)\n3. Choose:\n   • **Video on My PC** — select a video file\n   • **Online Video** — paste a YouTube or other web video link\n\n**Video Options:**\n• **Start** — Automatically or On Click\n• **Play Full Screen** — video fills the entire screen\n• **Loop** — video repeats\n• **Trim Video** — cut the beginning or end\n• **Video Shape** — change the video frame shape (circle, star, etc.)\n• **Video Effects** — add shadow, reflection, glow",
          tip: "For school presentations, record your own narration explaining each slide. It's a great way to practice speaking!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To insert audio, go to the ___ tab and click Audio.", answer: "insert" },
        { type: "fill-in-blank", question: "To play music across all slides, click 'Play in ___'.", answer: "background" },
        { type: "true-false", question: "You can record your own audio in PowerPoint.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Videos in PowerPoint cannot be trimmed.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Chapter Review & Assessment",
      subtitle: "Test your knowledge of Animations, Transitions & Media!",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Summary — What You Learned",
          body: "✅ **Transitions** — visual effects between slides (Fade, Push, Wipe, Morph, etc.)\n✅ **Animation Types** — Entrance, Emphasis, Exit, and Motion Paths\n✅ **Animation Timing** — On Click, With Previous, After Previous + Duration and Delay\n✅ **Animation Pane** — manage and reorder all animations\n✅ **Multiple Animations** — use Add Animation to apply more than one effect\n✅ **Audio** — insert music, sound effects, or record narration\n✅ **Video** — insert video files or online videos with playback options"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Entrance, Emphasis, Exit, and ___ are the four animation categories.", answer: "motion paths" },
        { type: "fill-in-blank", question: "A ___ is the visual effect that plays when switching between slides.", answer: "transition" },
        { type: "fill-in-blank", question: "To add a second animation to an object, click '___'.", answer: "add animation" },
        { type: "true-false", question: "The Morph transition smoothly moves objects between slides.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Emphasis animations make objects disappear from the slide.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a 5-slide presentation about 'My Favorite Season'. Add different transitions to each slide. On Slide 1, add an entrance animation to the title. On Slide 3, add a motion path animation to an image. Add background music that plays across all slides.", answer: "" },
      ]
    },
  ]
};

// ======================== MS EXCEL INTRODUCTION ========================
const excelIntro: TopicTextbook = {
  topicId: "c5-xl-intro",
  topicTitle: "MS Excel – Getting Started",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Introduction to Microsoft Excel",
      subtitle: "The world's most popular spreadsheet program",
      bannerImage: c5ExcelIntro,
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "What is Microsoft Excel?",
          body: "**Microsoft Excel** is a powerful spreadsheet application. It organizes data in a grid of **rows** and **columns**.\n\n**What can you do with Excel?**\n📊 Organize data neatly in tables\n📊 Perform calculations using formulas\n📊 Create colorful charts and graphs\n📊 Sort and filter large amounts of data\n📊 Track scores, budgets, and attendance\n📊 Create timetables and schedules\n\n**Real-life uses of Excel:**\n• Teachers use it to maintain student marks\n• Companies use it to track sales and expenses\n• Scientists use it to analyze data\n• Students use it for projects and record-keeping",
          funFact: "Microsoft Excel was first released in 1985 for Apple Macintosh! The Windows version came in 1987. Today, over 750 million people use Excel worldwide!"
        }
      ]
    },
    {
      pageTitle: "The Excel Interface",
      subtitle: "Understanding the parts of the Excel window",
      bannerImage: c5ExcelInterface,
      bannerColor: "from-emerald-500 to-green-500",
      sections: [
        {
          heading: "Parts of the Excel Window",
          body: "When you open Excel, you see these important parts:\n\n📌 **Title Bar** — Shows the file name at the very top (e.g., 'Book1 - Excel')\n\n📌 **Ribbon** — The toolbar with tabs like Home, Insert, Page Layout, Formulas, Data, Review, View. Each tab has different groups of tools.\n\n📌 **Formula Bar** — Located below the ribbon. Shows the content or formula in the selected cell. You can type directly here too!\n\n📌 **Name Box** — To the left of the Formula Bar. Shows the address of the selected cell (like A1, B5, C12).\n\n📌 **Column Headers** — Letters at the top: A, B, C, D... up to XFD (16,384 columns!)\n\n📌 **Row Headers** — Numbers on the left: 1, 2, 3... up to 1,048,576 rows!\n\n📌 **Cells** — The individual boxes where rows and columns meet. Each cell has a unique address.\n\n📌 **Sheet Tabs** — At the bottom, you can see tabs like Sheet1, Sheet2. Click to switch between worksheets.\n\n📌 **Status Bar** — At the very bottom, shows information like page number, zoom level, and quick calculations.",
          image: c5ExcelInterface,
          tip: "The Name Box is very useful! Type any cell address (like Z100) and press Enter to quickly jump to that cell."
        }
      ]
    },
    {
      pageTitle: "Workbooks and Worksheets",
      subtitle: "Understanding the structure of an Excel file",
      bannerColor: "from-green-500 to-lime-500",
      sections: [
        {
          heading: "Workbook vs Worksheet",
          body: "📗 **Workbook** = The entire Excel file. When you save an Excel file, you save a workbook. The file extension is **.xlsx**\n\n📄 **Worksheet** (or Sheet) = A single page within the workbook. Each worksheet is a separate grid of cells.\n\n**Think of it like this:**\n• A **workbook** is like a **notebook**\n• A **worksheet** is like a **page** in that notebook\n• You can have many pages (worksheets) in one notebook (workbook)!",
        },
        {
          heading: "Working with Worksheets",
          body: "**Default:** A new workbook starts with one worksheet (Sheet1)\n\n**Add a new worksheet:**\n• Click the **+** button next to the sheet tabs\n• OR right-click a sheet tab → **Insert → Worksheet**\n\n**Rename a worksheet:**\n• Double-click the sheet tab → type a new name → press Enter\n• Example: Rename 'Sheet1' to 'Marks'\n\n**Delete a worksheet:**\n• Right-click the sheet tab → **Delete**\n• ⚠️ Warning: This cannot be undone!\n\n**Move/Rearrange worksheets:**\n• Click and drag the sheet tab to a new position\n\n**Color a sheet tab:**\n• Right-click the sheet tab → **Tab Color** → Choose a color\n\n**Using Multiple Worksheets:**\nYou might use different sheets for:\n• Sheet 1: 'Student List'\n• Sheet 2: 'Marks'\n• Sheet 3: 'Attendance'\n• Sheet 4: 'Results'",
          tip: "Give your worksheets meaningful names! 'Maths Marks' is much better than 'Sheet1'."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "An entire Excel file is called a ___.", answer: "workbook" },
        { type: "fill-in-blank", question: "A single page within a workbook is called a ___.", answer: "worksheet" },
        { type: "fill-in-blank", question: "Excel files have the extension ___.", answer: ".xlsx" },
        { type: "true-false", question: "A workbook can contain only one worksheet.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can rename worksheet tabs by double-clicking them.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Cells, Rows, and Columns",
      subtitle: "The building blocks of every spreadsheet",
      bannerColor: "from-lime-500 to-green-600",
      sections: [
        {
          heading: "Understanding the Grid",
          body: "The Excel worksheet is a grid made up of:\n\n**Columns** — Vertical strips labeled with letters: A, B, C... Z, AA, AB... up to XFD\n• There are **16,384 columns** in total!\n\n**Rows** — Horizontal strips labeled with numbers: 1, 2, 3... up to 1,048,576\n• That's over **1 million rows**!\n\n**Cells** — The individual boxes where a column and row intersect\n• Each cell has a unique address called a **Cell Reference**\n• Examples: A1 (column A, row 1), B5 (column B, row 5), D10 (column D, row 10)\n\n**Active Cell** — The cell that is currently selected. It has a dark border around it. The cell reference appears in the Name Box.",
        },
        {
          heading: "Cell Ranges",
          body: "A **cell range** is a group of cells. It is written as:\n**StartCell:EndCell**\n\nExamples:\n• **A1:A10** — cells A1 to A10 (10 cells in column A)\n• **A1:D1** — cells A1 to D1 (4 cells in row 1)\n• **A1:C5** — a block of cells from A1 to C5 (15 cells)\n• **B2:B2** — just one cell (B2)\n\n**How to Select Ranges:**\n• Click on the first cell, hold Shift, click the last cell\n• OR click and drag from first to last cell\n• OR type the range in the Name Box (e.g., type A1:D10 and press Enter)",
          tip: "Hold **Ctrl** and click to select multiple non-adjacent cells. For example, select A1, C3, and E5 all at once!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The box where a column and row meet is called a ___.", answer: "cell" },
        { type: "fill-in-blank", question: "A cell's unique address is called a cell ___.", answer: "reference" },
        { type: "fill-in-blank", question: "The range A1:C5 contains ___ cells.", answer: "15" },
        { type: "true-false", question: "Excel has over 1 million rows.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Columns are labeled with numbers in Excel.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Entering Data in Excel",
      subtitle: "Typing text, numbers, and dates into cells",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Types of Data",
          body: "You can enter three types of data in Excel cells:\n\n📝 **Text (Labels)** — Words, names, headings\n• Examples: 'Name', 'Maths', 'Roll Number'\n• Text automatically aligns to the **left** of the cell\n\n🔢 **Numbers** — Numeric values for calculations\n• Examples: 95, 3.14, -50, 1000\n• Numbers automatically align to the **right** of the cell\n\n📅 **Dates and Times** — Calendar dates and clock times\n• Examples: 01/15/2025, 3:30 PM\n• Dates align to the **right** of the cell",
        },
        {
          heading: "How to Enter Data",
          body: "**Basic Data Entry:**\n1. Click on a cell to select it\n2. Start typing — the text appears in both the cell AND the Formula Bar\n3. Press **Enter** to confirm and move down\n4. Press **Tab** to confirm and move right\n5. Press **Escape** to cancel\n\n**Editing Data:**\n• Double-click a cell to edit its content\n• OR select the cell and edit in the Formula Bar\n• OR press **F2** to enter edit mode\n\n**Quick Data Entry Tips:**\n• Type in one cell, press Tab, type in next — great for filling rows!\n• Type a number, press Enter, type next — great for filling columns!\n• To enter the same data in multiple cells: Select all cells → Type the data → Press **Ctrl+Enter**\n\n**AutoFill:**\nExcel can automatically fill patterns!\n1. Type 'Monday' in A1\n2. Grab the small green square at the bottom-right corner of the cell\n3. Drag down — Excel fills in Tuesday, Wednesday, Thursday, etc.!\n4. Works with numbers too: Type 1, 2 → drag → 3, 4, 5, 6...",
          tip: "AutoFill is magical! It can fill months (Jan, Feb, Mar...), days, dates, and number patterns automatically!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Text automatically aligns to the ___ of the cell.", answer: "left" },
        { type: "fill-in-blank", question: "Numbers automatically align to the ___ of the cell.", answer: "right" },
        { type: "fill-in-blank", question: "Press ___ to confirm data and move to the cell below.", answer: "enter" },
        { type: "fill-in-blank", question: "The ___ feature can automatically fill days, months, and number patterns.", answer: "autofill" },
        { type: "true-false", question: "You can press Tab to move to the next cell on the right.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a class timetable in Excel. Row 1: Days of the week (Monday to Friday). Column A: Period numbers (1 to 8). Fill in the subjects for each period. Use AutoFill for the days.", answer: "" },
        { type: "practice", question: "Create a birthday list. Column A: Serial number (1-10 using AutoFill). Column B: Friend's name. Column C: Date of Birth. Column D: Favorite Gift.", answer: "" },
      ]
    },
  ]
};

// ======================== MS EXCEL - FORMATTING CELLS ========================
const excelCells: TopicTextbook = {
  topicId: "c5-xl-cells",
  topicTitle: "MS Excel – Selecting & Formatting Cells",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Selecting Cells and Ranges",
      subtitle: "Learn to select exactly what you need",
      bannerImage: c5ExcelFormatting,
      bannerColor: "from-green-600 to-teal-500",
      sections: [
        {
          heading: "Selection Methods",
          body: "Before you can format cells, you need to **select** them first.\n\n**Single Cell:** Click on it\n**Range of Cells:** Click first cell → drag to last cell (or click first, hold Shift, click last)\n**Entire Row:** Click the row number on the left\n**Entire Column:** Click the column letter at the top\n**Multiple Rows/Columns:** Click and drag across row numbers or column letters\n**Non-adjacent Cells:** Hold **Ctrl** and click each cell individually\n**Entire Worksheet:** Click the box at the intersection of row and column headers (top-left corner) OR press **Ctrl+A**",
          image: c5ExcelFormatting
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To select the entire worksheet, press Ctrl+___.", answer: "a" },
        { type: "fill-in-blank", question: "Hold ___ and click to select non-adjacent cells.", answer: "ctrl" },
        { type: "true-false", question: "You can select an entire column by clicking its letter header.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Font Formatting",
      subtitle: "Making your text beautiful and readable",
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Changing Font Properties",
          body: "The **Home** tab has all font formatting tools:\n\n🔤 **Font Name** — Change the typeface (Arial, Calibri, Comic Sans, etc.)\n🔢 **Font Size** — Make text bigger or smaller (8, 10, 11, 12, 14, 16, 18, 20...)\n\n**Text Styles:**\n• **B** — **Bold** (Ctrl+B) — makes text thicker and darker\n• *I* — *Italic* (Ctrl+I) — makes text slanted\n• **U** — Underline (Ctrl+U) — adds a line under text\n• ~~S~~ — Strikethrough — draws a line through text\n\n**Colors:**\n• **Font Color** (A with colored bar) — change the text color\n• **Fill Color** (paint bucket) — change the cell background color\n\n**How to Apply:**\n1. Select the cells you want to format\n2. Use the Font group in the Home tab\n3. Click the dropdown arrows for more options",
          tip: "Use **Bold** for headings and column headers to make them stand out from the data!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyboard shortcut for Bold is Ctrl+___.", answer: "b" },
        { type: "fill-in-blank", question: "The paint bucket icon is used to change the cell ___ color.", answer: "background" },
        { type: "true-false", question: "You can change both font color and cell background color.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Cell Alignment & Borders",
      subtitle: "Organizing data neatly in your cells",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Cell Alignment",
          body: "**Alignment** controls where text sits inside a cell.\n\n**Horizontal Alignment** (left to right):\n⬅️ **Left** — text sits on the left edge\n⬅️➡️ **Center** — text sits in the middle\n➡️ **Right** — text sits on the right edge\n\n**Vertical Alignment** (top to bottom):\n⬆️ **Top** — text sits at the top of the cell\n⬆️⬇️ **Middle** — text sits in the center vertically\n⬇️ **Bottom** — text sits at the bottom (default)\n\n**Other Alignment Options:**\n• **Wrap Text** — long text wraps to the next line within the cell\n• **Merge & Center** — combines cells and centers text\n• **Orientation** — rotate text at an angle (useful for column headers!)",
        },
        {
          heading: "Adding Borders",
          body: "**Borders** are lines around cells that make your data look organized like a proper table.\n\n**How to Add Borders:**\n1. Select the cells\n2. Go to **Home** tab → **Borders** button (grid icon with dropdown arrow)\n3. Choose from options:\n\n📦 **Bottom Border** — line at the bottom only\n📦 **Top Border** — line at the top only\n📦 **All Borders** — lines around every cell\n📦 **Thick Box Border** — thick border around the selection\n📦 **Outside Borders** — border only on the outer edge\n📦 **No Border** — remove all borders\n\n**More Borders:**\n• Click **More Borders** to open the Format Cells dialog\n• Choose line style (solid, dotted, dashed, double)\n• Choose line color\n• Choose which sides to apply borders to\n• Click **OK**",
          tip: "For a professional table: Use **thick borders** on the outside and **thin borders** on the inside!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Merge & ___ combines cells and centers the text.", answer: "center" },
        { type: "fill-in-blank", question: "The ___ Text option makes long text wrap to the next line within a cell.", answer: "wrap" },
        { type: "true-false", question: "You can only add borders on all sides at once.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a mark sheet: Row 1 headers (Roll No, Name, Maths, Science, English, Total) — Bold, centered, with blue background. Add all borders. Center-align the marks. Use different border styles for the header row.", answer: "" },
      ]
    },
  ]
};

// ======================== MS EXCEL - INSERT, DELETE & RESIZE ========================
const excelEdit: TopicTextbook = {
  topicId: "c5-xl-edit",
  topicTitle: "MS Excel – Insert, Delete & Resize",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Inserting Rows and Columns",
      subtitle: "Adding new rows and columns to your spreadsheet",
      bannerImage: c5ExcelInsertDelete,
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "Inserting Rows",
          body: "Sometimes you need to add more rows in the middle of your data.\n\n**Method 1: Right-Click**\n1. Right-click on the row number where you want to insert above\n2. Click **Insert**\n3. A new empty row appears above!\n\n**Method 2: Ribbon**\n1. Click on any cell in the row\n2. Go to **Home** tab → **Insert** → **Insert Sheet Rows**\n\n**Insert Multiple Rows:**\n1. Select multiple row numbers (e.g., click 5, drag to 7 to select 3 rows)\n2. Right-click → **Insert**\n3. Three new rows appear!\n\n⚠️ New rows always insert **above** the selected row.",
          image: c5ExcelInsertDelete
        },
        {
          heading: "Inserting Columns",
          body: "Adding columns works the same way!\n\n**Method 1: Right-Click**\n1. Right-click on the column letter where you want to insert before\n2. Click **Insert**\n3. A new empty column appears to the left!\n\n**Method 2: Ribbon**\n1. Click on any cell in the column\n2. Go to **Home** tab → **Insert** → **Insert Sheet Columns**\n\n**Insert Multiple Columns:**\n1. Select multiple column letters\n2. Right-click → **Insert**\n\n⚠️ New columns always insert **to the left** of the selected column.",
          tip: "After inserting rows or columns, existing data shifts to make room. Formulas automatically adjust!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "New rows are inserted ___ the selected row.", answer: "above" },
        { type: "fill-in-blank", question: "New columns are inserted to the ___ of the selected column.", answer: "left" },
        { type: "true-false", question: "You can insert multiple rows at once.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Deleting and Resizing",
      subtitle: "Removing rows/columns and adjusting sizes",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Deleting Rows and Columns",
          body: "**Delete a Row:**\n1. Right-click the row number\n2. Click **Delete**\n3. The entire row is removed and rows below shift up\n\n**Delete a Column:**\n1. Right-click the column letter\n2. Click **Delete**\n3. The column is removed and columns to the right shift left\n\n⚠️ **Important:** Delete removes the entire row/column including all data!\n⚠️ This is different from pressing the **Delete key** on your keyboard, which only clears the cell content but keeps the row/column.",
        },
        {
          heading: "Resizing Rows and Columns",
          body: "**Resize Column Width:**\n• Hover over the border between two column letters (cursor changes to ↔)\n• Click and drag left or right\n• **Auto-fit:** Double-click the border to automatically fit the widest content\n\n**Resize Row Height:**\n• Hover over the border between two row numbers (cursor changes to ↕)\n• Click and drag up or down\n• **Auto-fit:** Double-click the border to fit content\n\n**Exact Size:**\n1. Right-click the column letter → **Column Width** → Type a number\n2. Right-click the row number → **Row Height** → Type a number\n\n**Resize Multiple at Once:**\n1. Select multiple columns/rows\n2. Resize one — all selected ones resize equally!",
          tip: "Double-clicking a column border is the fastest way to make a column perfectly fit its content!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To auto-fit a column width, ___ the column border.", answer: "double-click" },
        { type: "true-false", question: "Pressing the Delete key on the keyboard removes the entire row.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can set an exact column width by right-clicking the column header.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Merge Cells & Wrap Text",
      subtitle: "Combining cells and handling long text",
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Merging Cells",
          body: "**Merge Cells** combines two or more cells into one large cell. This is commonly used for creating headings that span multiple columns.\n\n**How to Merge Cells:**\n1. Select the cells you want to merge (e.g., A1:D1)\n2. Go to **Home** tab\n3. Click **Merge & Center** button\n4. The cells combine into one and text is centered!\n\n**Merge Options:**\n🔗 **Merge & Center** — merges and centers text\n🔗 **Merge Across** — merges cells in each row separately\n🔗 **Merge Cells** — merges without centering\n🔗 **Unmerge Cells** — splits merged cells back to individual cells\n\n⚠️ **Warning:** When you merge cells, only the data in the **top-left cell** is kept. Data in other cells is deleted!",
        },
        {
          heading: "Wrap Text",
          body: "When text is too long for a cell, it overflows into the next cell (or gets hidden if the next cell has data).\n\n**Wrap Text** solves this by making the text go to a new line within the same cell!\n\n**How to Wrap Text:**\n1. Select the cell with long text\n2. Go to **Home** tab\n3. Click **Wrap Text** button\n4. The row height automatically increases to show all the text!\n\n**Without Wrap Text:** 'This is a very long sentence' → overflows →→→\n**With Wrap Text:**\n'This is a very\nlong sentence' (stays within the cell)\n\n**Manual Line Break:**\nPress **Alt+Enter** while typing in a cell to start a new line manually!",
          tip: "Use Merge & Center for table titles, and Wrap Text for cells with descriptions or long text!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Merge & Center combines cells into one and ___ the text.", answer: "centers" },
        { type: "fill-in-blank", question: "Press Alt+___ to create a manual line break within a cell.", answer: "enter" },
        { type: "true-false", question: "When merging cells, data from all cells is preserved.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "Wrap Text makes long text go to the next line within the same cell.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a Sports Score Card. Merge cells A1:E1 for the title 'Sports Day 2025'. Use wrap text for the 'Events' column with long event names. Add borders, colors, and format it neatly.", answer: "" },
      ]
    },
  ]
};

// ======================== SCRATCH - BLOCKS & VARIABLES ========================
const scratchBlocks: TopicTextbook = {
  topicId: "c5-scr",
  topicTitle: "Scratch – Blocks, Operators & Variables",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Introduction to Advanced Scratch",
      subtitle: "Taking your coding skills to the next level!",
      bannerImage: c5Scratch,
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "What You'll Learn",
          body: "In this chapter, you'll learn powerful Scratch features that will let you create **real games** and **interactive programs**!\n\n🧱 **Control Blocks** — Make decisions and repeat actions\n👁️ **Sensing Blocks** — Detect mouse, keyboard, and sprite interactions\n🔢 **Operator Blocks** — Do math and comparisons\n📦 **Variables** — Store and track information like scores\n📡 **Broadcasting** — Make sprites communicate with each other\n\nThese tools are what separate simple animations from real, interactive programs!",
          image: c5Scratch,
          funFact: "Scratch was created at MIT (Massachusetts Institute of Technology) in 2003. Over 100 million projects have been shared on the Scratch website!"
        }
      ]
    },
    {
      pageTitle: "Control Blocks",
      subtitle: "The brain of your Scratch programs",
      bannerImage: c5ScratchBlocks,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "What are Control Blocks?",
          body: "**Control blocks** (yellow/dark orange) control the **flow** of your program — they decide what happens, when, and how many times.\n\n⏳ **Wait ( ) seconds**\nPauses the script for a set time.\nExample: Wait 2 seconds between dialogue lines.\n\n🔄 **Repeat ( )**\nRuns the blocks inside it a specific number of times.\nExample: Repeat 10 → move 10 steps each time = moves 100 steps total.\n\n♾️ **Forever**\nRuns the blocks inside it non-stop until you click the stop button.\nExample: Forever → check if touching edge → if yes, bounce.\n\n❓ **If < > then**\nChecks a condition. If true, runs the blocks inside.\nExample: If <touching color red?> then → say 'Ouch!'\n\n❓ **If < > then / else**\nChecks a condition. If true, runs one set of blocks. If false, runs a different set.\nExample: If <score > 10> then → say 'You win!' else → say 'Keep trying!'",
          image: c5ScratchBlocks,
          tip: "The diamond-shaped blocks (like <touching mouse pointer?>) are called **Boolean blocks**. They always give a True or False answer!"
        },
        {
          heading: "Nested Control Blocks",
          body: "You can put control blocks **inside** other control blocks! This is called **nesting**.\n\n**Example: A Simple Game Loop**\n```\nForever\n  If <key 'right arrow' pressed?> then\n    Move 10 steps\n  End\n  If <key 'left arrow' pressed?> then\n    Move -10 steps\n  End\n  If <touching 'Enemy'?> then\n    Say 'Game Over!' for 2 secs\n    Stop all\n  End\nEnd\n```\n\nThis creates a character you can move left and right, and if it touches an enemy, the game ends!\n\n**Wait Until < >**\nPauses until a condition becomes true.\nExample: Wait until <key 'space' pressed?> → then continue.",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block runs code inside it non-stop.", answer: "forever" },
        { type: "fill-in-blank", question: "The 'If-then-else' block checks a ___ and runs different code based on the result.", answer: "condition" },
        { type: "true-false", question: "The Repeat block runs code a specific number of times.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You cannot put an If block inside a Forever block.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Sensing Blocks",
      subtitle: "Making your programs detect and respond",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "What are Sensing Blocks?",
          body: "**Sensing blocks** (light blue) let your program **detect** what's happening in the project.\n\n🖱️ **Mouse Sensing:**\n• **mouse x** / **mouse y** — gets the mouse cursor position\n• **mouse down?** — checks if mouse button is pressed\n\n⌨️ **Keyboard Sensing:**\n• **key ( ) pressed?** — checks if a specific key is pressed\n• Choose any key: space, arrows, letters, numbers\n\n👆 **Touch Sensing:**\n• **touching ( )?** — checks if sprite is touching another sprite, edge, or mouse\n• **touching color ( )?** — checks if sprite touches a specific color\n• **color ( ) is touching ( )?** — checks if one color on the sprite touches another color\n\n📏 **Distance:**\n• **distance to ( )** — measures distance to mouse or another sprite",
        },
        {
          heading: "Ask and Answer",
          body: "The **Ask** block is one of the most useful sensing blocks!\n\n**ask ( ) and wait** — Shows a text input box on screen and waits for user to type\n**answer** — Stores whatever the user typed\n\n**Example: Greeting Program**\n```\nask 'What is your name?' and wait\nsay (join 'Hello, ' (answer)) for 2 secs\nask 'How old are you?' and wait\nsay (join 'Wow! ' (join (answer) ' years old!')) for 2 secs\n```\n\nThis creates an interactive conversation with the user!\n\n**Other Useful Sensing Blocks:**\n• **timer** — counts seconds since program started\n• **reset timer** — resets the timer to 0\n• **loudness** — detects microphone input volume\n• **current (year/month/date/day/hour/minute/second)** — gets the current date/time",
          tip: "Use the **timer** block to create timed challenges! Start the timer, let the player do something, then check how long it took."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The 'ask and wait' block stores the user's response in the ___ block.", answer: "answer" },
        { type: "fill-in-blank", question: "Sensing blocks are ___ colored in Scratch.", answer: "light blue" },
        { type: "true-false", question: "You can detect if a specific keyboard key is pressed.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a Scratch project where the cat asks your name, then says 'Welcome [name]!'. Then ask a math question and check if the answer is correct using an If block.", answer: "" },
      ]
    },
    {
      pageTitle: "Operator Blocks",
      subtitle: "Math, logic, and text operations",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Math Operators",
          body: "**Operator blocks** (green) perform math calculations and comparisons.\n\n**Arithmetic Operators:**\n➕ **( ) + ( )** — Addition (5 + 3 = 8)\n➖ **( ) - ( )** — Subtraction (10 - 4 = 6)\n✖️ **( ) * ( )** — Multiplication (6 * 7 = 42)\n➗ **( ) / ( )** — Division (20 / 5 = 4)\n\n**More Math:**\n🎲 **pick random ( ) to ( )** — generates a random number\n   Example: pick random 1 to 6 = simulates rolling a dice!\n\n📐 **( ) mod ( )** — remainder after division\n   Example: 10 mod 3 = 1 (because 10 ÷ 3 = 3 remainder 1)\n\n🔄 **round ( )** — rounds to nearest whole number\n   Example: round 3.7 = 4",
        },
        {
          heading: "Comparison and Logic Operators",
          body: "**Comparison Operators** (give True or False):\n• **( ) > ( )** — greater than (5 > 3 = True)\n• **( ) < ( )** — less than (2 < 1 = False)\n• **( ) = ( )** — equal to (7 = 7 = True)\n\n**Logic Operators:**\n• **< > and < >** — both conditions must be true\n• **< > or < >** — at least one condition must be true\n• **not < >** — flips true to false and false to true\n\n**Text Operators:**\n• **join ( ) ( )** — combines two texts together\n   Example: join 'Hello' 'World' = 'HelloWorld'\n• **letter ( ) of ( )** — gets a specific character\n   Example: letter 1 of 'Cat' = 'C'\n• **length of ( )** — counts characters\n   Example: length of 'Hello' = 5\n• **( ) contains ( )?** — checks if text contains a word",
          tip: "Use **join** to create dynamic messages like: join 'Your score is: ' (score)"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The 'pick random 1 to 6' block simulates rolling a ___.", answer: "dice" },
        { type: "fill-in-blank", question: "The ___ operator combines two text strings together.", answer: "join" },
        { type: "true-false", question: "10 mod 3 equals 1.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The 'and' operator requires only one condition to be true.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Variables",
      subtitle: "Storing and tracking information in your programs",
      bannerImage: c5ScratchVariables,
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "What are Variables?",
          body: "A **variable** is like a labeled box that stores a piece of information. You give it a name and put a value inside.\n\n**Examples of variables:**\n📦 **score** = 0 (tracks player's points)\n📦 **lives** = 3 (tracks remaining lives)\n📦 **playerName** = 'Alex' (stores the player's name)\n📦 **timer** = 30 (countdown seconds)\n📦 **level** = 1 (current game level)\n\n**How to Create a Variable:**\n1. Go to the **Variables** category (orange blocks)\n2. Click **Make a Variable**\n3. Type a name (e.g., 'score')\n4. Choose **For all sprites** or **For this sprite only**\n5. Click **OK**",
          image: c5ScratchVariables
        },
        {
          heading: "Using Variables",
          body: "After creating a variable, you get these blocks:\n\n🔧 **set [score] to (0)** — sets the variable to a specific value\n🔧 **change [score] by (1)** — adds to the current value\n👁️ **show variable [score]** — displays it on the stage\n🙈 **hide variable [score]** — hides it from the stage\n\n**Example: Score Keeping Game**\n```\nWhen green flag clicked\n  set [score] to (0)\n  set [lives] to (3)\n  show variable [score]\n  show variable [lives]\n  Forever\n    If <touching 'coin'?> then\n      change [score] by (10)\n      play sound 'pop'\n    End\n    If <touching 'enemy'?> then\n      change [lives] by (-1)\n      If <(lives) = (0)> then\n        say 'Game Over!' for 2 secs\n        stop all\n      End\n    End\n  End\n```\n\nThis game tracks your score (goes up when you collect coins) and lives (goes down when you hit enemies). When lives reach 0, the game ends!",
          tip: "Always **set variables to their starting values** at the beginning of your program (when green flag clicked). Otherwise, they keep values from the last time you ran the project!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is like a labeled box that stores information.", answer: "variable" },
        { type: "fill-in-blank", question: "The 'change score by 1' block ___ 1 to the current score.", answer: "adds" },
        { type: "true-false", question: "Variables can store both numbers and text.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You should set variables to starting values when the green flag is clicked.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Broadcasting Messages",
      subtitle: "Making sprites talk to each other",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "What is Broadcasting?",
          body: "**Broadcasting** lets sprites send messages to each other! This is how sprites coordinate and work together.\n\n**How it works:**\n1. One sprite **broadcasts** a message (like shouting a signal)\n2. Other sprites **receive** the message and react\n\n**Broadcasting Blocks:**\n📡 **broadcast [message]** — sends a message to all sprites\n📡 **broadcast [message] and wait** — sends a message and waits until all receivers finish\n📡 **when I receive [message]** — runs code when the message is received\n\n**Example: Traffic Light Game**\n\nSprite 1 (Traffic Light):\n```\nWhen green flag clicked\nForever\n  switch costume to 'green'\n  broadcast 'go'\n  wait 3 secs\n  switch costume to 'red'\n  broadcast 'stop'\n  wait 3 secs\nEnd\n```\n\nSprite 2 (Car):\n```\nWhen I receive 'go'\n  repeat 30\n    move 5 steps\n  end\n\nWhen I receive 'stop'\n  say 'Stopped!' for 1 sec\n```",
        },
        {
          heading: "Creating Messages",
          body: "**To create a new message:**\n1. Drag the **broadcast** block into your script\n2. Click the dropdown arrow\n3. Click **New message**\n4. Type a descriptive name (like 'gameOver', 'nextLevel', 'playerWins')\n5. Click **OK**\n\n**Best Practices for Broadcasting:**\n✅ Use clear message names ('playerDied' not 'msg1')\n✅ Keep track of which sprites send and receive each message\n✅ Use 'broadcast and wait' when you need things to happen in order\n✅ One broadcast can trigger actions in multiple sprites!\n\n**Common Uses:**\n• Start a game ('gameStart')\n• End a game ('gameOver')\n• Change scenes ('scene2')\n• Trigger events ('playerScored', 'enemyDefeated')\n• Coordinate animations ('startDance')",
          tip: "Think of broadcasting like a school bell — when it rings, everyone knows what to do!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block sends a message to all sprites.", answer: "broadcast" },
        { type: "fill-in-blank", question: "The 'when I receive' block runs code when a ___ is received.", answer: "message" },
        { type: "true-false", question: "Only one sprite can receive a broadcast message.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "Broadcast messages should have clear, descriptive names.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create an interactive quiz game with 3 questions. Use 'ask and wait' for questions, variables for score, 'if-then' to check answers, and broadcasting to show a 'You Win' or 'Try Again' screen at the end.", answer: "" },
      ]
    },
  ]
};

// ======================== MS WORD - TEXT FORMATTING ========================
const wordTextFormatting: TopicTextbook = {
  topicId: "c5-word-tf",
  topicTitle: "MS Word – Text Formatting & Styles",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Introduction to Text Formatting",
      subtitle: "Making your text look beautiful and professional",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "What is Text Formatting?",
          body: "**Text formatting** means changing how your text looks — making it bigger, bolder, more colorful, or more organized.\n\nGood formatting makes documents:\n• **Easier to read** — readers can scan quickly\n• **More professional** — looks like a real publication\n• **Better organized** — headings, lists, and emphasis guide the reader\n• **More attractive** — color and style catch the eye\n\nAll text formatting tools are in the **Home** tab in the **Font** and **Paragraph** groups.",
          tip: "Always format AFTER you finish writing. Write first, format later — this saves time!"
        }
      ]
    },
    {
      pageTitle: "Bold, Italic, Underline & More",
      subtitle: "Basic text styling tools",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Text Style Options",
          body: "**Bold (Ctrl+B)** — Makes text **thicker and darker**. Use for headings and important words.\n\n*Italic (Ctrl+I)* — Makes text *slanted*. Use for book titles, foreign words, or emphasis.\n\n**Underline (Ctrl+U)** — Adds a line under text. Use sparingly — too much underline is hard to read.\n\n~~Strikethrough~~ — Draws a line through text. Shows deleted or incorrect information.\n\n**Subscript** — Makes text smaller and lower (like H₂O)\n**Superscript** — Makes text smaller and higher (like x²)\n\n**Text Highlight** — Marks text with a colored background (like a highlighter pen)\n**Font Color** — Changes the color of the text itself",
        },
        {
          heading: "Changing Font & Size",
          body: "**Font Name:** The style of letters\n• **Arial** — clean and modern\n• **Times New Roman** — classic and formal\n• **Comic Sans** — fun and playful\n• **Calibri** — the default Word font\n\n**Font Size:** Measured in points (pt)\n• 8-10pt — small text, fine print\n• 11-12pt — normal body text\n• 14-16pt — subheadings\n• 18-24pt — headings\n• 28-72pt — titles and posters\n\n**Quick Size Buttons:**\n• **A↑** (Grow Font) — increases size by one step\n• **A↓** (Shrink Font) — decreases size by one step\n\n**Change Case** button — Switch between UPPERCASE, lowercase, Title Case, and more!",
          tip: "For school work, use **Calibri** or **Arial** at **12pt** for body text and **14-16pt** for headings."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyboard shortcut for Bold is Ctrl+___.", answer: "b" },
        { type: "fill-in-blank", question: "The default font in MS Word is ___.", answer: "calibri" },
        { type: "true-false", question: "Subscript makes text smaller and higher.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You can change text between uppercase and lowercase using the Change Case button.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Paragraph Alignment & Spacing",
      subtitle: "Organizing your paragraphs neatly",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Text Alignment",
          body: "**Alignment** controls how text lines up on the page:\n\n⬅️ **Left Align (Ctrl+L)** — text lines up on the left edge (default for most text)\n⬅️➡️ **Center (Ctrl+E)** — text is centered in the middle (great for titles)\n➡️ **Right Align (Ctrl+R)** — text lines up on the right edge (used for dates)\n⬅️➡️ **Justify (Ctrl+J)** — text stretches to fill both edges evenly (used in books and newspapers)\n\n**When to use each:**\n• Left Align — regular paragraphs, letters, reports\n• Center — titles, headings, invitations\n• Right Align — dates, page numbers, signatures\n• Justify — professional documents, magazine articles",
        },
        {
          heading: "Line Spacing & Paragraph Spacing",
          body: "**Line Spacing** — the space between lines within a paragraph:\n• **1.0** — single spacing (tight)\n• **1.15** — default Word spacing\n• **1.5** — one-and-a-half spacing (easy to read)\n• **2.0** — double spacing (used in school essays)\n\n**How to change:**\n1. Select text → Home tab → Line Spacing button (in Paragraph group)\n2. Choose your spacing\n\n**Paragraph Spacing** — space before or after paragraphs:\n• **Before** — adds space above the paragraph\n• **After** — adds space below the paragraph\n• Change in: Home → Paragraph → Spacing options",
          tip: "Teachers often ask for **double spacing (2.0)** in essays so they can write comments between lines!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The shortcut to center text is Ctrl+___.", answer: "e" },
        { type: "fill-in-blank", question: "___ alignment stretches text to fill both left and right edges.", answer: "justify" },
        { type: "true-false", question: "Double spacing means 2.0 line spacing.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Type a short essay about 'My School'. Use Center alignment for the title, Justify for the body, and Right Align for the date. Set line spacing to 1.5 and add 12pt spacing after each paragraph.", answer: "" },
      ]
    },
    {
      pageTitle: "Find & Replace",
      subtitle: "Quickly find and change text in your document",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "Find (Ctrl+F)",
          body: "**Find** lets you search for any word or phrase in your document.\n\n**How to use Find:**\n1. Press **Ctrl+F** (or go to Home → Find)\n2. Type the word you're looking for\n3. Word highlights all occurrences!\n4. Use the arrows to jump between results\n\n**Advanced Find options:**\n• **Match case** — finds only exact capitalization ('Word' but not 'word')\n• **Find whole words only** — finds 'the' but not 'the**re**' or 'o**the**r'",
        },
        {
          heading: "Replace (Ctrl+H)",
          body: "**Replace** lets you find a word and change it to something else — automatically!\n\n**How to use Replace:**\n1. Press **Ctrl+H** (or Home → Replace)\n2. In 'Find what' — type the word to find\n3. In 'Replace with' — type the new word\n4. Click **Replace** — changes one at a time\n5. Click **Replace All** — changes ALL occurrences at once!\n\n**Example:** You wrote 'colour' 50 times but need 'color' (American spelling)\n→ Find: colour → Replace with: color → Replace All\n→ Done! All 50 changed in 1 second!\n\n⚠️ Be careful with Replace All — it might change words you didn't intend!",
          tip: "Always use **Find** first to see all occurrences before using **Replace All**. This prevents accidental changes!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The shortcut to open Find is Ctrl+___.", answer: "f" },
        { type: "fill-in-blank", question: "The shortcut to open Replace is Ctrl+___.", answer: "h" },
        { type: "true-false", question: "Replace All changes every occurrence at once.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Find can only search for single words, not phrases.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Type a paragraph using the word 'computer' at least 5 times. Then use Find to highlight all occurrences. Finally, use Replace to change 'computer' to 'PC' in all places at once.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review & Assessment",
      subtitle: "Test your knowledge of Text Formatting!",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Summary — What You Learned",
          body: "✅ **Text Styles** — Bold, Italic, Underline, Strikethrough, Sub/Superscript\n✅ **Font & Size** — Choosing fonts, changing sizes, Change Case\n✅ **Alignment** — Left, Center, Right, Justify\n✅ **Spacing** — Line spacing (1.0, 1.5, 2.0) and paragraph spacing\n✅ **Find & Replace** — Search for text and change it automatically\n\nThese skills make your documents look professional and polished!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The three basic text styles are Bold, Italic, and ___.", answer: "underline" },
        { type: "fill-in-blank", question: "___ alignment is best for titles and headings.", answer: "center" },
        { type: "fill-in-blank", question: "Ctrl+H opens the ___ dialog.", answer: "replace" },
        { type: "true-false", question: "Justify alignment makes text line up on both left and right edges.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The default line spacing in Word is 2.0.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a 'Class Newspaper' with: (1) A large, bold, centered title (2) Date right-aligned (3) Body text in justified alignment with 1.5 spacing (4) Use at least 3 different fonts and colors (5) Add bold and italic for emphasis throughout.", answer: "" },
      ]
    },
  ]
};

// ======================== PPT - SLIDE DESIGN ========================
const pptDesign: TopicTextbook = {
  topicId: "c5-ppt-design",
  topicTitle: "MS PowerPoint – Slide Design & Themes",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Introduction to Slide Design",
      subtitle: "Creating visually stunning presentations",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Why Design Matters",
          body: "A well-designed presentation keeps your audience engaged and helps them understand your message.\n\n**Good design includes:**\n🎨 Consistent colors and fonts throughout\n🎨 Clean layouts that aren't cluttered\n🎨 Readable text (not too small, good contrast)\n🎨 Relevant images and graphics\n🎨 Professional appearance\n\n**Bad design mistakes:**\n❌ Too much text on one slide\n❌ Clashing colors\n❌ Too many different fonts\n❌ Tiny text nobody can read\n❌ Distracting backgrounds",
          tip: "The 10-20-30 rule: No more than 10 slides, no longer than 20 minutes, no text smaller than 30pt!"
        }
      ]
    },
    {
      pageTitle: "Themes & Templates",
      subtitle: "Ready-made designs for professional slides",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "What are Themes?",
          body: "A **theme** is a set of pre-designed colors, fonts, and effects that give your presentation a consistent, professional look.\n\n**How to apply a theme:**\n1. Go to **Design** tab\n2. Browse the theme gallery\n3. Hover over a theme to preview it\n4. Click to apply it to all slides\n\n**Theme includes:**\n• **Colors** — a coordinated color palette\n• **Fonts** — a heading font and a body font\n• **Effects** — shape and line styles\n• **Background** — consistent background design",
        },
        {
          heading: "Customizing Themes",
          body: "You can modify any theme to make it your own!\n\n**Change Colors:**\n1. Design tab → Variants → Colors\n2. Choose from preset color schemes OR create custom colors\n\n**Change Fonts:**\n1. Design tab → Variants → Fonts\n2. Choose a font pair for headings and body\n\n**Change Background:**\n1. Design tab → Format Background\n2. Options: Solid fill, Gradient fill, Picture fill, Pattern fill\n3. Click 'Apply to All' for consistency\n\n**Slide Master** (Advanced):\nThe Slide Master controls the look of ALL slides at once. Changes here affect every slide!\n1. View tab → Slide Master\n2. Edit the master layout\n3. Close Master View",
          tip: "Using Slide Master saves time — change the logo, font, or color once and it updates everywhere!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a set of pre-designed colors, fonts, and effects.", answer: "theme" },
        { type: "fill-in-blank", question: "The ___ Master controls the look of all slides at once.", answer: "slide" },
        { type: "true-false", question: "You can customize the colors of a theme.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "A theme only changes the background of slides.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "SmartArt Graphics",
      subtitle: "Visual diagrams to explain ideas",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "What is SmartArt?",
          body: "**SmartArt** creates professional diagrams and charts with just a few clicks!\n\n**Types of SmartArt:**\n📊 **List** — show items in a visual list\n🔄 **Process** — show steps in a sequence\n♻️ **Cycle** — show a repeating process\n🏗️ **Hierarchy** — show organizational structures (like family trees)\n🔗 **Relationship** — show how things connect\n📐 **Matrix** — show parts of a whole\n🎯 **Pyramid** — show proportional or hierarchical relationships\n\n**How to insert SmartArt:**\n1. Go to **Insert** tab\n2. Click **SmartArt**\n3. Choose a category and design\n4. Click **OK**\n5. Type your text in the text pane",
        },
        {
          heading: "Formatting SmartArt",
          body: "After inserting SmartArt, you can customize it:\n\n**Add/Remove Shapes:**\n• Click a shape → SmartArt Tools → Add Shape\n• Select and press Delete to remove\n\n**Change Colors:**\n• SmartArt Tools → Design → Change Colors\n• Choose from colorful, accent, or custom schemes\n\n**Change Style:**\n• SmartArt Tools → Design → SmartArt Styles\n• Options: Simple, Polished, 3-D, and more\n\n**Example Uses:**\n• **Water Cycle** — use a Cycle SmartArt\n• **Food Chain** — use a Hierarchy SmartArt\n• **Steps to solve a problem** — use a Process SmartArt\n• **Compare two things** — use a Relationship SmartArt",
          tip: "SmartArt is much faster than drawing shapes manually! Use it whenever you need to show a process, list, or hierarchy."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "SmartArt is found in the ___ tab.", answer: "insert" },
        { type: "fill-in-blank", question: "A ___ SmartArt shows steps in a sequence.", answer: "process" },
        { type: "true-false", question: "SmartArt can only show lists.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a presentation about 'The Water Cycle'. Use a Cycle SmartArt to show the stages (Evaporation, Condensation, Precipitation, Collection). Apply a colorful theme and add images on other slides.", answer: "" },
      ]
    },
  ]
};

// ======================== SCRATCH - GAME DEVELOPMENT ========================
const scratchGames: TopicTextbook = {
  topicId: "c5-scr-games",
  topicTitle: "Scratch – Game Development Basics",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Introduction to Game Development",
      subtitle: "Learn to create your own games in Scratch!",
      bannerImage: c5Scratch,
      bannerColor: "from-yellow-500 to-green-500",
      sections: [
        {
          heading: "What Makes a Game?",
          body: "Every game has these essential elements:\n\n🎮 **Player Character** — the sprite the player controls\n🎯 **Goal** — what the player needs to achieve\n🚧 **Obstacles** — things that make it challenging\n📊 **Score** — tracks the player's performance\n❤️ **Lives** — number of chances\n🎵 **Sound Effects** — audio feedback\n🖼️ **Backdrops** — the game environment\n\n**Types of games you can make in Scratch:**\n• **Maze games** — navigate through a maze\n• **Catch games** — catch falling objects\n• **Chase games** — avoid enemies\n• **Quiz games** — answer questions\n• **Platformer games** — jump between platforms\n• **Pong-style games** — bounce a ball",
          funFact: "The first video game ever made was 'Tennis for Two' in 1958 — over 65 years ago! It was played on an oscilloscope screen."
        }
      ]
    },
    {
      pageTitle: "Player Movement",
      subtitle: "Making your character move with keyboard controls",
      bannerImage: c5ScratchBlocks,
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "Arrow Key Movement",
          body: "The most common game control is moving a character with arrow keys.\n\n**Basic Movement Script:**\n```\nWhen green flag clicked\nForever\n  If <key 'up arrow' pressed?> then\n    change y by 5\n  End\n  If <key 'down arrow' pressed?> then\n    change y by -5\n  End\n  If <key 'left arrow' pressed?> then\n    change x by -5\n  End\n  If <key 'right arrow' pressed?> then\n    change x by 5\n  End\nEnd\n```\n\n**Making it better:**\n• **Boundary check** — stop at edges using `if on edge, bounce`\n• **Speed variable** — use a variable to control movement speed\n• **Smooth rotation** — set rotation style to 'left-right' for side-scrolling games",
          tip: "Change the movement value (5) to make the character faster or slower. Try different values to find the perfect speed!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To move a sprite up, we change ___ by a positive number.", answer: "y" },
        { type: "fill-in-blank", question: "To move a sprite left, we change x by a ___ number.", answer: "negative" },
        { type: "true-false", question: "The 'if on edge, bounce' block prevents sprites from leaving the screen.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the block coding editor and create a sprite that moves in all 4 directions using arrow keys. Add boundary detection so it doesn't go off-screen. Add a trail effect by using the 'stamp' block.", answer: "" },
      ]
    },
    {
      pageTitle: "Collision Detection & Scoring",
      subtitle: "Detecting when sprites touch and keeping score",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Collision Detection",
          body: "**Collision detection** means checking if two sprites are touching each other.\n\n**Methods:**\n🔵 **touching [sprite]?** — checks if touching another sprite\n🎨 **touching color [color]?** — checks if touching a specific color\n📏 **distance to [sprite] < 30** — checks if within a certain distance\n\n**Common collision uses:**\n• Player touches coin → collect it, add score\n• Player touches enemy → lose a life\n• Ball touches paddle → bounce back\n• Character touches finish line → win!",
        },
        {
          heading: "Score System",
          body: "**Setting up a score:**\n1. Create a variable called 'score'\n2. Set score to 0 when game starts\n3. Change score when events happen\n\n**Complete scoring example:**\n```\nWhen green flag clicked\nset [score] to (0)\nset [lives] to (3)\n\n-- On the coin sprite:\nWhen green flag clicked\nForever\n  go to (random position)\n  wait until <touching [player]?>\n  change [score] by (10)\n  play sound 'pop'\n  go to (random position)\nEnd\n```\n\n**Difficulty increase:**\n```\nIf <(score) > (50)> then\n  set [speed] to (8)\nEnd\nIf <(score) > (100)> then\n  set [speed] to (12)\nEnd\n```\nThis makes the game harder as the score increases!",
          tip: "Always show the score on screen using 'show variable'. Players want to see their progress!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Checking if two sprites are touching is called ___ detection.", answer: "collision" },
        { type: "fill-in-blank", question: "To increase score by 10, use 'change [score] by ___'.", answer: "10" },
        { type: "true-false", question: "You can check if a sprite is touching a specific color.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 'Catch the Fruit' game: a basket at the bottom moves left-right with arrow keys. Fruits fall from random positions at the top. When the basket catches a fruit, score increases by 10 and a sound plays. After 5 missed fruits, game over!", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Test your game development knowledge!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Summary — What You Learned",
          body: "✅ **Game Elements** — player, goal, obstacles, score, lives, sounds\n✅ **Player Movement** — arrow key controls using sensing and motion blocks\n✅ **Collision Detection** — touching sprites, touching colors, distance checks\n✅ **Score System** — variables for score and lives, increasing difficulty\n\nWith these skills, you can create many different types of games!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Every game needs a player, a goal, and ___.", answer: "obstacles" },
        { type: "true-false", question: "The 'change x by -5' block moves a sprite to the left.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You cannot make a game harder as the player's score increases.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Design and create your own original game! It must have: (1) A player sprite with keyboard controls (2) At least 2 other sprites (3) A scoring system (4) A game over condition (5) Sound effects. Be creative!", answer: "" },
      ]
    },
  ]
};

// Export all topic textbooks (Class 5 only)
export const TOPIC_TEXTBOOKS: TopicTextbook[] = [
  wordPageFormatting,
  wordTextFormatting,
  pptAnimations,
  pptDesign,
  excelIntro,
  excelCells,
  excelEdit,
  scratchBlocks,
  scratchGames,
];

// Import all class textbooks for unified lookup
import { CLASS_1_2_TEXTBOOKS } from "./class1_2Content";
import { CLASS_3_4_TEXTBOOKS } from "./class3_4Content";
import { CLASS_6_8_TEXTBOOKS } from "./class6_8Content";
import { CLASS_9_10_TEXTBOOKS } from "./class9_10Content";

const ALL_TEXTBOOKS: TopicTextbook[] = [
  ...CLASS_1_2_TEXTBOOKS,
  ...CLASS_3_4_TEXTBOOKS,
  ...TOPIC_TEXTBOOKS,
  ...CLASS_6_8_TEXTBOOKS,
  ...CLASS_9_10_TEXTBOOKS,
];

export const getTopicTextbook = (topicId: string): TopicTextbook | undefined => {
  return ALL_TEXTBOOKS.find((t) => t.topicId === topicId);
};
