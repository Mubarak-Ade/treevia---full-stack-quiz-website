// ============================================================================
// SEED DATA STRUCTURE
// ============================================================================
// This file contains seed data organized by relationships:
// 1. CATEGORIES - Base categories for organizing quizzes
// 2. QUIZZES - Quiz objects grouped by category
// 3. QUESTIONS - Questions grouped by quiz they belong to
// ============================================================================

// Mock MongoDB ObjectIds (will be replaced with real ones during seeding)
const MOCK_USER_ID = "507f1f77bcf86cd799439011"; // Mock admin/creator ID

// ============================================================================
// CATEGORIES ARRAY
// ============================================================================
const Categories = [
  {
    name: "Programming & Software Development",
    description: "Master programming languages, software development principles, design patterns, and coding concepts",
    tags: ["programming", "development", "software"]
  },
  {
    name: "Web Development Basics",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript",
    tags: ["web", "frontend", "basics"]
  },
  {
    name: "Movies & Entertainment",
    description: "Test your knowledge of popular movies, directors, actors, and film trivia",
    tags: ["movies", "entertainment", "trivia"]
  },
  {
    name: "Finance & Economics",
    description: "Understand personal finance, investing, and economic concepts",
    tags: ["finance", "money", "economics"]
  },
  {
    name: "Cognitive Science",
    description: "Explore cognitive biases, memory, psychological concepts, and brain science",
    tags: ["psychology", "brain", "cognition"]
  }
];

// ============================================================================
// QUIZZES ARRAY (organized by category)
// ============================================================================
const Quizzes = [
  // ========== CATEGORY 1: Programming & Software Development ==========
  {
    categoryIndex: 0, // References Categories[0]
    title: "Programming Fundamentals",
    description: "Master the core concepts of programming",
    difficulty: "easy",
    status: "published",
    isPublic: true,
    xpReward: 500,
    timeLimitPerQuestion: 30,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Programming",
    createdBy: MOCK_USER_ID,
    questionIndices: [0, 1, 2, 3, 4, 5], // References Questions indices
  },
  {
    categoryIndex: 0,
    title: "Advanced Design Patterns",
    description: "Deep dive into design patterns and system architecture",
    difficulty: "hard",
    status: "published",
    isPublic: true,
    xpReward: 1000,
    timeLimitPerQuestion: 45,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Design+Patterns",
    createdBy: MOCK_USER_ID,
    questionIndices: [6, 7, 8, 9, 10, 11],
  },

  // ========== CATEGORY 2: Web Development Basics ==========
  {
    categoryIndex: 1,
    title: "JavaScript Essentials",
    description: "Learn JavaScript fundamentals from scratch",
    difficulty: "easy",
    status: "published",
    isPublic: true,
    xpReward: 600,
    timeLimitPerQuestion: 30,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=JavaScript",
    createdBy: MOCK_USER_ID,
    questionIndices: [12, 13, 14, 15, 16, 17],
  },
  {
    categoryIndex: 1,
    title: "Web Performance Optimization",
    description: "Techniques and tools for optimizing web applications",
    difficulty: "medium",
    status: "published",
    isPublic: true,
    xpReward: 750,
    timeLimitPerQuestion: 45,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Performance",
    createdBy: MOCK_USER_ID,
    questionIndices: [18, 19, 20, 21, 22, 23],
  },

  // ========== CATEGORY 3: Movies & Entertainment ==========
  {
    categoryIndex: 2,
    title: "Movie Trivia Basics",
    description: "Test your knowledge of popular movies and actors",
    difficulty: "easy",
    status: "published",
    isPublic: true,
    xpReward: 400,
    timeLimitPerQuestion: 20,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Movies",
    createdBy: MOCK_USER_ID,
    questionIndices: [24, 25, 26, 27, 28, 29],
  },

  // ========== CATEGORY 4: Finance & Economics ==========
  {
    categoryIndex: 3,
    title: "Personal Finance Fundamentals",
    description: "Essential concepts for managing personal finances",
    difficulty: "easy",
    status: "published",
    isPublic: true,
    xpReward: 550,
    timeLimitPerQuestion: 30,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Finance",
    createdBy: MOCK_USER_ID,
    questionIndices: [30, 31, 32, 33, 34, 35],
  },

  // ========== CATEGORY 5: Cognitive Science ==========
  {
    categoryIndex: 4,
    title: "Psychology & Decision Making",
    description: "Understanding cognitive biases and decision-making processes",
    difficulty: "medium",
    status: "published",
    isPublic: true,
    xpReward: 650,
    timeLimitPerQuestion: 40,
    shuffleQuestions: true,
    coverImage: "https://via.placeholder.com/300x200?text=Psychology",
    createdBy: MOCK_USER_ID,
    questionIndices: [36, 37, 38, 39, 40, 41],
  },
];

// ============================================================================
// QUESTIONS ARRAY (organized by quiz)
// ============================================================================
const Questions = [
  // ========== QUIZ 1: Programming Fundamentals ==========
  {
    quizIndex: 0,
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
    quizIndex: 0,
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
    quizIndex: 0,
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
    quizIndex: 0,
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
    quizIndex: 0,
    prompt: "Which of the following is a primitive data type?",
    options: [
      { label: 'A', text: "String", isCorrect: true },
      { label: 'B', text: "Class", isCorrect: false },
      { label: 'C', text: "Module", isCorrect: false },
      { label: 'D', text: "Library", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 0,
    prompt: "Which is a function declaration in JavaScript?",
    options: [
      { label: 'A', text: "function myFunc() {}", isCorrect: true },
      { label: 'B', text: "myFunc := function {}", isCorrect: false },
      { label: 'C', text: "def myFunc():", isCorrect: false },
      { label: 'D', text: "func myFunc()", isCorrect: false }
    ],
    difficulty: 'easy'
  },

  // ========== QUIZ 2: Advanced Design Patterns ==========
  {
    quizIndex: 1,
    prompt: "Which pattern is used to restrict instantiation of a class to a single object?",
    options: [
      { label: 'A', text: "Observer", isCorrect: false },
      { label: 'B', text: "Singleton", isCorrect: true },
      { label: 'C', text: "Factory", isCorrect: false },
      { label: 'D', text: "Decorator", isCorrect: false }
    ],
    difficulty: 'hard'
  },
  {
    quizIndex: 1,
    prompt: "What is the main purpose of system design?",
    options: [
      { label: 'A', text: "To create a scalable architecture", isCorrect: true },
      { label: 'B', text: "To design UI components", isCorrect: false },
      { label: 'C', text: "To optimize CSS", isCorrect: false },
      { label: 'D', text: "To write unit tests", isCorrect: false }
    ],
    difficulty: 'hard'
  },
  {
    quizIndex: 1,
    prompt: "What is encapsulation in OOP?",
    options: [
      { label: 'A', text: "Hiding internal data of an object", isCorrect: true },
      { label: 'B', text: "A type of loop", isCorrect: false },
      { label: 'C', text: "Error handling mechanism", isCorrect: false },
      { label: 'D', text: "Inheritance type", isCorrect: false }
    ],
    difficulty: 'hard'
  },
  {
    quizIndex: 1,
    prompt: "Which data structure is ideal for LIFO operations?",
    options: [
      { label: 'A', text: "Queue", isCorrect: false },
      { label: 'B', text: "Stack", isCorrect: true },
      { label: 'C', text: "Tree", isCorrect: false },
      { label: 'D', text: "Graph", isCorrect: false }
    ],
    difficulty: 'hard'
  },
  {
    quizIndex: 1,
    prompt: "Which tool is commonly used for containerization?",
    options: [
      { label: 'A', text: "Docker", isCorrect: true },
      { label: 'B', text: "Git", isCorrect: false },
      { label: 'C', text: "Jenkins", isCorrect: false },
      { label: 'D', text: "Webpack", isCorrect: false }
    ],
    difficulty: 'hard'
  },
  {
    quizIndex: 1,
    prompt: "Which platform orchestrates containers at scale?",
    options: [
      { label: 'A', text: "React", isCorrect: false },
      { label: 'B', text: "Kubernetes", isCorrect: true },
      { label: 'C', text: "Node.js", isCorrect: false },
      { label: 'D', text: "MongoDB", isCorrect: false }
    ],
    difficulty: 'hard'
  },

  // ========== QUIZ 3: JavaScript Essentials ==========
  {
    quizIndex: 2,
    prompt: "Which library is primarily used for building UI components?",
    options: [
      { label: 'A', text: "Redux", isCorrect: false },
      { label: 'B', text: "React Router", isCorrect: false },
      { label: 'C', text: "React", isCorrect: true },
      { label: 'D', text: "Node.js", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 2,
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
    quizIndex: 2,
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
    quizIndex: 2,
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
    quizIndex: 2,
    prompt: "What does REST stand for?",
    options: [
      { label: 'A', text: "Representational State Transfer", isCorrect: true },
      { label: 'B', text: "Rapid Server Transmission", isCorrect: false },
      { label: 'C', text: "Random Server Technology", isCorrect: false },
      { label: 'D', text: "Resource Standard Transfer", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 2,
    prompt: "Which of these is a valid JavaScript data type?",
    options: [
      { label: 'A', text: "Number", isCorrect: true },
      { label: 'B', text: "Character", isCorrect: false },
      { label: 'C', text: "Real", isCorrect: false },
      { label: 'D', text: "Decimal", isCorrect: false }
    ],
    difficulty: 'easy'
  },

  // ========== QUIZ 4: Web Performance Optimization ==========
  {
    quizIndex: 3,
    prompt: "Lazy loading images improves?",
    options: [
      { label: 'A', text: "Performance", isCorrect: true },
      { label: 'B', text: "Server-side logs", isCorrect: false },
      { label: 'C', text: "Backend API speed", isCorrect: false },
      { label: 'D', text: "Database schema", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 3,
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
    quizIndex: 3,
    prompt: "Which CSS method is used for layout?",
    options: [
      { label: 'A', text: "Flexbox", isCorrect: true },
      { label: 'B', text: "SQL", isCorrect: false },
      { label: 'C', text: "Redux", isCorrect: false },
      { label: 'D', text: "Lambda", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 3,
    prompt: "Which CSS property controls the text size?",
    options: [
      { label: 'A', text: "font-style", isCorrect: false },
      { label: 'B', text: "text-size", isCorrect: false },
      { label: 'C', text: "font-size", isCorrect: true },
      { label: 'D', text: "text-style", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 3,
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
    quizIndex: 3,
    prompt: "What symbol is used to denote comments in JavaScript?",
    options: [
      { label: 'A', text: "//", isCorrect: true },
      { label: 'B', text: "<!-- -->", isCorrect: false },
      { label: 'C', text: "#", isCorrect: false },
      { label: 'D', text: "/* */", isCorrect: false }
    ],
    difficulty: 'medium'
  },

  // ========== QUIZ 5: Movie Trivia Basics ==========
  {
    quizIndex: 4,
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
    quizIndex: 4,
    prompt: "Who Played Iron Man?",
    options: [
      { label: 'A', text: "Chris Evans", isCorrect: false },
      { label: 'B', text: "Robert Downey Jr.", isCorrect: true },
      { label: 'C', text: "Tom Holland", isCorrect: false },
      { label: 'D', text: "Mark Ruffalo", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 4,
    prompt: "Which movie won Best Picture in 2020?",
    options: [
      { label: 'A', text: "Joker", isCorrect: false },
      { label: 'B', text: "Parasite", isCorrect: true },
      { label: 'C', text: "1917", isCorrect: false },
      { label: 'D', text: "Once Upon a Time in Hollywood", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 4,
    prompt: "Which studio made Toy Story?",
    options: [
      { label: 'A', text: "DreamWorks", isCorrect: false },
      { label: 'B', text: "Disney", isCorrect: false },
      { label: 'C', text: "Pixar", isCorrect: true },
      { label: 'D', text: "Illumination", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 4,
    prompt: "The character 'Neo' appears in:",
    options: [
      { label: 'A', text: "Inception", isCorrect: false },
      { label: 'B', text: "The Matrix", isCorrect: true },
      { label: 'C', text: "Avatar", isCorrect: false },
      { label: 'D', text: "Tenet", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 4,
    prompt: "Who directed 'Titanic'?",
    options: [
      { label: 'A', text: "Steven Spielberg", isCorrect: false },
      { label: 'B', text: "James Cameron", isCorrect: true },
      { label: 'C', text: "Christopher Nolan", isCorrect: false },
      { label: 'D', text: "Ridley Scott", isCorrect: false }
    ],
    difficulty: 'easy'
  },

  // ========== QUIZ 6: Personal Finance Fundamentals ==========
  {
    quizIndex: 5,
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
    quizIndex: 5,
    prompt: "Inflation does what to money?",
    options: [
      { label: 'A', text: "Increases value", isCorrect: false },
      { label: 'B', text: "Keeps it stable", isCorrect: false },
      { label: 'C', text: "Reduces purchasing power", isCorrect: true },
      { label: 'D', text: "Doubles it", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 5,
    prompt: "Which is a liability?",
    options: [
      { label: 'A', text: "Salary", isCorrect: false },
      { label: 'B', text: "Investment", isCorrect: false },
      { label: 'C', text: "Credit card debt", isCorrect: true },
      { label: 'D', text: "Savings", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 5,
    prompt: "Budgeting helps you:",
    options: [
      { label: 'A', text: "Spend more", isCorrect: false },
      { label: 'B', text: "Track and control spending", isCorrect: true },
      { label: 'C', text: "Avoid work", isCorrect: false },
      { label: 'D', text: "Get rich instantly", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 5,
    prompt: "Emergency funds should ideally cover:",
    options: [
      { label: 'A', text: "1 week", isCorrect: false },
      { label: 'B', text: "1 month", isCorrect: false },
      { label: 'C', text: "3-6 months", isCorrect: true },
      { label: 'D', text: "1 year", isCorrect: false }
    ],
    difficulty: 'easy'
  },
  {
    quizIndex: 5,
    prompt: "JWT is commonly used for:",
    options: [
      { label: 'A', text: "Database migrations", isCorrect: false },
      { label: 'B', text: "Authentication", isCorrect: true },
      { label: 'C', text: "CSS styling", isCorrect: false },
      { label: 'D', text: "Frontend routing", isCorrect: false }
    ],
    difficulty: 'easy'
  },

  // ========== QUIZ 7: Psychology & Decision Making ==========
  {
    quizIndex: 6,
    prompt: "Why do people fear public speaking?",
    options: [
      { label: 'A', text: "Lack of skill", isCorrect: false },
      { label: 'B', text: "Fear of judgment", isCorrect: true },
      { label: 'C', text: "Loud rooms", isCorrect: false },
      { label: 'D', text: "Poor memory", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 6,
    prompt: "Decision fatigue happens when you:",
    options: [
      { label: 'A', text: "Sleep less", isCorrect: false },
      { label: 'B', text: "Make too many decisions", isCorrect: true },
      { label: 'C', text: "Eat late", isCorrect: false },
      { label: 'D', text: "Think deeply", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 6,
    prompt: "The brain prefers:",
    options: [
      { label: 'A', text: "New habits", isCorrect: false },
      { label: 'B', text: "Complexity", isCorrect: false },
      { label: 'C', text: "Familiar patterns", isCorrect: true },
      { label: 'D', text: "Chaos", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 6,
    prompt: "Which emotion is strongest for memory?",
    options: [
      { label: 'A', text: "Happiness", isCorrect: false },
      { label: 'B', text: "Fear", isCorrect: true },
      { label: 'C', text: "Calmness", isCorrect: false },
      { label: 'D', text: "Boredom", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 6,
    prompt: "Multitasking usually makes you:",
    options: [
      { label: 'A', text: "Faster", isCorrect: false },
      { label: 'B', text: "Smarter", isCorrect: false },
      { label: 'C', text: "Less Productive", isCorrect: true },
      { label: 'D', text: "More creative", isCorrect: false }
    ],
    difficulty: 'medium'
  },
  {
    quizIndex: 6,
    prompt: "What is a key principle of frontend development?",
    options: [
      { label: 'A', text: "Separation of concerns", isCorrect: true },
      { label: 'B', text: "Database normalization", isCorrect: false },
      { label: 'C', text: "Continuous deployment", isCorrect: false },
      { label: 'D', text: "Container orchestration", isCorrect: false }
    ],
    difficulty: 'medium'
  }
];

// ============================================================================
// EXPORT SEED DATA
// ============================================================================
export { Categories, Quizzes, Questions };
