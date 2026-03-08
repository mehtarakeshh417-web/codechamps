// Curriculum content for Classes 9-10
import type { TopicTextbook } from "./class5Content";

// ======================== CLASS 9: ADVANCED PYTHON ========================
const c9PythonAdv: TopicTextbook = {
  topicId: "c9-py-adv",
  topicTitle: "Advanced Python Programming",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Data Structures in Python",
      subtitle: "Lists, tuples, dictionaries and sets",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Python Data Structures",
          body: "Python provides powerful built-in data structures:\n\n📋 **Lists** — Ordered, mutable collections: `[1, 2, 3]`\n🔒 **Tuples** — Ordered, immutable collections: `(1, 2, 3)`\n📖 **Dictionaries** — Key-value pairs: `{'name': 'John', 'age': 15}`\n🎯 **Sets** — Unordered, unique elements: `{1, 2, 3}`\n\n**List Operations:**\n• `append()` — Add item to end\n• `insert()` — Add item at position\n• `remove()` — Remove first occurrence\n• `sort()` — Sort the list\n• `len()` — Get list length\n• List comprehensions: `[x*2 for x in range(5)]`",
          youtubeId: "kqtD5dpn9C8",
          tip: "Use lists for ordered collections, dictionaries for key-value data, sets for unique items, and tuples for fixed data."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is an ordered, immutable collection in Python.", answer: "tuple" },
        { type: "true-false", question: "Dictionaries store data as key-value pairs.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a Python program that stores student names and marks in a dictionary, then prints the student with the highest marks.", answer: "" },
      ]
    },
    {
      pageTitle: "Object-Oriented Programming",
      subtitle: "Classes, objects, and inheritance",
      bannerColor: "from-emerald-500 to-teal-500",
      sections: [
        {
          heading: "Introduction to OOP",
          body: "**Object-Oriented Programming (OOP)** organizes code into objects that contain both data and functions.\n\n**Key Concepts:**\n🏗️ **Class** — A blueprint for creating objects\n📦 **Object** — An instance of a class\n🔧 **Method** — A function inside a class\n📊 **Attribute** — A variable inside a class\n🧬 **Inheritance** — One class inherits from another\n\n**Example:**\n```python\nclass Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n    \n    def introduce(self):\n        print(f'Hi, I am {self.name}')\n\nstu = Student('Aarav', 'A')\nstu.introduce()\n```",
          funFact: "Python supports multiple inheritance — a class can inherit from more than one parent class!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A ___ is a blueprint for creating objects in Python.", answer: "class" },
        { type: "true-false", question: "The __init__ method is called automatically when an object is created.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a 'BankAccount' class with deposit() and withdraw() methods. Create two accounts and perform transactions.", answer: "" },
      ]
    },
    {
      pageTitle: "File Handling & Error Management",
      subtitle: "Reading, writing files and handling exceptions",
      bannerColor: "from-teal-500 to-cyan-500",
      sections: [
        {
          heading: "Working with Files",
          body: "Python can read and write files easily:\n\n**Opening Files:**\n```python\nfile = open('data.txt', 'r')  # Read mode\nfile = open('data.txt', 'w')  # Write mode\nfile = open('data.txt', 'a')  # Append mode\n```\n\n**Best Practice — Using 'with':**\n```python\nwith open('data.txt', 'r') as file:\n    content = file.read()\n    print(content)\n```\n\n**Error Handling:**\n```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Done')\n```",
          tip: "Always use 'with' statement for file operations — it automatically closes the file even if an error occurs."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The 'w' mode in file handling stands for ___ mode.", answer: "write" },
        { type: "true-false", question: "The 'finally' block runs regardless of whether an exception occurred.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write a Python program that reads a text file, counts the number of words, and writes the count to a new file.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 9: WEB DEVELOPMENT ========================
const c9WebDev: TopicTextbook = {
  topicId: "c9-web-dev",
  topicTitle: "Web Development with HTML, CSS & JavaScript",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Building Interactive Websites",
      subtitle: "Combining HTML, CSS, and JavaScript",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "The Web Development Stack",
          body: "Modern websites use three core technologies:\n\n🏗️ **HTML** — Structure (the skeleton)\n🎨 **CSS** — Styling (the appearance)\n⚡ **JavaScript** — Interactivity (the behavior)\n\n**How they work together:**\nHTML defines WHAT is on the page, CSS defines HOW it looks, and JavaScript makes it DO things.\n\n**JavaScript Basics:**\n```javascript\n// Variables\nlet name = 'CodeChamps';\nconst age = 10;\n\n// Functions\nfunction greet(user) {\n  return 'Hello, ' + user + '!';\n}\n\n// DOM Manipulation\ndocument.getElementById('btn').onclick = function() {\n  alert('Button clicked!');\n};\n```",
          youtubeId: "UB1O30fR-EE",
          funFact: "JavaScript was created in just 10 days by Brendan Eich in 1995!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "JavaScript is used to add ___ to websites.", answer: "interactivity" },
        { type: "true-false", question: "CSS defines the structure of a web page.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a web page with an input field and a button. When clicked, display a greeting message using the entered name.", answer: "" },
      ]
    },
    {
      pageTitle: "Responsive Design & CSS Frameworks",
      subtitle: "Making websites work on all devices",
      bannerColor: "from-indigo-500 to-purple-500",
      sections: [
        {
          heading: "Responsive Web Design",
          body: "**Responsive design** ensures websites look great on all screen sizes — phones, tablets, and desktops.\n\n**Key Techniques:**\n📱 **Media Queries** — Apply different styles based on screen size\n📐 **Flexbox** — Flexible layouts that adapt\n🔲 **CSS Grid** — Two-dimensional layout system\n📊 **Relative Units** — Use %, em, rem, vh, vw instead of fixed px\n\n**Media Query Example:**\n```css\n@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n    padding: 10px;\n  }\n}\n```\n\n**CSS Frameworks** like Bootstrap and Tailwind CSS provide ready-made responsive components.",
          tip: "Always design mobile-first — start with the smallest screen and add complexity for larger screens."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "CSS ___ allow applying styles based on screen size.", answer: "media queries" },
        { type: "true-false", question: "Flexbox is a two-dimensional layout system.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Create a responsive photo gallery that shows 1 column on mobile, 2 on tablet, and 3 on desktop using CSS Grid.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 9: SQL & DATABASES ========================
const c9SqlDb: TopicTextbook = {
  topicId: "c9-sql-db",
  topicTitle: "Introduction to Databases & SQL",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Understanding Databases",
      subtitle: "Organizing and managing data efficiently",
      bannerColor: "from-purple-500 to-violet-500",
      sections: [
        {
          heading: "What is a Database?",
          body: "A **database** is an organized collection of data stored electronically.\n\n**Types of Databases:**\n🗄️ **Relational (SQL)** — Data in tables with rows and columns (MySQL, PostgreSQL)\n📄 **NoSQL** — Flexible structure (MongoDB, Firebase)\n\n**SQL Basics:**\n```sql\n-- Create a table\nCREATE TABLE students (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  age INT,\n  grade CHAR(1)\n);\n\n-- Insert data\nINSERT INTO students VALUES (1, 'Aarav', 15, 'A');\n\n-- Query data\nSELECT * FROM students WHERE grade = 'A';\n\n-- Update data\nUPDATE students SET age = 16 WHERE id = 1;\n\n-- Delete data\nDELETE FROM students WHERE id = 1;\n```",
          youtubeId: "HXV3zeQKqGY",
          funFact: "The world's largest databases store petabytes of data — that's over 1 million gigabytes!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "SQL stands for Structured ___ Language.", answer: "query" },
        { type: "true-false", question: "In a relational database, data is stored in tables.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write SQL queries to create a 'library' table, insert 5 books, and query all books by a specific author.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 9: CYBERSECURITY ========================
const c9Cybersec: TopicTextbook = {
  topicId: "c9-cybersec",
  topicTitle: "Cybersecurity Basics",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Staying Safe Online",
      subtitle: "Understanding digital threats and protection",
      bannerColor: "from-orange-500 to-red-500",
      sections: [
        {
          heading: "Introduction to Cybersecurity",
          body: "**Cybersecurity** is the practice of protecting computers, networks, and data from digital attacks.\n\n**Common Threats:**\n🦠 **Malware** — Viruses, worms, trojans that damage your computer\n🎣 **Phishing** — Fake emails/websites that trick you into sharing passwords\n🔑 **Password Attacks** — Hackers trying to guess or crack your passwords\n🌐 **Man-in-the-Middle** — Intercepting communication between two parties\n💰 **Ransomware** — Encrypts your files and demands payment\n\n**Staying Safe:**\n🔒 Use strong, unique passwords (12+ characters, mix of types)\n🔐 Enable two-factor authentication (2FA)\n📧 Never click suspicious links in emails\n🔄 Keep software and systems updated\n🛡️ Use antivirus software\n📶 Avoid public WiFi for sensitive tasks",
          youtubeId: "inWWhr5tnEA",
          tip: "A strong password has at least 12 characters with uppercase, lowercase, numbers, and symbols. Use a password manager!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ attacks trick users into revealing passwords through fake websites.", answer: "phishing" },
        { type: "true-false", question: "Two-factor authentication adds an extra layer of security.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Create a presentation about the top 5 cybersecurity threats and how to protect against each one.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 9: DATA SCIENCE ========================
const c9DataSci: TopicTextbook = {
  topicId: "c9-data-sci",
  topicTitle: "Introduction to Data Science",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "What is Data Science?",
      subtitle: "Discovering insights from data",
      bannerColor: "from-pink-500 to-rose-500",
      sections: [
        {
          heading: "The World of Data Science",
          body: "**Data Science** combines statistics, programming, and domain knowledge to extract insights from data.\n\n**The Data Science Process:**\n1️⃣ **Collect** — Gather data from surveys, sensors, databases\n2️⃣ **Clean** — Fix errors, handle missing values\n3️⃣ **Analyze** — Find patterns using statistics\n4️⃣ **Visualize** — Create charts and graphs\n5️⃣ **Communicate** — Present findings clearly\n\n**Python Libraries for Data Science:**\n📊 **Pandas** — Data manipulation and analysis\n🔢 **NumPy** — Numerical computing\n📈 **Matplotlib** — Creating visualizations\n🤖 **Scikit-learn** — Machine learning\n\n**Real-World Applications:**\n• Netflix recommends shows based on your viewing history\n• Weather forecasting uses data patterns\n• Online shopping suggestions use purchase data",
          youtubeId: "ua-CiDNNj30",
          funFact: "Every day, the world generates 2.5 quintillion bytes of data — that's 2.5 followed by 18 zeros!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "The Python library ___ is used for data manipulation and analysis.", answer: "pandas" },
        { type: "true-false", question: "Data visualization helps communicate findings clearly.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Collect data about your class (heights, favorite subjects, etc.), create a simple chart, and present one interesting finding.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 10: PYTHON PROJECTS ========================
const c10PythonProjects: TopicTextbook = {
  topicId: "c10-py-projects",
  topicTitle: "Advanced Programming Projects",
  subjectColor: "neon-green",
  pages: [
    {
      pageTitle: "Building Real Projects",
      subtitle: "Apply your Python skills to real-world problems",
      bannerColor: "from-green-500 to-emerald-500",
      sections: [
        {
          heading: "Project-Based Learning",
          body: "The best way to learn programming is by building real projects!\n\n**Project Ideas:**\n🎮 **Game Development** — Build a text-based adventure game or quiz\n📊 **Data Analysis** — Analyze weather data, sports statistics\n🌐 **Web Scraping** — Extract information from websites\n🤖 **Chatbot** — Create an interactive conversational bot\n📱 **Automation** — Automate repetitive tasks\n\n**Project Structure:**\n```\nmy_project/\n├── main.py          # Main entry point\n├── utils.py         # Helper functions\n├── data/            # Data files\n├── tests/           # Test files\n└── README.md        # Documentation\n```\n\n**Best Practices:**\n• Write clean, readable code with comments\n• Break code into small functions\n• Test your code regularly\n• Use version control (Git)",
          youtubeId: "8ext9G7xspg",
          tip: "Start with a simple version of your project (MVP), then add features one by one."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "MVP stands for Minimum ___ Product.", answer: "viable" },
        { type: "true-false", question: "Breaking code into small functions makes it easier to debug.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Build a command-line to-do list application that can add, view, complete, and delete tasks. Save tasks to a file.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 10: WEB APPS ========================
const c10WebApps: TopicTextbook = {
  topicId: "c10-web-apps",
  topicTitle: "Web Applications",
  subjectColor: "neon-blue",
  pages: [
    {
      pageTitle: "Building Web Applications",
      subtitle: "From static pages to dynamic apps",
      bannerColor: "from-blue-500 to-indigo-500",
      sections: [
        {
          heading: "Web Application Architecture",
          body: "A **web application** is a dynamic website that responds to user actions.\n\n**Architecture:**\n🖥️ **Frontend** — What users see (HTML, CSS, JavaScript)\n⚙️ **Backend** — Server-side logic (Python, Node.js)\n🗄️ **Database** — Data storage (SQL, NoSQL)\n🔌 **API** — Communication between frontend and backend\n\n**How It Works:**\n1. User clicks a button (Frontend)\n2. Request is sent to server (API)\n3. Server processes the request (Backend)\n4. Data is fetched/stored (Database)\n5. Response is sent back (API)\n6. Page updates (Frontend)\n\n**Modern Tools:**\n⚛️ React — UI library for building interfaces\n🟢 Node.js — JavaScript on the server\n🐍 Flask/Django — Python web frameworks",
          youtubeId: "W6NZfCO5SIk",
          funFact: "Facebook started as a simple web application built in a college dorm room!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "An ___ connects the frontend to the backend of a web application.", answer: "api" },
        { type: "true-false", question: "The backend is what users directly see and interact with.", answer: "False", options: ["True", "False"] },
        { type: "practice", question: "Design a web application for your school — sketch the pages, list the features, and identify what data needs to be stored.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 10: AI FUNDAMENTALS ========================
const c10AiFund: TopicTextbook = {
  topicId: "c10-ai-fund",
  topicTitle: "Artificial Intelligence Fundamentals",
  subjectColor: "neon-pink",
  pages: [
    {
      pageTitle: "Understanding AI & Machine Learning",
      subtitle: "How machines learn and make decisions",
      bannerColor: "from-pink-500 to-purple-500",
      sections: [
        {
          heading: "AI, ML, and Deep Learning",
          body: "**Artificial Intelligence** encompasses multiple approaches:\n\n🤖 **AI** — Machines that can perform tasks requiring human intelligence\n📊 **Machine Learning (ML)** — AI that learns from data without being explicitly programmed\n🧠 **Deep Learning** — ML using neural networks inspired by the human brain\n\n**Types of Machine Learning:**\n📚 **Supervised Learning** — Learning from labeled examples (e.g., classifying emails as spam)\n🔍 **Unsupervised Learning** — Finding patterns in unlabeled data (e.g., customer grouping)\n🎮 **Reinforcement Learning** — Learning by trial and error (e.g., game-playing AI)\n\n**Real AI Applications:**\n• 🗣️ Voice assistants (Alexa, Siri)\n• 🚗 Self-driving cars\n• 🏥 Medical diagnosis\n• 🎵 Music recommendations\n• 📸 Face recognition\n• 🌍 Language translation",
          youtubeId: "JMUxmLyrhSk",
          funFact: "Google's AI can now write poetry, compose music, and even create new images that never existed before!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ learning uses labeled data to train models.", answer: "supervised" },
        { type: "true-false", question: "Deep learning uses neural networks inspired by the human brain.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Research an AI application in healthcare or education. Create a presentation explaining how it works and its impact.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 10: APP DEVELOPMENT ========================
const c10AppDev: TopicTextbook = {
  topicId: "c10-app-dev",
  topicTitle: "App Development Projects",
  subjectColor: "neon-orange",
  pages: [
    {
      pageTitle: "Mobile App Development",
      subtitle: "Building apps for smartphones and tablets",
      bannerColor: "from-orange-500 to-amber-500",
      sections: [
        {
          heading: "Creating Mobile Applications",
          body: "**Mobile app development** creates software for smartphones and tablets.\n\n**Development Approaches:**\n📱 **Native Apps** — Built for one platform (Swift for iOS, Kotlin for Android)\n🌐 **Web Apps** — Websites that work like apps in a browser\n🔄 **Hybrid Apps** — One codebase for multiple platforms (React Native, Flutter)\n\n**App Development Process:**\n1️⃣ **Idea** — What problem does your app solve?\n2️⃣ **Design** — Sketch screens and user flow\n3️⃣ **Develop** — Write the code\n4️⃣ **Test** — Find and fix bugs\n5️⃣ **Deploy** — Publish to app stores\n6️⃣ **Maintain** — Update and improve\n\n**Tools for Students:**\n🧱 MIT App Inventor — Visual block-based app building\n📱 Thunkable — Drag-and-drop app creation\n⚛️ React Native — JavaScript-based mobile apps",
          youtubeId: "aM2ktMKAunw",
          tip: "Start with MIT App Inventor to learn app concepts, then graduate to React Native for professional apps."
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "___ apps use one codebase for multiple platforms.", answer: "hybrid" },
        { type: "true-false", question: "MIT App Inventor uses block-based programming.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Design a school utility app — sketch 5 screens, list features, and build the main screen in App Inventor.", answer: "" },
      ]
    },
  ]
};

// ======================== CLASS 10: CAPSTONE ========================
const c10Capstone: TopicTextbook = {
  topicId: "c10-capstone",
  topicTitle: "Capstone Technology Project",
  subjectColor: "neon-purple",
  pages: [
    {
      pageTitle: "Your Capstone Project",
      subtitle: "Bringing everything together in one final project",
      bannerColor: "from-purple-500 to-indigo-500",
      sections: [
        {
          heading: "The Capstone Project",
          body: "A **capstone project** is a comprehensive project that demonstrates everything you've learned.\n\n**Project Requirements:**\n✅ Solve a real-world problem\n✅ Use at least 2 technologies you've learned\n✅ Include a user interface\n✅ Store and manage data\n✅ Document your work\n✅ Present your project\n\n**Capstone Project Ideas:**\n🏫 **School Management System** — Student records, attendance, grades\n🌱 **Environmental Monitor** — Track and visualize local weather/pollution data\n📚 **E-Library** — Digital book catalog with search and reviews\n🎮 **Educational Game** — Teaching tool for younger students\n💪 **Fitness Tracker** — Log workouts and track progress\n🗞️ **News Aggregator** — Collect and display news from multiple sources\n\n**Presentation Format:**\n1. Problem Statement\n2. Solution Overview\n3. Live Demo\n4. Technical Details\n5. Challenges & Learnings\n6. Future Improvements",
          youtubeId: "8ext9G7xspg",
          funFact: "Many successful startups began as student capstone projects — your project could be the next big thing!"
        }
      ],
      exercises: [
        { type: "fill-in-blank", question: "A capstone project demonstrates ___ you've learned throughout the course.", answer: "everything" },
        { type: "true-false", question: "A good capstone project should solve a real-world problem.", answer: "True", options: ["True", "False"] },
        { type: "practice", question: "Write a detailed project proposal: (1) Problem you're solving (2) Technologies you'll use (3) Features list (4) Timeline (5) How you'll present it.", answer: "" },
      ]
    },
  ]
};

// Export all Class 9-10 content
export const CLASS_9_10_TEXTBOOKS: TopicTextbook[] = [
  c9PythonAdv,
  c9WebDev,
  c9SqlDb,
  c9Cybersec,
  c9DataSci,
  c10PythonProjects,
  c10WebApps,
  c10AiFund,
  c10AppDev,
  c10Capstone,
];
