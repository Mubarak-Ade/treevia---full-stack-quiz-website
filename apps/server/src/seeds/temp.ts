// ============================================================================
// SEED DATA STRUCTURE
// ============================================================================
// This file contains seed data organized by relationships:
// 1. CATEGORIES - Base categories for organizing quizzes
// 2. QUIZZES - Quiz objects grouped by category, each quiz contains questions
// 3. QUESTIONS - Questions grouped by quiz they belong to
// ============================================================================

// Mock MongoDB ObjectIds (will be replaced with real ones during seeding)
const MOCK_USER_ID = "507f1f77bcf86cd799439011"; // Mock admin/creator ID

// ============================================================================
// CATEGORIES ARRAY
// ============================================================================
const QuizQuestions = [
  // Questions for: Programming & Software Development Quizzes
  {
    prompt: "What does 'responsive design' mean?",
    options: [
      { label: 'A', text: "Design adapts to screen size", isCorrect: true },
      { label: 'B', text: "Fast-loading pages", isCorrect: false },
      { label: 'C', text: "Optimized backend code", isCorrect: false },
      { label: 'D', text: "Server-side rendering only", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    prompt: "Which pattern is used to restrict instantiation of a class to a single object?",
    options: [
      { label: 'A', text: "Observer", isCorrect: false },
      { label: 'B', text: "Singleton", isCorrect: true },
      { label: 'C', text: "Factory", isCorrect: false },
      { label: 'D', text: "Decorator", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    prompt: "What is the main purpose of system design?",
    options: [
      { label: 'A', text: "To create a scalable architecture", isCorrect: true },
      { label: 'B', text: "To design UI components", isCorrect: false },
      { label: 'C', text: "To optimize CSS", isCorrect: false },
      { label: 'D', text: "To write unit tests", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    prompt: "Which of these is a React feature?",
  options: [
    { label: 'A', text: "JSX", isCorrect: true },
    { label: 'B', text: "SQL queries", isCorrect: false },
    { label: 'C', text: "DOM manipulation in backend", isCorrect: false },
    { label: 'D', text: "CSS preprocessors", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which operator is used for assignment?",
  options: [
    { label: 'A', text: "=", isCorrect: true },
    { label: 'B', text: "==", isCorrect: false },
    { label: 'C', text: "===", isCorrect: false },
    { label: 'D', text: "!=", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which data structure uses key-value pairs?",
  options: [
    { label: 'A', text: "Array", isCorrect: false },
    { label: 'B', text: "Object", isCorrect: true },
    { label: 'C', text: "Stack", isCorrect: false },
    { label: 'D', text: "Queue", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "How do you declare a variable in JavaScript?",
  options: [
    { label: 'A', text: "var myVar;", isCorrect: false },
    { label: 'B', text: "variable myVar;", isCorrect: false },
    { label: 'C', text: "let myVar;", isCorrect: false },
    { label: 'D', text: "Both A and C", isCorrect: true }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which library is primarily used for building UI components in React?",
  options: [
    { label: 'A', text: "Redux", isCorrect: false },
    { label: 'B', text: "React Router", isCorrect: false },
    { label: 'C', text: "React", isCorrect: true },
    { label: 'D', text: "Node.js", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which method can be used to improve web performance?",
  options: [
    { label: 'A', text: "Minifying JS/CSS", isCorrect: false },
    { label: 'B', text: "Lazy loading images", isCorrect: false },
    { label: 'C', text: "Using caching", isCorrect: false },
    { label: 'D', text: "All of the above", isCorrect: true }
  ],
  difficulty: 'medium'
},
{
  prompt: "What is encapsulation in OOP?",
  options: [
    { label: 'A', text: "Hiding internal data of an object", isCorrect: true },
    { label: 'B', text: "A type of loop", isCorrect: false },
    { label: 'C', text: "Error handling mechanism", isCorrect: false },
    { label: 'D', text: "Inheritance type", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which data structure is ideal for LIFO operations?",
  options: [
    { label: 'A', text: "Queue", isCorrect: false },
    { label: 'B', text: "Stack", isCorrect: true },
    { label: 'C', text: "Tree", isCorrect: false },
    { label: 'D', text: "Graph", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which tool is commonly used for containerization?",
  options: [
    { label: 'A', text: "Docker", isCorrect: true },
    { label: 'B', text: "Git", isCorrect: false },
    { label: 'C', text: "Jenkins", isCorrect: false },
    { label: 'D', text: "Webpack", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "How do you attach a click event in vanilla JS?",
  options: [
    { label: 'A', text: "addEventListener('click', fn)", isCorrect: true },
    { label: 'B', text: "onClick(fn)", isCorrect: false },
    { label: 'C', text: "bindClick(fn)", isCorrect: false },
    { label: 'D', text: "eventAttach('click')", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Lazy loading images improves?",
  options: [
    { label: 'A', text: "Performance", isCorrect: true },
    { label: 'B', text: "Server-side logs", isCorrect: false },
    { label: 'C', text: "Backend API speed", isCorrect: false },
    { label: 'D', text: "Database schema", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "What is the purpose of a backend framework?",
  options: [
    { label: 'A', text: "Build UI", isCorrect: false },
    { label: 'B', text: "Handle client-side routing", isCorrect: false },
    { label: 'C', text: "Structure server-side logic", isCorrect: true },
    { label: 'D', text: "Style HTML", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which of the following is a primitive data type in most programming languages?",
  options: [
    { label: 'A', text: "String", isCorrect: true },
    { label: 'B', text: "Class", isCorrect: false },
    { label: 'C', text: "Module", isCorrect: false },
    { label: 'D', text: "Library", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which of these is a valid JavaScript data type?",
  options: [
    { label: 'A', text: "Number", isCorrect: true },
    { label: 'B', text: "Character", isCorrect: false },
    { label: 'C', text: "Real", isCorrect: false },
    { label: 'D', text: "Decimal", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which platform orchestrates containers at scale?",
  options: [
    { label: 'A', text: "React", isCorrect: false },
    { label: 'B', text: "Kubernetes", isCorrect: true },
    { label: 'C', text: "Node.js", isCorrect: false },
    { label: 'D', text: "MongoDB", isCorrect: false }
  ],
  difficulty: 'hard'
},
{
  prompt: "What is a key principle of frontend development?",
  options: [
    { label: 'A', text: "Separation of concerns", isCorrect: true },
    { label: 'B', text: "Database normalization", isCorrect: false },
    { label: 'C', text: "Continuous deployment", isCorrect: false },
    { label: 'D', text: "Container orchestration", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which CSS method is used for layout?",
  options: [
    { label: 'A', text: "Flexbox", isCorrect: true },
    { label: 'B', text: "SQL", isCorrect: false },
    { label: 'C', text: "Redux", isCorrect: false },
    { label: 'D', text: "Lambda", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which status code indicates a successful HTTP request?",
  options: [
    { label: 'A', text: "200", isCorrect: true },
    { label: 'B', text: "404", isCorrect: false },
    { label: 'C', text: "500", isCorrect: false },
    { label: 'D', text: "302", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "What is horizontal scaling?",
  options: [
    { label: 'A', text: "Adding more servers", isCorrect: true },
    { label: 'B', text: "Upgrading server CPU", isCorrect: false },
    { label: 'C', text: "Optimizing queries", isCorrect: false },
    { label: 'D', text: "Caching data", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "What symbol is used to denote comments in JavaScript?",
  options: [
    { label: 'A', text: "//", isCorrect: true },
    { label: 'B', text: "<!-- -->", isCorrect: false },
    { label: 'C', text: "#", isCorrect: false },
    { label: 'D', text: "/* */", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which CSS property controls the text size?",
  options: [
    { label: 'A', text: "font-style", isCorrect: false },
    { label: 'B', text: "text-size", isCorrect: false },
    { label: 'C', text: "font-size", isCorrect: true },
    { label: 'D', text: "text-style", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which model describes the process of software development in phases?",
  options: [
    { label: 'A', text: "Agile", isCorrect: false },
    { label: 'B', text: "Waterfall", isCorrect: true },
    { label: 'C', text: "Kanban", isCorrect: false },
    { label: 'D', text: "Lean", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "What does CI/CD stand for?",
  options: [
    { label: 'A', text: "Continuous Integration / Continuous Delivery", isCorrect: true },
    { label: 'B', text: "Code Integration / Code Deployment", isCorrect: false },
    { label: 'C', text: "Continuous Input / Continuous Debug", isCorrect: false },
    { label: 'D', text: "Compile Integration / Deploy", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Monitoring infrastructure helps ensure?",
  options: [
    { label: 'A', text: "Reliability", isCorrect: true },
    { label: 'B', text: "Faster CSS", isCorrect: false },
    { label: 'C', text: "Smaller JS bundles", isCorrect: false },
    { label: 'D', text: "Database migrations", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which HTTP method is used to retrieve data from a server?",
  options: [
    { label: 'A', text: "POST", isCorrect: false },
    { label: 'B', text: "GET", isCorrect: true },
    { label: 'C', text: "PUT", isCorrect: false },
    { label: 'D', text: "DELETE", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "REST stands for?",
  options: [
    { label: 'A', text: "Representational State Transfer", isCorrect: true },
    { label: 'B', text: "Rapid Server Transmission", isCorrect: false },
    { label: 'C', text: "Random Server Technology", isCorrect: false },
    { label: 'D', text: "Resource Standard Transfer", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "JWT is commonly used for?",
  options: [
    { label: 'A', text: "Database migrations", isCorrect: false },
    { label: 'B', text: "Authentication", isCorrect: true },
    { label: 'C', text: "CSS styling", isCorrect: false },
    { label: 'D', text: "Frontend routing", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which encryption type is often used in authentication?",
  options: [
    { label: 'A', text: "AES", isCorrect: false },
    { label: 'B', text: "SHA-256", isCorrect: false },
    { label: 'C', text: "MD5", isCorrect: false },
    { label: 'D', text: "RSA", isCorrect: true }
  ],
  difficulty: 'hard'
},
{
  prompt: "Which of these is a NoSQL database?",
  options: [
    { label: 'A', text: "MySQL", isCorrect: false },
    { label: 'B', text: "MongoDB", isCorrect: true },
    { label: 'C', text: "PostgreSQL", isCorrect: false },
    { label: 'D', text: "SQLite", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which loop is guaranteed to run at least once?",
  options: [
    { label: 'A', text: "for loop", isCorrect: false },
    { label: 'B', text: "while loop", isCorrect: false },
    { label: 'C', text: "do-while loop", isCorrect: true },
    { label: 'D', text: "foreach loop", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which is a function declaration in JavaScript?",
  options: [
    { label: 'A', text: "function myFunc() {}", isCorrect: true },
    { label: 'B', text: "myFunc := function {}", isCorrect: false },
    { label: 'C', text: "def myFunc():", isCorrect: false },
    { label: 'D', text: "func myFunc()", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "kjasjfsla;",
  options: [
    { label: 'A', text: "lllaskljflj;sdak", isCorrect: false },
    { label: 'B', text: "kfjadsjfljk", isCorrect: true },
    { label: 'C', text: "fksdjaflkdsa", isCorrect: false },
    { label: 'D', text: "sdfjlsfjsa", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "jdkfjdsljaflkj",
  options: [
    { label: 'A', text: "jkfldksaf", isCorrect: true },
    { label: 'B', text: "fkdalfk'lsda", isCorrect: false },
    { label: 'C', text: "dfkjsaf", isCorrect: false },
    { label: 'D', text: "lsdflask", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which company created React?",
  options: [
    { label: 'A', text: "Google", isCorrect: false },
    { label: 'B', text: "Microsoft", isCorrect: false },
    { label: 'C', text: "Facebook (Meta)", isCorrect: true },
    { label: 'D', text: "Twitter", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which one is not a programming language?",
  options: [
    { label: 'A', text: "Python", isCorrect: false },
    { label: 'B', text: "Java", isCorrect: false },
    { label: 'C', text: "Html", isCorrect: true },
    { label: 'D', text: "JavaScript", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "\"Winter is coming\" is from:",
  options: [
    { label: 'A', text: "Vikings", isCorrect: false },
    { label: 'B', text: "The Witcher", isCorrect: false },
    { label: 'C', text: "Game of Thrones", isCorrect: true },
    { label: 'D', text: "Lord of the Rings", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Decision fatigue happens when you",
  options: [
    { label: 'A', text: "Sleep less", isCorrect: false },
    { label: 'B', text: "Decide too much", isCorrect: true },
    { label: 'C', text: "Eat late", isCorrect: false },
    { label: 'D', text: "Think deeply", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "kjkldjsafkjsdlakj",
  options: [
    { label: 'A', text: "jkjdksaj", isCorrect: false },
    { label: 'B', text: "djahfkfksd", isCorrect: false },
    { label: 'C', text: "jdjfkasj", isCorrect: true },
    { label: 'D', text: "kjkfjklsajfj", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "fskadjfldsfl'k",
  options: [
    { label: 'A', text: "ksjfljsfdalk;", isCorrect: false },
    { label: 'B', text: "kjdjslkfjsa", isCorrect: false },
    { label: 'C', text: "iuafjkljak;sd", isCorrect: true },
    { label: 'D', text: "isdfjalkdjf", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "dsojfkdsajfldjs;afl",
  options: [
    { label: 'A', text: "jfkljsda;fj", isCorrect: false },
    { label: 'B', text: "fdsoakjfk", isCorrect: false },
    { label: 'C', text: "kfjasklfds;", isCorrect: false },
    { label: 'D', text: "klsjfdlkasdkfj;d", isCorrect: true }
  ],
  difficulty: 'easy'
},
{
  prompt: "What does `404` mean on the web?",
  options: [
    { label: 'A', text: "Server crash", isCorrect: false },
    { label: 'B', text: "Permission denied", isCorrect: false },
    { label: 'C', text: "Page not found", isCorrect: true },
    { label: 'D', text: "Bad internet", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Git is mainly used for",
  options: [
    { label: 'A', text: "Designing UI", isCorrect: false },
    { label: 'B', text: "Writing backend logic", isCorrect: false },
    { label: 'C', text: "Version contol", isCorrect: true },
    { label: 'D', text: "Hosting Websites", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Who Played Iron Man?",
  options: [
    { label: 'A', text: "Chris Evans", isCorrect: false },
    { label: 'B', text: "Robert Downey jr.", isCorrect: true },
    { label: 'C', text: "Tom Holland", isCorrect: false },
    { label: 'D', text: "Mark Ruffalo", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which movie won Best Picture in 2020",
  options: [
    { label: 'A', text: "Joker", isCorrect: false },
    { label: 'B', text: "Parasite", isCorrect: true },
    { label: 'C', text: "1917", isCorrect: false },
    { label: 'D', text: "Once Upon a Time in Hollywood", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Saving money means:",
  options: [
    { label: 'A', text: "Hiding cash", isCorrect: false },
    { label: 'B', text: "Spending less than you earn", isCorrect: true },
    { label: 'C', text: "Avoiding banks", isCorrect: false },
    { label: 'D', text: "Investing only", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Inflation does what to money",
  options: [
    { label: 'A', text: "Increases value", isCorrect: false },
    { label: 'B', text: "Keeps it stable", isCorrect: false },
    { label: 'C', text: "Reducing purchasing power", isCorrect: true },
    { label: 'D', text: "Doubles it", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Why do people fear public speaking",
  options: [
    { label: 'A', text: "Lack of skill", isCorrect: false },
    { label: 'B', text: "Fear of judgement", isCorrect: true },
    { label: 'C', text: "Loud rooms", isCorrect: false },
    { label: 'D', text: "Poor memory", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "The brain prefers",
  options: [
    { label: 'A', text: "New habits", isCorrect: false },
    { label: 'B', text: "Complexity", isCorrect: false },
    { label: 'C', text: "Familiar patterns", isCorrect: true },
    { label: 'D', text: "Chaos", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "jls'dlkfakf;sfcads",
  options: [
    { label: 'A', text: "fsafkasjfl;sa", isCorrect: false },
    { label: 'B', text: "afldkasf", isCorrect: true },
    { label: 'C', text: "d,fkasldf'", isCorrect: false },
    { label: 'D', text: "kojsfakfl", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "What does `API` stand for?",
  options: [
    { label: 'A', text: "Advanced Programming Interface", isCorrect: false },
    { label: 'B', text: "Application Programming Interface", isCorrect: true },
    { label: 'C', text: "Applied Program Interaction", isCorrect: false },
    { label: 'D', text: "Automated Programming Input", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "The character \"Neo\" appears in:",
  options: [
    { label: 'A', text: "Inception", isCorrect: false },
    { label: 'B', text: "Matrix", isCorrect: true },
    { label: 'C', text: "Avatar", isCorrect: false },
    { label: 'D', text: "Tenet", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Emergency funds should ideally cove:",
  options: [
    { label: 'A', text: "1 Week ", isCorrect: false },
    { label: 'B', text: "1 Month", isCorrect: true },
    { label: 'C', text: "3-6 mongths", isCorrect: false },
    { label: 'D', text: "1 Year", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which emotion is strongest for memory",
  options: [
    { label: 'A', text: "Happiness", isCorrect: false },
    { label: 'B', text: "Fear", isCorrect: true },
    { label: 'C', text: "Calmness", isCorrect: false },
    { label: 'D', text: "Boredom", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which studio made Toy Story",
  options: [
    { label: 'A', text: "DreamWorks", isCorrect: false },
    { label: 'B', text: "Disney", isCorrect: false },
    { label: 'C', text: "Pixar", isCorrect: true },
    { label: 'D', text: "Illumination", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which is a liability",
  options: [
    { label: 'A', text: "Salary", isCorrect: false },
    { label: 'B', text: "Investment", isCorrect: false },
    { label: 'C', text: "Credit card debt", isCorrect: true },
    { label: 'D', text: "Savings", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Budgeting helps you",
  options: [
    { label: 'A', text: "Spend more", isCorrect: false },
    { label: 'B', text: "Track and control spending", isCorrect: true },
    { label: 'C', text: "Avoid work", isCorrect: false },
    { label: 'D', text: "Get rich instantly", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Multitasking usually makes you",
  options: [
    { label: 'A', text: "Faster", isCorrect: false },
    { label: 'B', text: "Smarter", isCorrect: false },
    { label: 'C', text: "Less Productive", isCorrect: true },
    { label: 'D', text: "More creative", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which algorithm is best for finding the shortest path in a graph?",
  options: [
    { label: 'A', text: "Binary Search", isCorrect: false },
    { label: 'B', text: "Dijkstra's Algorithm", isCorrect: true },
    { label: 'C', text: "Quick Sort", isCorrect: false },
    { label: 'D', text: "Merge Sort", isCorrect: false }
  ],
  difficulty: 'hard'
},
{
  prompt: "What does HTTP stand for?",
  options: [
    { label: 'A', text: "HyperText Transfer Protocol", isCorrect: true },
    { label: 'B', text: "High Transfer Text Program", isCorrect: false },
    { label: 'C', text: "Hyper Tool Tech Platform", isCorrect: false },
    { label: 'D', text: "Host Transfer Protocol", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "CSS is used for",
  options: [
    { label: 'A', text: "Logic ", isCorrect: false },
    { label: 'B', text: "Data storage", isCorrect: false },
    { label: 'C', text: "Styling web pages", isCorrect: true },
    { label: 'D', text: "Server routing", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which language runs natively in the browser",
  options: [
    { label: 'A', text: "Python", isCorrect: false },
    { label: 'B', text: "Java", isCorrect: false },
    { label: 'C', text: "JavaScript", isCorrect: true },
    { label: 'D', text: "C++", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "GitHub is mainly used for ",
  options: [
    { label: 'A', text: "Hosting videos", isCorrect: false },
    { label: 'B', text: "Version control and collaboration", isCorrect: true },
    { label: 'C', text: "Database management", isCorrect: false },
    { label: 'D', text: "UI design", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which one is a NoSQL database",
  options: [
    { label: 'A', text: "MySQL", isCorrect: false },
    { label: 'B', text: "PostgreSQL", isCorrect: false },
    { label: 'C', text: "MongoDB", isCorrect: true },
    { label: 'D', text: "SQLite", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which company owns GitHub",
  options: [
    { label: 'A', text: "Google", isCorrect: false },
    { label: 'B', text: "Facebook", isCorrect: false },
    { label: 'C', text: "Microsoft", isCorrect: true },
    { label: 'D', text: "Amazon", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "What does \"open source\" mean ?",
  options: [
    { label: 'A', text: "Free internet", isCorrect: false },
    { label: 'B', text: "Publicly editable code", isCorrect: true },
    { label: 'C', text: "No license", isCorrect: false },
    { label: 'D', text: "Offline software", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "What does \"bug\" mean in software",
  options: [
    { label: 'A', text: "Virus", isCorrect: false },
    { label: 'B', text: "Hardware failure", isCorrect: false },
    { label: 'C', text: "Error in code", isCorrect: true },
    { label: 'D', text: "Memory leak", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Cloud computing allows you to",
  options: [
    { label: 'A', text: "Store data only offline", isCorrect: false },
    { label: 'B', text: "Use remote servers via the internet", isCorrect: true },
    { label: 'C', text: "Speed up hardware", isCorrect: false },
    { label: 'D', text: "Avoid security issues", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Which one is a frontend framework",
  options: [
    { label: 'A', text: "Express", isCorrect: false },
    { label: 'B', text: "Django", isCorrect: false },
    { label: 'C', text: "React", isCorrect: true },
    { label: 'D', text: "MongoDB", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "The Joker is a villain in ",
  options: [
    { label: 'A', text: "Superman", isCorrect: false },
    { label: 'B', text: "Batman", isCorrect: true },
    { label: 'C', text: "Spiderman", isCorrect: false },
    { label: 'D', text: "Avengers", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which movies features Wakanda",
  options: [
    { label: 'A', text: "Avengers", isCorrect: false },
    { label: 'B', text: "Black Panther", isCorrect: true },
    { label: 'C', text: "Thor", isCorrect: false },
    { label: 'D', text: "Iron Man", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "\"I'll be back\" is from ",
  options: [
    { label: 'A', text: "Rambo", isCorrect: false },
    { label: 'B', text: "Predator", isCorrect: false },
    { label: 'C', text: "Terminator", isCorrect: true },
    { label: 'D', text: "Robocop", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which genre is inception",
  options: [
    { label: 'A', text: "Romance", isCorrect: false },
    { label: 'B', text: "Horror", isCorrect: false },
    { label: 'C', text: "Sci-fi", isCorrect: true },
    { label: 'D', text: "Comedy", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "Who directed \"Titanic\"",
  options: [
    { label: 'A', text: "Steven Spielberg", isCorrect: false },
    { label: 'B', text: "James Cameron", isCorrect: true },
    { label: 'C', text: "Christopher Nolan", isCorrect: false },
    { label: 'D', text: "Ridley Scott", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which programming language is known as the 'mother of all languages' and was developed by Dennis Ritchie?",
  options: [
    { label: 'A', text: "Java", isCorrect: false },
    { label: 'B', text: "C", isCorrect: true },
    { label: 'C', text: "Python", isCorrect: false },
    { label: 'D', text: "Fortran", isCorrect: false }
  ],
  difficulty: 'hard'
},
{
  prompt: "In web development, what does 'CSS' stand for?",
  options: [
    { label: 'A', text: "Creative Style Sheets", isCorrect: false },
    { label: 'B', text: "Computer Style Symbols", isCorrect: false },
    { label: 'C', text: "Cascading Style Sheets", isCorrect: true },
    { label: 'D', text: "Colorful Style Sheets", isCorrect: false }
  ],
  difficulty: 'easy'
},
{
  prompt: "Which of the following is NOT a fundamental principle of Object-Oriented Programming (OOP)?",
  options: [
    { label: 'A', text: "Encapsulation", isCorrect: false },
    { label: 'B', text: "Inheritance", isCorrect: false },
    { label: 'C', text: "Compilation", isCorrect: true },
    { label: 'D', text: "Polymorphism", isCorrect: false }
  ],
  difficulty: 'medium'
},
{
  prompt: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
  options: [
    { label: 'A', text: "O(n)", isCorrect: false },
    { label: 'B', text: "O(n log n)", isCorrect: false },
    { label: 'C', text: "O(1)", isCorrect: false },
    { label: 'D', text: "O(log n)", isCorrect: true }
  ],
  difficulty: 'hard'
},
{
  prompt: "In JavaScript, what is the term for a function that is passed as an argument to another function and is executed after some operation has been completed?",
  options: [
    { label: 'A', text: "Closure", isCorrect: false },
    { label: 'B', text: "Callback", isCorrect: true },
    { label: 'C', text: "Promise", isCorrect: false },
    { label: 'D', text: "Generator", isCorrect: false }
  ],
  difficulty: 'medium'
}]

// ============================================================================
// QUIZZES
// Quiz objects that reference categories via $oid (MongoDB ObjectId)
// Each quiz references a category through the 'category' field
// Relationships: Quiz -> Category (via category.$oid)
// ============================================================================
// QUIZZES
// Quiz objects that reference categories via $oid (MongoDB ObjectId)
// Each quiz references a category through the 'category' field
// Relationships: Quiz -> Category (via category.$oid)
// ============================================================================
const Quiz = [
  // Category: Programming & Software Development (69cced681c7e661bdc99e824)
  {
    title: "Programming & Software Development",
    category: {
      $oid: "69cced681c7e661bdc99e824"
    },
    difficulty: "Easy",
    timeLimit: 1200
  },
  {
    title: "Programming & Software Development II|",
    category: {
      $oid: "69cced681c7e661bdc99e824"
    },
    difficulty: "Hard",
    timeLimit: 59
  },

  // Category: Programming Basics (69440eea2f441ea600de83cc)
  {
    title: "Programming Basics",
    timeLimit: 900,
    difficulty: "easy",
    category: {
      $oid: "69440eea2f441ea600de83cc"
    }
  },

  // Category: Javascript Basics (695f54af7ab32aff3c1279b2)
  {
    title: "Javascript Basics",
    category: {
      $oid: "695f54af7ab32aff3c1279b2"
    },
    difficulty: "Medium",
    timeLimit: 12
  },

  // Category: Online Savvy (696108e6f394e07335d963f3)
  {
    title: "How Online-Savvy Are You?",
    category: {
      $oid: "696108e6f394e07335d963f3"
    },
    difficulty: "Easy",
    timeLimit: 10
  },

  // Category: Random Quiz (695a7263e1434fa102e6be34)
  {
    title: "random quiz 5",
    category: {
      $oid: "695a7263e1434fa102e6be34"
    },
    difficulty: "Easy",
    timeLimit: 10
  },

  // Category: Movies (69611017f394e07335d965f7)
  {
    title: "Are You a Real Movie Fan or Just Vibing?",
    category: {
      $oid: "69611017f394e07335d965f7"
    },
    difficulty: "Medium",
    timeLimit: 15
  },

  // Category: Finance (696110a8f394e07335d96608)
  {
    title: "Are You Financially Aware or Financially Delusional",
    category: {
      $oid: "696110a8f394e07335d96608"
    },
    difficulty: "Medium",
    timeLimit: 10
  },

  // Category: Brain & Psychology (696110e0f394e07335d96612)
  {
    title: "Your Brain is Lying to You",
    category: {
      $oid: "696110e0f394e07335d96612"
    },
    difficulty: "Hard",
    timeLimit: 17
  },

  // Category: Online Savvy (696108e6f394e07335d963f3)
  {
    title: "Core Tech Knowledge",
    category: {
      $oid: "696108e6f394e07335d963f3"
    },
    difficulty: "Medium",
    timeLimit: 20
  },

  // Category: Online Savvy (696108e6f394e07335d963f3)
  {
    title: "Tech Culture & Concepts",
    category: {
      $oid: "696108e6f394e07335d963f3"
    },
    difficulty: "Hard",
    timeLimit: 10
  },

  // Category: Movies (69611017f394e07335d965f7)
  {
    title: "Popular Movies",
    category: {
      $oid: "69611017f394e07335d965f7"
    },
    difficulty: "Medium",
    timeLimit: 14
  },

  // Category: Programming & Software Development (69cced681c7e661bdc99e824)
  {
    title: "Programming & Software Development III",
    category: {
      $oid: "69cced681c7e661bdc99e824"
    },
    difficulty: "Hard",
    timeLimit: 59
  },
  {
    title: "Programming & Software Development IV",
    category: {
      $oid: "69cced681c7e661bdc99e824"
    },
    difficulty: "Hard",
    isDraft: true,
    timeLimit: 59
  }
]

// ============================================================================
// CATEGORIES
// Base categories for organizing quizzes
// Used by Quiz objects through category.$oid references
// Relationships: Category <- Quiz (referenced via $oid)
// ============================================================================
const Category = [{
  name: "Programming & Software Development",
  description: "Test your knowledge of programming languages, software development principles, and coding concepts with this quiz.",
  tags: ["programming", "development", "software"]
},
{
  name: "Programming Basics",
  description: "Test your knowledge of programming fundamentals, including data types, control structures, and basic algorithms.",
  tags: ["programming", "basics", "fundamentals"]
},
{
  name: "Javascript Basics",
  description: "Test your knowledge of JavaScript fundamentals, including syntax, data types, and basic programming concepts.",
  tags: ["javascript", "programming", "web"]
},
{
  name: "Online Savvy",
  description: "Test your knowledge of internet culture, online trends, and digital literacy with this quiz.",
  tags: ["internet", "technology", "culture"]
},
{
  name: "Random Quiz",
  description: "A mix of questions from various categories to test your general knowledge and keep you on your toes.",
  tags: ["general", "mixed", "knowledge"]
},
{
  name: "Movies",
  description: "Test your knowledge of popular movies, directors, actors, and film trivia with this quiz.",
  tags: ["movies", "entertainment", "trivia"]
},
{
  name: "Finance",
  description: "Test your knowledge of personal finance, investing, and economic concepts with this quiz.",
  tags: ["finance", "money", "economics"]
},
{
  name: "Brain & Psychology",
  description: "Test your knowledge of cognitive biases, memory, and psychological concepts with this quiz.",
  tags: ["psychology", "brain", "cognition"]
}]