// Curriculum content for Classes 6-8
import c6Html from "@/assets/curriculum/c6-html-basics.jpg";
import c6Python from "@/assets/curriculum/c6-python-basics.jpg";
import c6Internet from "@/assets/curriculum/c6-internet.jpg";

import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 6: HTML BASICS ========================
const c6HtmlIntro: TopicTextbook = {
  topicId: "c6-html-intro",
  topicTitle: "Introduction to HTML",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "What is HTML?",
      subtitle: "The language of the web!",
      bannerImage: c6Html,
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Understanding HTML",
          body: "**HTML** stands for **HyperText Markup Language**. It's the language used to create web pages!\n\nEvery website you visit — Google, YouTube, Wikipedia — is built with HTML.\n\n**What HTML does:**\n📄 Defines the **structure** of a web page\n📝 Adds **text** (headings, paragraphs, lists)\n🖼️ Adds **images** and videos\n🔗 Creates **links** to other pages\n📊 Creates **tables** for organized data\n📋 Creates **forms** for user input\n\n**HTML uses tags** — special instructions wrapped in angle brackets:\n`<tagname>content</tagname>`\n\n**Example:**\n`<h1>Hello World!</h1>` — creates a big heading\n`<p>This is a paragraph.</p>` — creates a paragraph",
          youtubeId: "FG44xi1ujac",
          funFact: "HTML was invented by Tim Berners-Lee in 1991. He also invented the World Wide Web!"
        }
      ]
    },
    {
      pageTitle: "Basic HTML Structure",
      subtitle: "Every webpage starts here",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "The HTML Skeleton",
          body: "Every HTML page has this basic structure:\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page Title</title>\n</head>\n<body>\n  <h1>Welcome!</h1>\n  <p>This is my first webpage.</p>\n</body>\n</html>\n```\n\n**Breaking it down:**\n📜 `<!DOCTYPE html>` — tells the browser this is an HTML5 document\n🏠 `<html>` — the root element, wraps everything\n🧠 `<head>` — contains info ABOUT the page (title, styles) — not visible\n📖 `<title>` — the text shown in the browser tab\n📄 `<body>` — contains everything VISIBLE on the page\n🔚 Closing tags start with `/` — like `</html>`",
          tip: "Think of `<head>` as the brain (thinking but invisible) and `<body>` as the body (visible to everyone)!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "HTML stands for HyperText ___ Language.", answer: "markup" },
        { type: "fill-in-blank", question: "The content visible on a webpage goes inside the ___ tag.", answer: "body" },
        { type: "true-false", question: "The <head> section content is visible on the webpage.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Open the HTML editor. Create a basic HTML page with a title, a heading (h1), and two paragraphs about yourself. Click Run to see the preview!", answer: "" },
      ]
    },
    {
      pageTitle: "Headings and Paragraphs",
      subtitle: "Structuring your content",
      bannerColor: "from-cyan-500 to-blue-500",
      sections: [
        {
          heading: "Text Elements",
          body: "**Headings** — 6 levels, from biggest to smallest:\n`<h1>` — Main heading (use once per page)\n`<h2>` — Section heading\n`<h3>` — Sub-section\n`<h4>` — Sub-sub-section\n`<h5>` — Small heading\n`<h6>` — Smallest heading\n\n**Paragraphs:**\n`<p>This is a paragraph of text.</p>`\n\n**Line Breaks:**\n`<br>` — starts a new line (no closing tag needed!)\n\n**Horizontal Rule:**\n`<hr>` — draws a horizontal line across the page\n\n**Text Formatting:**\n`<b>bold text</b>` — **bold**\n`<i>italic text</i>` — *italic*\n`<u>underlined text</u>` — underlined\n`<strong>important</strong>` — **strong emphasis**\n`<em>emphasized</em>` — *emphasized*\n`<mark>highlighted</mark>` — highlighted text\n`<del>deleted</del>` — ~~strikethrough~~",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The largest heading tag is ___.", answer: "h1" },
        { type: "fill-in-blank", question: "The ___ tag creates a horizontal line.", answer: "hr" },
        { type: "true-false", question: "<br> needs a closing tag.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page about 'My School' using h1 for the title, h2 for sections (Location, Teachers, Subjects), paragraphs for descriptions, and bold/italic for emphasis.", answer: "" },
      ]
    },
    {
      pageTitle: "Lists and Links",
      subtitle: "Organizing content and connecting pages",
      bannerColor: "from-green-500 to-teal-500",
      sections: [
        {
          heading: "HTML Lists",
          body: "**Unordered List** (bullet points):\n```\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n```\n\n**Ordered List** (numbered):\n```\n<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>\n```\n\n**Links (Anchor tags):**\n```\n<a href=\"https://google.com\">Click here for Google</a>\n```\n\n`href` = the URL to link to\nThe text between tags is what users see and click\n\n**Open in new tab:**\n```\n<a href=\"https://google.com\" target=\"_blank\">Google</a>\n```",
          tip: "Always use `target=\"_blank\"` for external links so visitors don't leave your website!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The tag for an unordered (bullet) list is ___.", answer: "ul" },
        { type: "fill-in-blank", question: "Each list item uses the ___ tag.", answer: "li" },
        { type: "true-false", question: "The href attribute contains the URL for a link.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page with: an ordered list of your top 5 favorite things, an unordered list of your hobbies, and 3 links to your favorite websites.", answer: "" },
      ]
    },
    {
      pageTitle: "Images and Tables",
      subtitle: "Adding visuals and organizing data",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Images in HTML",
          body: "**Adding an image:**\n```\n<img src=\"photo.jpg\" alt=\"My Photo\" width=\"300\">\n```\n\n**Attributes:**\n• `src` — the image file path or URL\n• `alt` — description if image can't load (important for accessibility!)\n• `width` — image width in pixels\n• `height` — image height in pixels\n\n**HTML Tables:**\n```\n<table border=\"1\">\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Arjun</td>\n    <td>10</td>\n  </tr>\n</table>\n```\n\n**Table tags:**\n• `<table>` — creates the table\n• `<tr>` — table row\n• `<th>` — table header (bold, centered)\n• `<td>` — table data (regular cell)\n• `border` attribute adds visible borders",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ attribute provides alternative text for images.", answer: "alt" },
        { type: "fill-in-blank", question: "The ___ tag creates a table row.", answer: "tr" },
        { type: "practice", question: "Create an HTML page with a table showing your class timetable (5 columns for weekdays, rows for each period). Add an image at the top of the page.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Test your HTML knowledge!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        { heading: "Summary", body: "✅ HTML creates the structure of web pages\n✅ Basic structure: `<html>`, `<head>`, `<body>`\n✅ Headings: `<h1>` to `<h6>`\n✅ Paragraphs: `<p>`, Line breaks: `<br>`\n✅ Text formatting: `<b>`, `<i>`, `<u>`, `<strong>`\n✅ Lists: `<ul>` (bullets), `<ol>` (numbers), `<li>` (items)\n✅ Links: `<a href=\"...\">`\n✅ Images: `<img src=\"...\" alt=\"...\">`\n✅ Tables: `<table>`, `<tr>`, `<th>`, `<td>`" }
      ],
      exercises: [
        { type: "fill-in-blank", question: "HTML was invented by Tim Berners-___.", answer: "lee" },
        { type: "true-false", question: "Every HTML page needs a <body> tag.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a complete personal portfolio page with: your name as h1, an 'About Me' section with paragraph, a list of hobbies, a table of your subjects and marks, and links to interesting websites. Style it to look nice!", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: CSS BASICS ========================
const c6CssIntro: TopicTextbook = {
  topicId: "c6-css-intro",
  topicTitle: "Introduction to CSS",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "What is CSS?",
      subtitle: "Making HTML beautiful!",
      bannerColor: "from-purple-500 to-pink-500",
      sections: [
        {
          heading: "CSS — Cascading Style Sheets",
          body: "**CSS** controls how HTML elements LOOK — colors, fonts, sizes, spacing, layouts.\n\n**HTML = structure** (the skeleton)\n**CSS = style** (the clothing and makeup)\n\n**Three ways to add CSS:**\n\n1️⃣ **Inline** — directly on an element:\n`<p style=\"color: blue; font-size: 20px;\">Blue text</p>`\n\n2️⃣ **Internal** — in a `<style>` tag in `<head>`:\n```\n<style>\n  p { color: blue; font-size: 20px; }\n</style>\n```\n\n3️⃣ **External** — separate .css file (best practice):\n`<link rel=\"stylesheet\" href=\"style.css\">`\n\n**CSS Syntax:**\n```\nselector {\n  property: value;\n  property: value;\n}\n```\n\n**Example:**\n```\nh1 {\n  color: red;\n  font-size: 36px;\n  text-align: center;\n}\n```",
          tip: "External CSS is the best practice because you can style your entire website from one file!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CSS stands for Cascading ___ Sheets.", answer: "style" },
        { type: "true-false", question: "External CSS is the recommended way to add styles.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create an HTML page and add internal CSS to: make h1 red and centered, make paragraphs blue with 18px font, and give the body a light yellow background.", answer: "" },
      ]
    },
    {
      pageTitle: "Colors, Fonts & Backgrounds",
      subtitle: "The visual essentials",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "CSS Visual Properties",
          body: "**Colors:**\n• `color: red;` — text color (named colors)\n• `color: #FF0000;` — hex code\n• `color: rgb(255, 0, 0);` — RGB values\n• `background-color: yellow;` — background color\n\n**Fonts:**\n• `font-family: Arial, sans-serif;` — font name\n• `font-size: 16px;` — text size\n• `font-weight: bold;` — bold text\n• `font-style: italic;` — italic text\n• `text-decoration: underline;` — underline\n• `text-align: center;` — alignment\n• `text-transform: uppercase;` — ALL CAPS\n\n**Backgrounds:**\n• `background-color: #f0f0f0;` — solid color\n• `background-image: url('bg.jpg');` — image background\n• `background-size: cover;` — fill entire area\n\n**Spacing:**\n• `margin: 20px;` — space OUTSIDE the element\n• `padding: 15px;` — space INSIDE the element\n• `border: 2px solid black;` — border around element",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The CSS property for text color is ___.", answer: "color" },
        { type: "fill-in-blank", question: "___ adds space inside an element.", answer: "padding" },
        { type: "practice", question: "Style a personal profile page with: a colored header, custom fonts, background color, bordered sections, and different text colors for headings vs paragraphs.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: PYTHON BASICS ========================
const c6PythonIntro: TopicTextbook = {
  topicId: "c6-py-intro",
  topicTitle: "Introduction to Python Programming",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "What is Python?",
      subtitle: "The world's most popular programming language!",
      bannerImage: c6Python,
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "Welcome to Python!",
          body: "**Python** is a programming language that's easy to learn and incredibly powerful!\n\n**Why Python is great for beginners:**\n📖 Simple, readable syntax (looks like English)\n🚀 Used by Google, Netflix, Instagram, NASA\n🎮 Can make games, websites, AI, robots\n📊 Great for data science and math\n🤖 Powers artificial intelligence\n\n**What can you build with Python?**\n• Calculators and math tools\n• Text-based games and quizzes\n• Data analysis and charts\n• Web applications\n• AI and machine learning\n• Automation scripts",
          image: c6Python,
          funFact: "Python is named after the comedy show 'Monty Python's Flying Circus', NOT the snake! The creator, Guido van Rossum, was a fan of the show."
        }
      ]
    },
    {
      pageTitle: "Your First Python Program",
      subtitle: "Hello, World!",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "print() — Your First Command",
          body: "The `print()` function displays text on the screen.\n\n**Your first program:**\n```python\nprint(\"Hello, World!\")\n```\n\n**Output:** Hello, World!\n\n**More examples:**\n```python\nprint(\"My name is Arjun\")\nprint(\"I am 11 years old\")\nprint(\"I love coding!\")\nprint(2 + 3)  # Prints: 5\nprint(\"2 + 3 =\", 2 + 3)  # Prints: 2 + 3 = 5\n```\n\n**Important rules:**\n• Text (strings) must be in quotes: \"hello\" or 'hello'\n• Numbers don't need quotes: 42, 3.14\n• Python is **case-sensitive**: Print ≠ print\n• Use **#** for comments (notes the computer ignores)",
          tip: "Always use lowercase for print() — Python is case-sensitive, so Print() won't work!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ function displays text on the screen.", answer: "print" },
        { type: "true-false", question: "Python is case-sensitive.", answer: "True", options: ["True", "False"] },
        { type: "true-false", question: "Text strings must be enclosed in quotes.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the Python compiler. Write a program that prints: your name, your age, your school name, and the result of 15 × 7.", answer: "" },
      ]
    },
    {
      pageTitle: "Variables",
      subtitle: "Storing information in your programs",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "What are Variables?",
          body: "A **variable** stores a value with a name.\n\n```python\nname = \"Arjun\"\nage = 11\nheight = 4.5\nis_student = True\n\nprint(name)      # Arjun\nprint(age)       # 11\nprint(\"Hello,\", name)  # Hello, Arjun\n```\n\n**Variable types:**\n📝 **String** (str) — text: `\"hello\"`, `'world'`\n🔢 **Integer** (int) — whole numbers: `42`, `-7`\n🔢 **Float** — decimal numbers: `3.14`, `9.99`\n✅ **Boolean** (bool) — `True` or `False`\n\n**Naming rules:**\n✅ Can use letters, numbers, underscores\n✅ Must start with a letter or underscore\n❌ Cannot start with a number\n❌ No spaces (use underscores: `my_name`)\n❌ Case-sensitive: `Name` ≠ `name`",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ stores a value with a name.", answer: "variable" },
        { type: "fill-in-blank", question: "Decimal numbers are called ___ in Python.", answer: "float" },
        { type: "true-false", question: "Variable names can start with a number.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create variables for: your name, age, favorite subject, and marks percentage. Print them all in a formatted message like 'Hi, I'm [name], age [age], I scored [marks]% in [subject]'.", answer: "" },
      ]
    },
    {
      pageTitle: "Input from User",
      subtitle: "Making interactive programs!",
      bannerColor: "from-violet-500 to-purple-500",
      sections: [
        {
          heading: "The input() Function",
          body: "**input()** asks the user to type something:\n\n```python\nname = input(\"What is your name? \")\nprint(\"Hello,\", name + \"!\")\n```\n\n**Important:** input() always returns a **string**!\nTo use it as a number, convert it:\n\n```python\nage = int(input(\"Enter your age: \"))\nyear = 2025 - age\nprint(\"You were born in\", year)\n```\n\n**Conversions:**\n• `int()` — converts to integer\n• `float()` — converts to decimal\n• `str()` — converts to string\n\n**Example: Simple Calculator**\n```python\nnum1 = float(input(\"Enter first number: \"))\nnum2 = float(input(\"Enter second number: \"))\nresult = num1 + num2\nprint(\"Sum =\", result)\n```",
          tip: "Always convert input to int() or float() before doing math! input() gives you text, not numbers."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The ___ function gets text input from the user.", answer: "input" },
        { type: "fill-in-blank", question: "To convert a string to a whole number, use ___().", answer: "int" },
        { type: "practice", question: "Create a program that asks for the user's name, age, and favorite color. Then print a personalized message using all three inputs.", answer: "" },
      ]
    },
    {
      pageTitle: "If-Else Conditions",
      subtitle: "Making decisions in code",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Conditional Statements",
          body: "**if-else** lets your program make decisions!\n\n```python\nage = int(input(\"Enter your age: \"))\n\nif age >= 18:\n    print(\"You are an adult!\")\nelse:\n    print(\"You are a minor.\")\n```\n\n**Comparison operators:**\n• `==` equal to\n• `!=` not equal to\n• `>` greater than\n• `<` less than\n• `>=` greater than or equal\n• `<=` less than or equal\n\n**if-elif-else** for multiple conditions:\n```python\nmarks = int(input(\"Enter marks: \"))\n\nif marks >= 90:\n    print(\"Grade: A+\")\nelif marks >= 80:\n    print(\"Grade: A\")\nelif marks >= 70:\n    print(\"Grade: B\")\nelif marks >= 60:\n    print(\"Grade: C\")\nelse:\n    print(\"Grade: D\")\n```\n\n⚠️ **Python uses indentation** (spaces) instead of curly braces! Each block MUST be indented with 4 spaces.",
          tip: "Indentation is NOT optional in Python — it's how Python knows which code belongs to which if/else block!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword for 'else if' in Python is ___.", answer: "elif" },
        { type: "true-false", question: "Python uses indentation instead of curly braces for code blocks.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a grading program: ask the user for their marks (0-100) and print the grade (A+, A, B, C, D, F). Add a message for each grade like 'Excellent!' or 'Keep trying!'", answer: "" },
      ]
    },
    {
      pageTitle: "Loops",
      subtitle: "Repeating code efficiently",
      bannerColor: "from-teal-500 to-green-500",
      sections: [
        {
          heading: "for and while Loops",
          body: "**for loop** — repeat a specific number of times:\n```python\nfor i in range(5):\n    print(\"Hello!\", i)\n# Prints Hello! 0, Hello! 1, ... Hello! 4\n\nfor i in range(1, 11):\n    print(i, \"x 5 =\", i * 5)\n# Prints the 5 times table!\n```\n\n**while loop** — repeat while a condition is true:\n```python\ncount = 1\nwhile count <= 10:\n    print(count)\n    count = count + 1\n# Prints 1 to 10\n```\n\n**Useful with loops:**\n• `range(5)` → 0, 1, 2, 3, 4\n• `range(1, 6)` → 1, 2, 3, 4, 5\n• `range(0, 10, 2)` → 0, 2, 4, 6, 8\n• `break` — exit the loop early\n• `continue` — skip to next iteration",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "range(5) generates numbers from 0 to ___.", answer: "4" },
        { type: "true-false", question: "A while loop repeats as long as its condition is True.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write a program that prints the multiplication table of any number the user enters (1 to 10). Use a for loop.", answer: "" },
      ]
    },
    {
      pageTitle: "Chapter Review",
      subtitle: "Python basics mastered!",
      bannerColor: "from-green-500 to-blue-500",
      sections: [
        { heading: "Summary", body: "✅ `print()` displays output\n✅ Variables store data (str, int, float, bool)\n✅ `input()` gets user input\n✅ `if-elif-else` makes decisions\n✅ `for` and `while` loops repeat code\n✅ Python uses indentation for code blocks\n✅ Type conversion: `int()`, `float()`, `str()`" }
      ],
      exercises: [
        { type: "practice", question: "Create a number guessing game! The program picks a secret number (use any number). The user guesses until they get it right. After each guess, say 'Too high!' or 'Too low!'. Count and display the number of guesses.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 6: INTERNET ========================
const c6Internet: TopicTextbook = {
  topicId: "c6-net-intro",
  topicTitle: "Internet & Web Fundamentals",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is the Internet?",
      subtitle: "The world's biggest network!",
      bannerImage: c6Internet,
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Understanding the Internet",
          body: "The **Internet** is a global network that connects billions of computers and devices worldwide.\n\n**What can you do on the Internet?**\n🌐 Browse websites (World Wide Web)\n📧 Send and receive emails\n💬 Chat and video call\n📺 Watch videos (YouTube, Netflix)\n🎮 Play online games\n📚 Research and learn\n🛒 Shop online\n☁️ Store files in the cloud\n\n**Internet vs World Wide Web:**\n• **Internet** = the NETWORK (cables, routers, servers)\n• **WWW (Web)** = CONTENT on the internet (websites, pages)\n• The web runs ON the internet, but they're not the same!\n\n**How does it work?**\n1. You type a URL (web address)\n2. Your browser sends a REQUEST through the internet\n3. A SERVER (powerful computer) receives it\n4. The server sends back the WEBPAGE\n5. Your browser displays it!",
          image: c6Internet,
          funFact: "The internet started in 1969 as ARPANET, a US military project connecting just 4 computers! Today, over 5.4 billion people use the internet."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "WWW stands for World Wide ___.", answer: "web" },
        { type: "true-false", question: "The Internet and the World Wide Web are the same thing.", answer: "False", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Web Browsers & URLs",
      subtitle: "Navigating the web",
      bannerColor: "from-blue-500 to-cyan-500",
      sections: [
        {
          heading: "Browsers and Addresses",
          body: "**Web Browser** — software to view websites:\n🌐 Google Chrome (most popular)\n🦊 Mozilla Firefox\n🧭 Safari (Apple)\n🔵 Microsoft Edge\n\n**URL (Uniform Resource Locator)** — a website's address:\n`https://www.google.com`\n\n**Parts of a URL:**\n• `https://` — protocol (secure connection)\n• `www` — subdomain\n• `google` — domain name\n• `.com` — top-level domain (TLD)\n\n**Common TLDs:**\n• `.com` — commercial\n• `.org` — organization\n• `.edu` — education\n• `.gov` — government\n• `.in` — India\n• `.co.uk` — United Kingdom\n\n**Search Engines** — help you find websites:\n🔍 Google, Bing, Yahoo, DuckDuckGo",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "URL stands for Uniform Resource ___.", answer: "locator" },
        { type: "fill-in-blank", question: "The .edu domain is for ___ websites.", answer: "education" },
        { type: "true-false", question: "HTTPS means the connection is secure.", answer: "True", options: ["True", "False"] },
      ]
    },
    {
      pageTitle: "Internet Safety",
      subtitle: "Stay safe online!",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Online Safety Rules",
          body: "**The internet is powerful but can be dangerous. Follow these rules:**\n\n🔒 **Passwords:**\n• Use strong passwords (letters + numbers + symbols)\n• Never share your password\n• Use different passwords for different sites\n\n🚫 **Personal Information:**\n• NEVER share your address, phone number, or school name with strangers\n• Don't post photos with location information\n• Be careful what you share on social media\n\n👤 **Stranger Danger:**\n• Not everyone online is who they say they are\n• Never meet someone from the internet in person\n• Tell a trusted adult if someone makes you uncomfortable\n\n📧 **Email & Messages:**\n• Don't open emails from unknown senders\n• Don't click suspicious links\n• Don't download unknown files\n\n🛡️ **Cyberbullying:**\n• Be kind online — treat others as you want to be treated\n• If someone is mean to you, tell a trusted adult\n• Block and report bullies",
          tip: "A good rule: if you wouldn't say or do something in real life, don't do it online either!"
        }
      ],
      exercises: [
        { type: "true-false", question: "You should use the same password for all websites.", answer: "False", options: ["True", "False"] },
        { type: "true-false", question: "You should tell a trusted adult if someone online makes you uncomfortable.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a poster about 'Internet Safety' listing 10 rules for staying safe online. Use colorful headings and illustrations.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7: ADVANCED HTML/CSS ========================
const c7HtmlAdv: TopicTextbook = {
  topicId: "c7-html-adv",
  topicTitle: "Advanced HTML & CSS",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Forms in HTML",
      subtitle: "Collecting user input on web pages",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "HTML Forms",
          body: "**Forms** let users input data on web pages — like login forms, sign-up forms, and search bars.\n\n```html\n<form>\n  <label>Name:</label>\n  <input type=\"text\" placeholder=\"Enter name\">\n  <br><br>\n  <label>Email:</label>\n  <input type=\"email\" placeholder=\"Enter email\">\n  <br><br>\n  <label>Password:</label>\n  <input type=\"password\">\n  <br><br>\n  <input type=\"submit\" value=\"Submit\">\n</form>\n```\n\n**Input Types:**\n• `text` — regular text\n• `email` — email validation\n• `password` — hidden characters\n• `number` — only numbers\n• `date` — date picker\n• `checkbox` — tick boxes\n• `radio` — select one option\n• `submit` — submit button\n• `textarea` — multi-line text\n• `select` — dropdown menu",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The input type ___ hides the characters typed.", answer: "password" },
        { type: "practice", question: "Create a student registration form with: name, email, class (dropdown), section (radio buttons), hobbies (checkboxes), and a submit button. Style it with CSS.", answer: "" },
      ]
    },
    {
      pageTitle: "CSS Layout — Flexbox",
      subtitle: "Modern page layouts made easy!",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "Introduction to Flexbox",
          body: "**Flexbox** is a CSS layout system that makes arranging elements easy!\n\n```css\n.container {\n  display: flex;\n  justify-content: center;    /* horizontal alignment */\n  align-items: center;        /* vertical alignment */\n  gap: 20px;                  /* space between items */\n}\n```\n\n**justify-content options:**\n• `flex-start` — items at the start\n• `center` — items in the center\n• `flex-end` — items at the end\n• `space-between` — equal space between items\n• `space-around` — equal space around items\n\n**flex-direction:**\n• `row` — items in a horizontal line (default)\n• `column` — items in a vertical stack\n\n**flex-wrap:**\n• `wrap` — items wrap to next line if they don't fit\n• `nowrap` — items stay on one line (default)",
          tip: "Flexbox is the most important CSS skill for modern web design. Master it and you can build any layout!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "To use flexbox, set display to ___.", answer: "flex" },
        { type: "practice", question: "Create a navigation bar using flexbox: 4 links spread evenly across the top of the page. Add hover effects that change the background color.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 7-8: PYTHON ADVANCED ========================
const c7PythonAdv: TopicTextbook = {
  topicId: "c7-py-adv",
  topicTitle: "Python — Functions & Data Structures",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Functions",
      subtitle: "Reusable blocks of code!",
      bannerColor: "from-green-600 to-emerald-500",
      sections: [
        {
          heading: "Defining Functions",
          body: "**Functions** are reusable blocks of code with a name.\n\n```python\ndef greet(name):\n    print(\"Hello,\", name + \"!\")\n\ngreet(\"Arjun\")   # Hello, Arjun!\ngreet(\"Priya\")   # Hello, Priya!\n```\n\n**Function with return value:**\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result)  # 8\n```\n\n**Default parameters:**\n```python\ndef greet(name, greeting=\"Hello\"):\n    print(greeting + \",\", name)\n\ngreet(\"Arjun\")              # Hello, Arjun\ngreet(\"Priya\", \"Namaste\")  # Namaste, Priya\n```\n\n**Why use functions?**\n• Avoid repeating code\n• Organize your program\n• Make code easier to read\n• Easy to test and fix bugs",
          tip: "Name your functions with verbs that describe what they DO: calculate_area(), check_password(), display_menu()"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The keyword to create a function in Python is ___.", answer: "def" },
        { type: "fill-in-blank", question: "The ___ statement sends a value back from a function.", answer: "return" },
        { type: "practice", question: "Create functions for: calculate_area(length, width), calculate_perimeter(length, width), and is_even(number). Use them to make a simple geometry calculator.", answer: "" },
      ]
    },
    {
      pageTitle: "Lists",
      subtitle: "Storing collections of data",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Python Lists",
          body: "A **list** stores multiple values in order.\n\n```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\nmarks = [85, 92, 78, 95, 88]\nmixed = [\"hello\", 42, True, 3.14]\n\n# Accessing items (index starts at 0!)\nprint(fruits[0])    # apple\nprint(fruits[1])    # banana\nprint(fruits[-1])   # cherry (last item)\n\n# List operations\nfruits.append(\"mango\")     # add to end\nfruits.insert(1, \"grape\")  # insert at position\nfruits.remove(\"banana\")    # remove by value\nfruits.pop()               # remove last item\nlen(fruits)                # number of items\nfruits.sort()              # sort alphabetically\n```\n\n**Looping through a list:**\n```python\nfor fruit in fruits:\n    print(\"I like\", fruit)\n```",
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "List indexes start at ___.", answer: "0" },
        { type: "fill-in-blank", question: "The ___ method adds an item to the end of a list.", answer: "append" },
        { type: "practice", question: "Create a program that stores 5 student names in a list. Let the user add more names, remove names, and display all names sorted alphabetically.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 8: ADVANCED ========================
const c8JavaIntro: TopicTextbook = {
  topicId: "c8-java-intro",
  topicTitle: "Introduction to Java Programming",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "What is Java?",
      subtitle: "Write Once, Run Anywhere!",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Welcome to Java!",
          body: "**Java** is one of the most popular programming languages in the world!\n\n**Why learn Java?**\n☕ Powers billions of devices\n📱 Android apps are built with Java/Kotlin\n🏢 Used by banks, hospitals, and big companies\n🎮 Minecraft was built in Java!\n💼 One of the most in-demand skills\n\n**Java vs Python:**\n| Feature | Java | Python |\n|---------|------|--------|\n| Syntax | More strict | Simple |\n| Speed | Faster | Slower |\n| Typing | Static (declare types) | Dynamic |\n| Uses | Enterprise, Android | AI, Data, Web |\n\n**Your first Java program:**\n```java\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\nYes, it's longer than Python — but that structure makes large programs more organized!",
          funFact: "Java was created by James Gosling at Sun Microsystems in 1995. It was originally called 'Oak' after a tree outside his office!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "Java uses System.out.___ to print text.", answer: "println" },
        { type: "true-false", question: "Java requires you to declare variable types.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Open the Java compiler. Write a program that prints your name, class, and school name. Each should be on a separate line.", answer: "" },
      ]
    },
    {
      pageTitle: "Variables & Data Types in Java",
      subtitle: "Storing data with types",
      bannerColor: "from-red-500 to-pink-500",
      sections: [
        {
          heading: "Java Variables",
          body: "In Java, you MUST declare the type of each variable!\n\n```java\nString name = \"Arjun\";\nint age = 13;\ndouble height = 5.4;\nboolean isStudent = true;\nchar grade = 'A';\n\nSystem.out.println(\"Name: \" + name);\nSystem.out.println(\"Age: \" + age);\n```\n\n**Data Types:**\n📝 `String` — text (\"hello\")\n🔢 `int` — whole numbers (42)\n🔢 `double` — decimal numbers (3.14)\n✅ `boolean` — true/false\n🔤 `char` — single character ('A')\n🔢 `long` — very large numbers\n🔢 `float` — decimal (less precise than double)\n\n**Getting user input:**\n```java\nimport java.util.Scanner;\n\nScanner input = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = input.nextLine();\nSystem.out.print(\"Enter age: \");\nint age = input.nextInt();\n```",
          tip: "String starts with a capital S in Java! It's a class, not a primitive type."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "In Java, whole numbers use the ___ data type.", answer: "int" },
        { type: "fill-in-blank", question: "The ___ class is used for user input in Java.", answer: "scanner" },
        { type: "practice", question: "Write a Java program that asks for the user's name and age, calculates their birth year, and prints a greeting message.", answer: "" },
      ]
    },
  ]
};

// Export all Class 6-8 content
export const CLASS_6_8_TEXTBOOKS: TopicTextbook[] = [
  c6HtmlIntro,
  c6CssIntro,
  c6PythonIntro,
  c6Internet,
  c7HtmlAdv,
  c7PythonAdv,
  c8JavaIntro,
];
