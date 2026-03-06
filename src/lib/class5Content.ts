// Rich curriculum content for Class 5 with theory, images, and exercises
import c5WordImg from "@/assets/curriculum/c5-word-page.jpg";
import c5PptImg from "@/assets/curriculum/c5-ppt-anim.jpg";
import c5ExcelIntroImg from "@/assets/curriculum/c5-excel-intro.jpg";
import c5ExcelWorkImg from "@/assets/curriculum/c5-excel-work.jpg";
import c5ScratchImg from "@/assets/curriculum/c5-scratch.jpg";

export interface Exercise {
  type: "fill-in-blank" | "true-false" | "practice";
  question: string;
  answer: string; // correct answer
  options?: string[]; // for true-false: ["True","False"]
}

export interface TopicContent {
  topicId: string;
  image: string;
  theory: string; // rich text theory
  exercises: Exercise[];
}

export const CLASS5_CONTENT: TopicContent[] = [
  {
    topicId: "c5-word-pf",
    image: c5WordImg,
    theory: `**MS Word – Page Formatting** helps you make your documents look professional and beautiful.

📐 **Page Margins** are the blank spaces around the edges of a page. You can change margins from the Page Layout tab. Margins can be Normal, Narrow, Wide, or Custom.

📄 **Page Orientation** means the direction of the page. Portrait (tall) is default. Landscape (wide) is used for wide tables or images. Go to Page Layout → Orientation to change it.

🎨 **Page Background Color** lets you add a color to the entire page background. Go to Page Layout → Page Color to pick a color.

💧 **Watermarks** are faded text or images that appear behind the content. They are used for "CONFIDENTIAL" or "DRAFT" labels. Go to Page Layout → Watermark.

🖼️ **Page Borders** are decorative borders around the entire page. Go to Page Layout → Page Borders. You can choose Box, Shadow, 3D, or Art borders.

📰 **Columns** let you split text into two or more columns like a newspaper. Go to Page Layout → Columns → Choose Two or Three columns.`,
    exercises: [
      { type: "fill-in-blank", question: "The blank spaces around the edges of a page are called ___.", answer: "margins" },
      { type: "fill-in-blank", question: "Portrait and ___ are the two types of page orientation.", answer: "landscape" },
      { type: "fill-in-blank", question: "A ___ is a faded text or image that appears behind the content.", answer: "watermark" },
      { type: "true-false", question: "Page borders can only be simple lines.", answer: "False", options: ["True", "False"] },
      { type: "true-false", question: "You can split text into columns in MS Word.", answer: "True", options: ["True", "False"] },
      { type: "true-false", question: "Landscape orientation makes the page tall and narrow.", answer: "False", options: ["True", "False"] },
      { type: "practice", question: "Open MS Word. Set the page orientation to Landscape. Add a page border with Art style. Change the page color to light yellow.", answer: "" },
      { type: "practice", question: "Create a one-page document with two columns. Type a short story in it. Add a 'DRAFT' watermark.", answer: "" },
    ],
  },
  {
    topicId: "c5-ppt-anim",
    image: c5PptImg,
    theory: `**MS PowerPoint – Animations & Transitions** makes your presentations come alive with motion and effects!

🎬 **Slide Transitions** are visual effects that play when you move from one slide to the next. Go to Transitions tab to pick effects like Fade, Push, Wipe, or Morph.

✨ **Animation Effects** make objects on a slide appear, disappear, or move. There are 4 types:
• **Entrance** – object appears (Fly In, Fade In)
• **Emphasis** – object gets highlighted (Spin, Grow)
• **Exit** – object disappears (Fly Out, Fade Out)
• **Motion Path** – object moves along a path

⏱️ **Animation Timing** controls when and how fast animations play. You can set:
• Start: On Click, With Previous, After Previous
• Duration: How long the animation takes
• Delay: Wait time before animation starts

🔊 **Inserting Audio** – Go to Insert → Audio to add background music or sound effects to your slides.

🎥 **Inserting Video** – Go to Insert → Video to add video clips from your computer or online sources.

🎨 **Custom Animations** – You can apply multiple animations to the same object and control their order using the Animation Pane.`,
    exercises: [
      { type: "fill-in-blank", question: "Visual effects that play when moving from one slide to the next are called ___.", answer: "transitions" },
      { type: "fill-in-blank", question: "The four types of animation effects are Entrance, Emphasis, Exit, and ___.", answer: "motion path" },
      { type: "fill-in-blank", question: "To add background music, go to Insert → ___.", answer: "audio" },
      { type: "true-false", question: "You can apply only one animation to an object in PowerPoint.", answer: "False", options: ["True", "False"] },
      { type: "true-false", question: "Transitions are effects between two slides.", answer: "True", options: ["True", "False"] },
      { type: "true-false", question: "Emphasis animations make an object disappear from the slide.", answer: "False", options: ["True", "False"] },
      { type: "practice", question: "Create a 5-slide presentation about your favorite animal. Add different transitions to each slide. Apply entrance animation to the title on each slide.", answer: "" },
      { type: "practice", question: "Insert an image in a slide. Apply a Motion Path animation to make it move across the screen. Set the duration to 3 seconds.", answer: "" },
    ],
  },
  {
    topicId: "c5-xl-intro",
    image: c5ExcelIntroImg,
    theory: `**MS Excel Introduction** – Excel is a powerful spreadsheet program used to organize data, do calculations, and make charts!

📊 **What is Excel?** Excel is a spreadsheet application by Microsoft. It organizes data in rows and columns. It is used for calculations, record-keeping, charts, and data analysis.

🖥️ **Excel Interface** has these main parts:
• **Title Bar** – Shows the file name
• **Ribbon** – Contains tabs like Home, Insert, Page Layout
• **Formula Bar** – Shows the content of the selected cell
• **Name Box** – Shows the cell address (like A1, B3)
• **Sheet Tabs** – Switch between different worksheets

📒 **Workbooks & Worksheets** – A Workbook is the entire Excel file. Each workbook can have multiple Worksheets (tabs at the bottom). By default, Excel opens with one worksheet.

🔲 **Cells, Rows, Columns**:
• A **Cell** is the box where a row and column meet (e.g., A1)
• **Rows** go horizontally (numbered 1, 2, 3...)
• **Columns** go vertically (lettered A, B, C...)

✍️ **Entering Data** – Click on any cell and start typing. Press Enter to move down, Tab to move right. You can enter text, numbers, or dates.`,
    exercises: [
      { type: "fill-in-blank", question: "Excel organizes data in rows and ___.", answer: "columns" },
      { type: "fill-in-blank", question: "The box where a row and column meet is called a ___.", answer: "cell" },
      { type: "fill-in-blank", question: "The ___ bar shows the content of the selected cell.", answer: "formula" },
      { type: "fill-in-blank", question: "An entire Excel file is called a ___.", answer: "workbook" },
      { type: "true-false", question: "Rows in Excel are labeled with letters A, B, C.", answer: "False", options: ["True", "False"] },
      { type: "true-false", question: "A workbook can have multiple worksheets.", answer: "True", options: ["True", "False"] },
      { type: "practice", question: "Open Excel. In Sheet1, type your class timetable with days as columns and periods as rows. Save the file as 'My Timetable'.", answer: "" },
      { type: "practice", question: "Create a birthday list with columns: Name, Date of Birth, and Favorite Gift. Enter at least 5 friends' details.", answer: "" },
    ],
  },
  {
    topicId: "c5-xl-cells",
    image: c5ExcelWorkImg,
    theory: `**Selecting & Formatting Cells in Excel** makes your data look organized and easy to read.

🔲 **Selecting Cells & Ranges**:
• Click a single cell to select it
• Click and drag to select a range (like A1:C5)
• Hold Ctrl and click to select multiple non-adjacent cells
• Click a row number to select the entire row
• Click a column letter to select the entire column

🔤 **Changing Font & Size** – Select cells, then use the Home tab to change font name, size, color, and style (Bold, Italic, Underline).

📐 **Cell Alignment** – You can align text:
• Horizontally: Left, Center, Right
• Vertically: Top, Middle, Bottom
• Go to Home tab → Alignment group

🔲 **Adding Borders** – Select cells → Home → Borders button. Choose from Bottom Border, All Borders, Thick Box Border, etc.

🎨 **Cell Background Color** – Select cells → Home → Fill Color (paint bucket icon). Pick any color to highlight important cells.`,
    exercises: [
      { type: "fill-in-blank", question: "To select multiple non-adjacent cells, hold the ___ key and click.", answer: "ctrl" },
      { type: "fill-in-blank", question: "Cell alignment can be horizontal or ___.", answer: "vertical" },
      { type: "fill-in-blank", question: "The fill color button looks like a ___ icon.", answer: "paint bucket" },
      { type: "true-false", question: "You can select an entire row by clicking the row number.", answer: "True", options: ["True", "False"] },
      { type: "true-false", question: "Excel only allows left alignment for text.", answer: "False", options: ["True", "False"] },
      { type: "practice", question: "Create a mark sheet with subjects as rows and marks as a column. Apply bold formatting to headers, center-align all marks, and add borders to the entire table.", answer: "" },
    ],
  },
  {
    topicId: "c5-xl-edit",
    image: c5ExcelWorkImg,
    theory: `**Insert, Delete & Resize in Excel** helps you manage your spreadsheet structure.

➕ **Insert Rows & Columns**:
• Right-click a row number → Insert (adds a row above)
• Right-click a column letter → Insert (adds a column to the left)
• Or go to Home → Insert → Insert Sheet Rows/Columns

➖ **Delete Rows & Columns**:
• Right-click a row/column → Delete
• Or Home → Delete → Delete Sheet Rows/Columns

↔️ **Resize Rows & Columns**:
• Drag the border between column letters to change width
• Drag the border between row numbers to change height
• Double-click the border to auto-fit

🔗 **Merge Cells** – Select multiple cells → Home → Merge & Center. This combines cells into one large cell. Useful for headings.

📝 **Wrap Text** – When text is too long for a cell, use Home → Wrap Text so the text goes to the next line within the same cell instead of overflowing.`,
    exercises: [
      { type: "fill-in-blank", question: "To insert a row, right-click the row number and select ___.", answer: "insert" },
      { type: "fill-in-blank", question: "Merge & Center combines multiple cells into ___ large cell.", answer: "one" },
      { type: "fill-in-blank", question: "___ Text makes long text go to the next line within the same cell.", answer: "wrap" },
      { type: "true-false", question: "You can auto-fit column width by double-clicking the column border.", answer: "True", options: ["True", "False"] },
      { type: "true-false", question: "Deleting a row only removes the data, not the row itself.", answer: "False", options: ["True", "False"] },
      { type: "practice", question: "Create a monthly budget table. Use Merge & Center for the title. Insert a new row for a new expense. Apply Wrap Text to the description column.", answer: "" },
      { type: "practice", question: "Build a Sports Score Card with team names, match scores, and totals. Resize columns to fit all data. Use borders and colors to make it look neat.", answer: "" },
    ],
  },
  {
    topicId: "c5-scr",
    image: c5ScratchImg,
    theory: `**Scratch – Blocks, Operators & Variables** takes your coding to the next level!

🧱 **Control Blocks** (yellow/orange) control the flow of your program:
• **Wait** – pauses for a number of seconds
• **Repeat** – runs blocks inside it a set number of times
• **Forever** – runs blocks inside it non-stop
• **If...then** – runs blocks only if a condition is true
• **If...then...else** – runs different blocks based on a condition

👁️ **Sensing Blocks** (light blue) detect things:
• **Touching** – checks if sprite is touching something
• **Ask and wait** – asks a question and stores the answer
• **Mouse x/y** – gets the mouse position
• **Key pressed** – checks if a keyboard key is pressed

🔢 **Operator Blocks** (green) do math and logic:
• Addition (+), Subtraction (−), Multiplication (×), Division (÷)
• Greater than (>), Less than (<), Equal to (=)
• Join – combines two texts together
• Pick random – generates a random number

📦 **Creating Variables** – Variables store data like score, name, or lives. Go to Variables category → Make a Variable. Give it a name like "score".

🎮 **Using Variables in Games** – Use "set score to 0" at game start. Use "change score by 1" when player does something right. Show the variable on stage so players can see their score.

📡 **Broadcasting Messages** – Sprites can send messages to each other! Use "broadcast message" to send and "when I receive message" to listen. This helps sprites communicate and coordinate.`,
    exercises: [
      { type: "fill-in-blank", question: "The ___ block runs code inside it non-stop.", answer: "forever" },
      { type: "fill-in-blank", question: "Variables are used to store ___ like score or name.", answer: "data" },
      { type: "fill-in-blank", question: "The 'ask and wait' block is a ___ block.", answer: "sensing" },
      { type: "fill-in-blank", question: "To send a message to another sprite, use the ___ block.", answer: "broadcast" },
      { type: "true-false", question: "The 'If...then' block runs code only when a condition is true.", answer: "True", options: ["True", "False"] },
      { type: "true-false", question: "Operator blocks are colored light blue in Scratch.", answer: "False", options: ["True", "False"] },
      { type: "true-false", question: "You can create your own variables in Scratch.", answer: "True", options: ["True", "False"] },
      { type: "practice", question: "Create a simple counting game in Scratch. Add a variable called 'score'. When the sprite is clicked, change score by 1. Add a forever loop that makes the sprite move randomly.", answer: "" },
      { type: "practice", question: "Make a quiz game with 3 questions using 'ask and wait'. Use 'if...then' to check if the answer is correct. Keep score using a variable.", answer: "" },
    ],
  },
];

// Helper to get content for a specific topic
export const getTopicContent = (topicId: string): TopicContent | undefined => {
  return CLASS5_CONTENT.find((c) => c.topicId === topicId);
};
