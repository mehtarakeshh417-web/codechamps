// Curriculum content for Classes 1-2
import c1ComputerParts from "@/assets/curriculum/c1-computer-parts.jpg";
import c1PaintTools from "@/assets/curriculum/c1-paint-tools.jpg";
import c1ScratchJr from "@/assets/curriculum/c1-scratchjr.jpg";
import c2ComputerTypes from "@/assets/curriculum/c2-computer-types.jpg";

import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 1: COMPUTER BASICS ========================
const c1ComputerIntro: TopicTextbook = {
  topicId: "c1-it-intro",
  topicTitle: "Introduction to Computers",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is a Computer?",
      subtitle: "Let's learn about this amazing machine!",
      bannerImage: c1ComputerParts,
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Meet the Computer!",
          body: "A **computer** is an electronic machine that can:\n\n🖥️ **Store** information (like photos, games, and homework)\n🧮 **Calculate** numbers very fast\n🎮 **Play** games and videos\n✏️ **Help** us draw and write\n\nComputers are everywhere! They are in your school, your home, your parents' phones, and even in cars!\n\n**Think of a computer like a very smart helper** — you tell it what to do, and it does it for you!",
          youtubeId: "z9-yDaTwMHk",
          funFact: "The first computer was so big that it filled an entire room! Today, your phone is more powerful than that giant computer."
        }
      ]
    },
    {
      pageTitle: "Parts of a Computer",
      subtitle: "Getting to know each part",
      bannerImage: c1ComputerParts,
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "The Main Parts",
          body: "Every computer has these important parts:\n\n🖥️ **Monitor** — The screen where you see everything. It shows pictures, words, and videos. It looks like a TV!\n\n⌨️ **Keyboard** — Has letters, numbers, and special keys. You use it to type words and give commands.\n\n🖱️ **Mouse** — A small device you move on the desk. It has buttons to click and a wheel to scroll.\n\n🖥️ **CPU (Central Processing Unit)** — The \"brain\" of the computer. It thinks and processes everything! It's usually inside a big box.\n\n🔊 **Speakers** — Make sounds, music, and voices come out of the computer.",
          image: c1ComputerParts,
          youtubeId: "1UjWdtY8yx4",
          tip: "Remember: The CPU is the BRAIN, the Monitor is the EYES, the Keyboard is the MOUTH, and the Mouse is the HAND!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ is called the brain of the computer.", answer: "cpu" },
        { type: "fill-in-blank", question: "We use the ___ to type letters and numbers.", answer: "keyboard" },
        { type: "true-false", question: "The monitor is where we see pictures and words.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The mouse is used to type words.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Using a Mouse",
      subtitle: "Learn to click, double-click, and drag!",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "How to Hold the Mouse",
          body: "🖱️ Place your hand gently on top of the mouse.\n\n**Your fingers should be like this:**\n👆 **Index finger** (pointer finger) — rests on the **left button**\n👆 **Middle finger** — rests on the **right button**\n👍 **Thumb** — holds the side of the mouse\n\n**Mouse Actions:**\n\n🖱️ **Click** — Press the left button once, quickly. Used to select things.\n🖱️🖱️ **Double-click** — Press the left button twice, very fast. Used to open things.\n➡️ **Right-click** — Press the right button once. Shows a menu with options.\n✋ **Drag** — Hold down the left button while moving the mouse. Used to move things around.\n🔄 **Scroll** — Roll the wheel in the middle to move up and down on a page.",
          tip: "Practice clicking slowly at first. Once you get good, try double-clicking! It takes practice to be fast enough."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To open a folder, we ___ on it.", answer: "double-click" },
        { type: "fill-in-blank", question: "To select something, we ___ on it.", answer: "click" },
        { type: "true-false", question: "Right-clicking opens a menu with options.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Practice using the mouse: Open MS Paint, draw a circle using the mouse, fill it with your favorite color, and save your drawing!", answer: "" },
      ]
    },
    {
      pageTitle: "Using the Keyboard",
      subtitle: "Learn the keys and start typing!",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "Important Keys on the Keyboard",
          body: "The keyboard has many keys. Let's learn the most important ones:\n\n🔤 **Letter Keys** (A-Z) — Type letters to make words\n🔢 **Number Keys** (0-9) — Type numbers\n⬜ **Space Bar** — The longest key at the bottom. Makes a space between words.\n⏎ **Enter Key** — Goes to a new line, or says \"OK\" to the computer\n⬅️ **Backspace** — Deletes the letter BEFORE the cursor (goes backward)\n🔠 **Caps Lock** — Makes ALL letters CAPITAL when turned on\n⬆️ **Shift** — Hold it while pressing a letter to make ONE capital letter\n\n**Special Keys:**\n🔼 **Arrow Keys** — Move up, down, left, right\n⎋ **Escape (Esc)** — Cancels or closes something\n📋 **Tab** — Makes a big space (indent)",
          youtubeId: "n7LBLjnF_qs"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ key makes a space between words.", answer: "space bar" },
        { type: "fill-in-blank", question: "The ___ key deletes letters before the cursor.", answer: "backspace" },
        { type: "true-false", question: "Caps Lock makes all letters capital.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Word or a text editor. Type your full name, your school name, and your favorite color. Use Caps Lock for the headings and regular letters for the details.", answer: "" },
      ]
    },
    {
      pageTitle: "Starting and Shutting Down",
      subtitle: "How to turn the computer on and off safely",
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Turning On the Computer",
          body: "**To start the computer:**\n1. Press the **Power button** on the CPU box\n2. Press the **Power button** on the Monitor\n3. Wait for the computer to start up (this is called **booting**)\n4. The **Desktop** appears — this is your home screen!\n\n**The Desktop shows:**\n🖼️ **Icons** — Small pictures that represent programs\n📁 **Folders** — Where you keep your files organized\n📋 **Taskbar** — The bar at the bottom with the Start button\n🪟 **Start Button** — Click it to see all your programs",
        },
        {
          heading: "Shutting Down Safely",
          body: "**Never just press the power button to turn off!** This can hurt the computer.\n\n**The correct way to shut down:**\n1. Click the **Start button** (bottom-left corner)\n2. Click **Power** (the power icon)\n3. Click **Shut Down**\n4. Wait for the computer to turn off completely\n5. Then turn off the monitor\n\n**Other options:**\n😴 **Sleep** — Computer rests but doesn't fully turn off\n🔄 **Restart** — Turns off and turns back on (useful when something is stuck)\n\n⚠️ **Always save your work before shutting down!**",
          tip: "Think of Shut Down like going to sleep properly — you brush your teeth, change clothes, and then sleep. Don't just fall on the floor!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The process of turning on a computer is called ___.", answer: "booting" },
        { type: "fill-in-blank", question: "To shut down, first click the ___ button.", answer: "start" },
        { type: "true-false", question: "You should save your work before shutting down.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "You should always press the power button to turn off the computer.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Let's see what you learned!",
      bannerColor: "from-amber-500 to-orange-500",
      sections: [
        {
          heading: "Summary",
          body: "Great job! You learned about:\n\n✅ What a computer is and what it can do\n✅ The main parts: Monitor, Keyboard, Mouse, CPU, Speakers\n✅ How to use the mouse — click, double-click, right-click, drag\n✅ Important keyboard keys\n✅ How to start and safely shut down a computer\n\nYou're now ready to start using the computer! 🎉",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A computer can store, calculate, and ___ information.", answer: "process" },
        { type: "fill-in-blank", question: "The ___ is the brain of the computer.", answer: "cpu" },
        { type: "true-false", question: "The keyboard is used to point and click.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "Double-clicking opens a file or folder.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Turn on the computer. Open Paint. Draw a picture of a computer showing the monitor, keyboard, mouse, and CPU. Label each part. Save your drawing.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 1: PAINT ========================
const c1PaintStart: TopicTextbook = {
  topicId: "c1-paint-start",
  topicTitle: "Starting MS Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is MS Paint?",
      subtitle: "Your digital drawing canvas!",
      bannerImage: c1PaintTools,
      bannerColor: "from-orange-500 to-yellow-500",
      sections: [
        {
          heading: "Welcome to MS Paint!",
          body: "**MS Paint** is a drawing program that comes with every Windows computer. You can use it to:\n\n🎨 Draw pictures with pencils and brushes\n📏 Make shapes like circles, squares, and triangles\n🌈 Color your drawings with lots of colors\n✍️ Write text on your drawings\n💾 Save your artwork to show later!\n\n**How to Open MS Paint:**\n1. Click the **Start** button\n2. Type **Paint**\n3. Click on **Paint** app\n\nOr: Start → All Programs → Windows Accessories → Paint",
          image: c1PaintTools,
          youtubeId: "-2NuOZ1O1Gs"
        }
      ]
    },
    {
      pageTitle: "Parts of the Paint Window",
      subtitle: "Know your drawing tools!",
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "The Paint Interface",
          body: "When you open Paint, you see:\n\n🎨 **Drawing Area (Canvas)** — The big white area where you draw. This is your paper!\n\n🔧 **Tool Bar / Ribbon** — At the top. Has all the drawing tools like pencil, brush, shapes, colors.\n\n🎨 **Color Palette** — Shows all the colors you can use. Click a color to select it.\n\n📏 **Size Options** — Choose how thick your lines should be.\n\n📋 **Menu Bar** — File, Home, View menus at the very top.\n\n**The most important tools:**\n✏️ Pencil — draws thin lines\n🖌️ Brush — draws thick, artistic lines\n🪣 Fill — fills a shape with color\n🔤 Text — adds words to your drawing\n📐 Shapes — draws circles, squares, lines\n🧽 Eraser — removes mistakes",
          tip: "The Pencil tool is best for thin lines and details. The Brush tool is better for coloring large areas!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The big white area where you draw is called the ___.", answer: "canvas" },
        { type: "fill-in-blank", question: "The ___ tool fills a shape with color.", answer: "fill" },
        { type: "true-false", question: "The eraser tool removes mistakes from your drawing.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open MS Paint. Try each tool: draw a line with the Pencil, paint a stroke with the Brush, draw a shape, and use the Fill tool to color it.", answer: "" },
      ]
    },
    {
      pageTitle: "Drawing Shapes",
      subtitle: "Circles, squares, and more!",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "How to Draw Shapes",
          body: "**Steps to draw a shape:**\n1. Click the **Shapes** button in the toolbar\n2. Choose a shape (rectangle, oval, line, triangle, etc.)\n3. Click and drag on the canvas to draw it!\n\n**Shape tips:**\n⬛ **Rectangle** — click and drag to make a box\n⭕ **Oval** — click and drag to make a circle (hold Shift for perfect circle!)\n📐 **Triangle** — use the polygon tool\n➖ **Line** — draw straight lines\n⭐ **Star** — make star shapes\n\n**Outline vs Filled:**\n• **Outline** — only the border of the shape\n• **Filled** — the shape is colored inside\n• **No outline** — only the fill, no border",
          youtubeId: "4ZDt8KRo6vE"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Hold the ___ key while dragging to make a perfect circle.", answer: "shift" },
        { type: "true-false", question: "You can draw both outline and filled shapes in Paint.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a house using shapes: a rectangle for the body, a triangle for the roof, small squares for windows, and a rectangle for the door. Color everything using the Fill tool.", answer: "" },
      ]
    },
    {
      pageTitle: "Coloring Your Drawings",
      subtitle: "Make your art colorful!",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "Using Colors",
          body: "**How to choose a color:**\n1. Look at the **Color Palette** at the top\n2. **Click a color** to select it (this becomes your drawing color)\n3. Start drawing — everything will be in that color!\n\n**Color 1 vs Color 2:**\n🎨 **Color 1** (left-click color) — the main drawing color\n🎨 **Color 2** (right-click color) — the background/secondary color\n\n**Fill with Color (Paint Bucket):**\n1. Click the **Fill** tool (paint bucket icon)\n2. Click inside any closed shape\n3. The shape fills with Color 1!\n\n**Edit Colors:**\n• Click **Edit Colors** to see ALL possible colors\n• You can create custom colors by mixing!\n\n⚠️ **Important:** The Fill tool only works inside **closed shapes**. If there's even a tiny gap, color will leak everywhere!",
          tip: "If color leaks when you fill, press Ctrl+Z to undo, zoom in to find the gap, close it with the Pencil tool, then try filling again."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool fills a closed shape with color.", answer: "fill" },
        { type: "true-false", question: "Color 1 is the main drawing color.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "The Fill tool works even if the shape has gaps.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Draw a rainbow! Draw 7 curved lines (arcs) and fill each with a rainbow color: Red, Orange, Yellow, Green, Blue, Indigo, Violet.", answer: "" },
      ]
    },
    {
      pageTitle: "Saving Your Art",
      subtitle: "Keep your drawings forever!",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "How to Save",
          body: "**Saving your drawing:**\n1. Click **File** → **Save As**\n2. Choose where to save (Desktop, Documents, etc.)\n3. Type a **name** for your file (like 'My House Drawing')\n4. Click **Save**!\n\n**File formats:**\n🖼️ **PNG** — best quality, keeps transparency\n🖼️ **JPEG/JPG** — smaller file size, good for photos\n🖼️ **BMP** — Paint's original format, very large files\n🖼️ **GIF** — small size, limited colors\n\n**Quick Save:** Press **Ctrl+S** to save quickly (uses the same name and location)\n\n**Save vs Save As:**\n• **Save** — saves over the existing file\n• **Save As** — lets you choose a new name or location",
          tip: "Always save your work often! Press Ctrl+S every few minutes so you don't lose anything."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyboard shortcut to save is Ctrl+___.", answer: "s" },
        { type: "fill-in-blank", question: "The best quality image format is ___.", answer: "png" },
        { type: "true-false", question: "Save As lets you choose a new name for your file.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a drawing of your favorite animal. Color it beautifully. Save it as a PNG file on the Desktop with your name as the filename.", answer: "" },
      ]
    },
  ]
};

const c1PaintShapes: TopicTextbook = {
  topicId: "c1-paint-shapes",
  topicTitle: "Drawing Shapes in Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Basic Shapes",
      subtitle: "Learn to draw perfect shapes!",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Drawing Lines and Rectangles",
          body: "**Drawing a Line:**\n1. Select the **Line** tool\n2. Choose a thickness\n3. Click where you want the line to start\n4. Drag to where you want it to end\n5. Release!\n\n**Drawing a Rectangle:**\n1. Select the **Rectangle** tool\n2. Click and drag on the canvas\n3. A rectangle appears!\n4. Hold **Shift** to make a perfect square\n\n**Drawing an Oval/Circle:**\n1. Select the **Oval** tool\n2. Click and drag\n3. Hold **Shift** for a perfect circle",
          youtubeId: "Xn7Ac-ujT9A"
        }
      ],
      exercises: [
        { type: "true-false", question: "Holding Shift while drawing an oval makes a perfect circle.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Draw a traffic light: 3 circles (red, yellow, green) inside a tall rectangle. Color each circle with the correct color.", answer: "" },
      ]
    },
    {
      pageTitle: "Using Freeform Tools",
      subtitle: "Draw anything you can imagine!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Pencil and Brush Drawing",
          body: "**Pencil Tool:**\n• Makes thin, precise lines\n• Great for details and outlines\n• Click and hold while moving the mouse\n\n**Brush Tool:**\n• Makes thicker, more artistic strokes\n• You can choose different brush styles:\n  - Round brush\n  - Square brush\n  - Calligraphy brush\n  - Oil brush\n\n**Eraser Tool:**\n• Removes anything you've drawn\n• You can change the eraser size\n• Right-click with eraser to erase only Color 1\n\n**Tip:** Zoom in (View → Zoom In) to draw small details more easily!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool makes thin, precise lines.", answer: "pencil" },
        { type: "practice", question: "Draw your favorite cartoon character using the Pencil tool for outlines and the Fill tool for colors. Try to add small details by zooming in.", answer: "" },
      ]
    },
    {
      pageTitle: "Art Projects",
      subtitle: "Put your skills to the test!",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "Creative Drawing Projects",
          body: "Now that you know all the tools, try these fun projects:\n\n🏠 **Project 1: My Dream House**\nDraw a house with windows, a door, a roof, trees, sun, and clouds. Use shapes for the building and freeform for decorations.\n\n🌳 **Project 2: Nature Scene**\nDraw a garden with flowers, trees, butterflies, and a bright sun. Use lots of colors!\n\n🐱 **Project 3: My Favorite Animal**\nDraw your favorite animal. Try to use circles for the head and body, and lines for legs and whiskers.\n\n🌈 **Project 4: Rainbow Art**\nDraw a beautiful rainbow over mountains with clouds. Fill each band with the correct color.",
        }
      ],
      exercises: [
        { type: "practice", question: "Choose one of the 4 projects above and create it in MS Paint. Save it as a PNG file. Try to use at least 5 different colors and 3 different tools.", answer: "" },
      ]
    },
  ]
};

const c1PaintColor: TopicTextbook = {
  topicId: "c1-paint-color",
  topicTitle: "Coloring in Paint",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Color Theory for Kids",
      subtitle: "Understanding colors!",
      bannerColor: "from-yellow-500 to-orange-500",
      sections: [
        {
          heading: "Primary and Secondary Colors",
          body: "**Primary Colors** — These are the 3 main colors that can't be made by mixing:\n🔴 **Red**\n🔵 **Blue**\n🟡 **Yellow**\n\n**Secondary Colors** — Made by mixing two primary colors:\n🟠 **Orange** = Red + Yellow\n🟢 **Green** = Blue + Yellow\n🟣 **Purple** = Red + Blue\n\n**In MS Paint:**\n• Find these colors in the Color Palette\n• Use **Edit Colors** to create custom colors\n• Mix colors using the Custom Color picker!",
          funFact: "A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, Violet — remember it as ROY G. BIV!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Red + Yellow = ___", answer: "orange" },
        { type: "fill-in-blank", question: "Blue + Yellow = ___", answer: "green" },
        { type: "true-false", question: "Purple is a primary color.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "In Paint, draw 3 large circles. Fill them with the primary colors (Red, Blue, Yellow). Then draw 3 more circles and fill with secondary colors you create using Edit Colors.", answer: "" },
      ]
    },
    {
      pageTitle: "Coloring Techniques",
      subtitle: "Fill, spray, and blend!",
      bannerColor: "from-green-500 to-cyan-500",
      sections: [
        {
          heading: "Advanced Coloring",
          body: "**Fill Tool (Paint Bucket):**\nThe fastest way to color large areas. Just click inside a closed shape!\n\n**Airbrush Effect:**\nUse the Brush tool with a spray pattern for a softer, gradient-like effect.\n\n**Color Picker (Eyedropper):**\n1. Click the **Color Picker** tool\n2. Click on any color in your drawing\n3. That color is now selected!\n4. Great for matching colors!\n\n**Tips for Beautiful Colors:**\n• Use light colors for backgrounds\n• Use dark colors for outlines\n• Don't use too many bright colors together\n• Try different shades of the same color for depth",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ tool picks a color from your drawing.", answer: "color picker" },
        { type: "practice", question: "Draw a colorful garden scene. Use at least 8 different colors. Use the Fill tool for large areas and the Brush for small details. Save your artwork.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 1: SCRATCH JR ========================
const c1ScratchWork: TopicTextbook = {
  topicId: "c1-scratch-work",
  topicTitle: "Working on Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "What is Scratch Jr?",
      subtitle: "Your first coding adventure!",
      bannerImage: c1ScratchJr,
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Welcome to Scratch Jr!",
          body: "**Scratch Jr** is a coding language made just for kids aged 5-7! With Scratch Jr, you can:\n\n🎮 Make characters **move** and **dance**\n🗣️ Make characters **talk** and **say things**\n🎨 **Draw** your own characters\n📖 Create **animated stories**\n🎵 Add **sounds** to your projects\n\nThe best part? You code by **dragging colorful blocks** — no typing needed!\n\n**Coding** means telling the computer what to do, step by step. It's like giving instructions to a robot!",
          image: c1ScratchJr,
          funFact: "Scratch Jr was created at MIT, one of the most famous universities in the world!"
        }
      ]
    },
    {
      pageTitle: "The Scratch Jr Screen",
      subtitle: "Know your workspace",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Parts of Scratch Jr",
          body: "When you open Scratch Jr, you see:\n\n🎬 **Stage** — The big area at the top where your characters perform. This is like a theater stage!\n\n🐱 **Sprites** — The characters in your project. The default sprite is a cat. You can add more!\n\n🧱 **Block Palette** — The colored blocks at the bottom. These are your coding instructions.\n\n📜 **Scripts Area** — Where you drag blocks to build your code.\n\n🎨 **Paint Editor** — Draw and customize your own characters!\n\n**Block Colors:**\n🟡 Yellow — Trigger blocks (start events)\n🔵 Blue — Motion blocks (make things move)\n🟣 Purple — Looks blocks (change appearance)\n🟢 Green — Sound blocks\n🟠 Orange — Control blocks (wait, repeat)\n🔴 Red — End blocks",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The characters in Scratch Jr are called ___.", answer: "sprites" },
        { type: "fill-in-blank", question: "The big area where characters perform is the ___.", answer: "stage" },
        { type: "true-false", question: "Blue blocks are for making things move.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open Scratch Jr. Find and identify all the parts: Stage, Sprites, Block Palette, and Scripts Area. Add a new sprite from the library.", answer: "" },
      ]
    },
    {
      pageTitle: "Making Sprites Move",
      subtitle: "Your first code!",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Motion Blocks",
          body: "Let's make the cat walk!\n\n**Step 1:** Drag the **Green Flag** block (yellow) to the scripts area — this starts your program.\n\n**Step 2:** Connect a **Move Right** block (blue arrow pointing right)\n\n**Step 3:** Tap the Green Flag on the stage — the cat moves right!\n\n**More Motion Blocks:**\n➡️ **Move Right** — sprite moves right\n⬅️ **Move Left** — sprite moves left\n⬆️ **Move Up** — sprite moves up\n⬇️ **Move Down** — sprite moves down\n🔄 **Turn Right** — sprite rotates clockwise\n🔄 **Turn Left** — sprite rotates counter-clockwise\n↩️ **Go Home** — sprite goes back to starting position",
          tip: "You can change the number inside each block to control HOW FAR the sprite moves! Bigger number = moves more."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ flag starts the program in Scratch Jr.", answer: "green" },
        { type: "true-false", question: "You can change how far a sprite moves by changing the number in the block.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make the cat walk to the right side of the screen, then walk back to the left. Try making it go up and down too!", answer: "" },
      ]
    },
    {
      pageTitle: "Adding Text and Speech",
      subtitle: "Make sprites talk!",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "Say and Think Blocks",
          body: "You can make your sprite say things!\n\n💬 **Say Block** (Purple) — Shows a speech bubble with text above the sprite\n💭 **Think Block** — Shows a thought bubble\n\n**How to add text:**\n1. Drag a **Say** block to your script\n2. Tap the block to type what the sprite should say\n3. Connect it after a Green Flag block\n4. Run your program!\n\n**Make a Conversation:**\nYou can make two sprites talk to each other by using:\n- Say blocks on Sprite 1\n- Wait blocks between them\n- Say blocks on Sprite 2",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block shows a speech bubble above the sprite.", answer: "say" },
        { type: "practice", question: "Create a short story with 2 sprites talking to each other. Use Say blocks and Wait blocks to make it look like a real conversation!", answer: "" },
      ]
    },
    {
      pageTitle: "Backgrounds and Characters",
      subtitle: "Customize your world!",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "Changing Backgrounds",
          body: "**Adding a Background:**\n1. Tap the **background button** (landscape icon at top)\n2. Choose from the library (park, beach, city, space, etc.)\n3. Or draw your own background!\n\n**Adding New Characters:**\n1. Tap the **+** button (add sprite)\n2. Choose from the library (animals, people, things)\n3. Or draw your own character using the Paint Editor!\n\n**The Paint Editor lets you:**\n✏️ Draw with different colors\n🔄 Use stamps and stickers\n🧽 Erase parts\n📏 Add shapes\n🎨 Fill with color",
        }
      ],
      exercises: [
        { type: "practice", question: "Create a scene with a beach background, add a crab sprite and a fish sprite. Make them move around and say 'Hello!' to each other.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "You're a Scratch Jr coder now!",
      bannerColor: "from-yellow-500 to-green-500",
      sections: [
        {
          heading: "What You Learned",
          body: "🎉 Congratulations! You learned:\n\n✅ What Scratch Jr is and why it's fun\n✅ Parts of the Scratch Jr screen\n✅ How to make sprites move with Motion blocks\n✅ How to make sprites talk with Say blocks\n✅ How to add backgrounds and new characters\n\nYou're ready to create your own animated stories and games!",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Sprites are the ___ in your Scratch Jr project.", answer: "characters" },
        { type: "true-false", question: "You can draw your own sprites in Scratch Jr.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create your own short animated story! Use at least 2 characters, a custom background, movement blocks, and speech bubbles. Make it at least 10 seconds long!", answer: "" },
      ]
    },
  ]
};

const c1ScratchComp: TopicTextbook = {
  topicId: "c1-scratch-comp",
  topicTitle: "Scratch Jr Components",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Understanding Components", subtitle: "The building blocks of Scratch Jr", bannerColor: "from-green-500 to-teal-500",
      sections: [{ heading: "Stage, Palette, and Scripts", body: "Let's learn more about each part:\n\n🎬 **Stage Area:**\n• Where your project comes to life\n• Has a grid to help position sprites\n• Can have different backgrounds\n• Full-screen mode available!\n\n🧱 **Block Palette:**\n• Organized by color categories\n• Drag blocks from here to Scripts Area\n• Each color = different type of action\n\n📜 **Scripts Area:**\n• Where you build your programs\n• Connect blocks like puzzle pieces\n• Each sprite has its own scripts\n• Green Flag starts all scripts", tip: "Tap on a block in the palette to see a quick preview of what it does!" }],
      exercises: [
        { type: "fill-in-blank", question: "Each sprite has its own ___.", answer: "scripts" },
        { type: "true-false", question: "All sprites share the same scripts.", answer: "False", options: ["True", "False"] },
      ]
    },
    { pageTitle: "Sprite List", subtitle: "Managing your characters", bannerColor: "from-teal-500 to-cyan-500",
      sections: [{ heading: "Working with Multiple Sprites", body: "**The Sprite List** shows all characters in your project.\n\n**How to manage sprites:**\n👆 **Tap a sprite** to select it and edit its scripts\n➕ **Plus button** to add a new sprite\n🗑️ **Long press** on a sprite to delete it\n📋 **Copy** a sprite by dragging it to the + button\n\n**Each sprite has:**\n• Its own **scripts** (programs)\n• Its own **costumes** (appearances)\n• Its own **position** on the stage\n\n**Tip:** When you add scripts, make sure you've selected the RIGHT sprite first!", funFact: "You can have up to 10 sprites in one Scratch Jr project!" }],
      exercises: [
        { type: "practice", question: "Create a project with 3 different animal sprites. Give each one a different movement pattern — one goes right, one goes up, one spins!", answer: "" },
      ]
    },
  ]
};

const c1ScratchText: TopicTextbook = {
  topicId: "c1-scratch-text",
  topicTitle: "Adding Text in Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Text on Stage", subtitle: "Adding words to your projects", bannerColor: "from-emerald-500 to-green-500",
      sections: [{ heading: "Adding Text", body: "You can add text directly to the stage!\n\n**How to add text:**\n1. Tap the **Text** button (T icon)\n2. Tap on the stage where you want the text\n3. Type your message using the keyboard\n4. Choose a **color** for your text\n5. Tap ✓ to confirm\n\n**Uses for text:**\n📖 Story titles\n🏷️ Character names\n📢 Instructions for the player\n🎬 Scene descriptions\n\n**Tips:**\n• Keep text short — long text doesn't fit well\n• Use bright colors on dark backgrounds\n• Use dark colors on light backgrounds", tip: "Add a title page to every project — it looks more professional!" }],
      exercises: [
        { type: "practice", question: "Create a title screen for a story. Add your name, a title, and tap 'Start' text. Add a colorful background.", answer: "" },
      ]
    },
  ]
};

const c1ScratchChar: TopicTextbook = {
  topicId: "c1-scratch-char",
  topicTitle: "Characters & Backgrounds",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "Creating Characters", subtitle: "Design your own sprites!", bannerColor: "from-green-500 to-lime-500",
      sections: [{ heading: "The Character Library", body: "Scratch Jr has a library of ready-made characters:\n\n🐱 **Animals** — cat, dog, fish, bird, butterfly\n👦 **People** — boy, girl, dancer\n🚗 **Things** — car, ball, star, sun\n🌳 **Nature** — tree, flower, cloud\n\n**Drawing Your Own:**\n1. Tap + (add sprite)\n2. Tap the **paintbrush** icon\n3. Use drawing tools to create!\n4. You can draw anything you imagine\n\n**Adding Backgrounds:**\n1. Tap the background icon (top)\n2. Choose from library OR draw your own\n3. Available scenes: park, beach, city, forest, space, underwater" }],
      exercises: [
        { type: "fill-in-blank", question: "You can ___ your own characters using the paintbrush.", answer: "draw" },
        { type: "practice", question: "Draw a custom character (your pet or a made-up creature). Place it in a background scene and make it move around the stage.", answer: "" },
      ]
    },
    { pageTitle: "Multiple Pages", subtitle: "Create multi-page stories!", bannerColor: "from-lime-500 to-yellow-500",
      sections: [{ heading: "Pages in Scratch Jr", body: "Scratch Jr supports **multiple pages** — like pages in a book!\n\n**How to add pages:**\n1. Look at the **page icons** at the right side\n2. Tap the **+** to add a new page\n3. Each page can have different sprites and backgrounds!\n\n**Switching pages in code:**\nUse the **Go to Page** block (red block with page number)\n\n**Example Story:**\n📖 Page 1: Title page with your story name\n📖 Page 2: Character walks to a door\n📖 Page 3: Character enters a magical forest\n📖 Page 4: The End!\n\nThis lets you create stories with different scenes, like chapters in a book!", tip: "Plan your story on paper first! Draw a storyboard with what happens on each page." }],
      exercises: [
        { type: "true-false", question: "Each page in Scratch Jr can have different backgrounds.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 3-page story: Page 1 is the title, Page 2 is the main scene with character movement, Page 3 says 'The End!' with a fun animation.", answer: "" },
      ]
    },
  ]
};

const c1ScratchMove: TopicTextbook = {
  topicId: "c1-scratch-move",
  topicTitle: "Moving Sprites in Scratch Jr",
  subjectColor: "neon-green",
  pages: [
    { pageTitle: "All Motion Blocks", subtitle: "Every way to make sprites move!", bannerColor: "from-blue-500 to-indigo-500",
      sections: [{ heading: "Motion Block Reference", body: "Here's every motion block you can use:\n\n➡️ **Move Right** — moves sprite right (number = steps)\n⬅️ **Move Left** — moves sprite left\n⬆️ **Move Up** — moves sprite up\n⬇️ **Move Down** — moves sprite down\n🔃 **Turn Right** — rotates clockwise\n🔄 **Turn Left** — rotates counter-clockwise\n⤵️ **Hop** — sprite jumps up and comes back down\n↩️ **Go Home** — returns to starting position\n\n**Combining blocks:**\nConnect multiple blocks for complex movements!\nExample: Move Right → Move Up → Turn Right → Hop = sprite walks right, goes up, turns, and jumps!", youtubeId: "E19zGN8fA90" }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block makes a sprite jump up and come back down.", answer: "hop" },
        { type: "practice", question: "Create a dance routine for the cat! Use at least 6 different motion blocks to make it move right, jump, spin, go up, and come back home.", answer: "" },
      ]
    },
    { pageTitle: "Repeat and Speed", subtitle: "Loops make life easier!", bannerColor: "from-indigo-500 to-purple-500",
      sections: [{ heading: "Using Repeat Blocks", body: "What if you want the cat to walk 10 steps? Instead of adding 10 Move Right blocks, use **Repeat**!\n\n🔁 **Repeat Block** (Orange):\n1. Drag the Repeat block to your script\n2. Put the blocks you want to repeat INSIDE it\n3. Set the number (how many times)\n4. Run!\n\n**Example:**\nRepeat 5: Move Right + Hop\n= sprite walks and hops 5 times!\n\n**Speed Block:**\n⏩ **Speed** — controls how fast the sprite moves\n• Slow, Medium, Fast\n• Use slow for dramatic moments\n• Use fast for action scenes!", tip: "The Repeat block is your best friend! It saves time and makes your code shorter and neater." }],
      exercises: [
        { type: "fill-in-blank", question: "The ___ block makes code run multiple times.", answer: "repeat" },
        { type: "true-false", question: "Repeat blocks save time by running the same code many times.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Make a sprite walk across the entire stage using a Repeat block. Then make it walk back using another Repeat block. Add a hop at each end!", answer: "" },
      ]
    },
  ]
};

// Export all Class 1-2 content
export const CLASS_1_2_TEXTBOOKS: TopicTextbook[] = [
  c1ComputerIntro,
  c1PaintStart,
  c1PaintShapes,
  c1PaintColor,
  c1ScratchWork,
  c1ScratchComp,
  c1ScratchText,
  c1ScratchChar,
  c1ScratchMove,
];
