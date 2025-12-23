import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Quiz from "../models/Quiz.js";
import env from "../env.js";

const quizzes =  [
  // Category: 69440eea2f441ea600de83cb
  {
    title: "HTML Basics Quiz",
    category: "69440eea2f441ea600de83cb",
    difficulty: "Easy",
    timeLimit: 600,
    description: "Test your knowledge of basic HTML concepts.",
    questions: []
  },
  {
    title: "CSS Fundamentals Quiz",
    category: "69440eea2f441ea600de83cb",
    difficulty: "Easy",
    timeLimit: 600,
    description: "A beginner-friendly quiz on CSS fundamentals.",
    questions: []
  },
  {
    title: "JavaScript Essentials Quiz",
    category: "69440eea2f441ea600de83cb",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Covers core JavaScript concepts every developer should know.",
    questions: []
  },

  // Category: 69440eea2f441ea600de83cc
  {
    title: "Programming Logic Quiz",
    category: "69440eea2f441ea600de83cc",
    difficulty: "Easy",
    timeLimit: 600,
    description: "Test your understanding of basic programming logic.",
    questions: []
  },
  {
    title: "Data Structures Basics Quiz",
    category: "69440eea2f441ea600de83cc",
    difficulty: "Medium",
    timeLimit: 900,
    description: "An introduction to common data structures.",
    questions: []
  },
  {
    title: "Algorithm Thinking Quiz",
    category: "69440eea2f441ea600de83cc",
    difficulty: "Hard",
    timeLimit: 1200,
    description: "Challenge your algorithmic thinking skills.",
    questions: []
  },

  // Category: 69440eea2f441ea600de83cd
  {
    title: "Computer Networks Quiz",
    category: "69440eea2f441ea600de83cd",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Covers the fundamentals of computer networking.",
    questions: []
  },
  {
    title: "Operating Systems Quiz",
    category: "69440eea2f441ea600de83cd",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Test your knowledge of operating system concepts.",
    questions: []
  },
  {
    title: "Databases Concepts Quiz",
    category: "69440eea2f441ea600de83cd",
    difficulty: "Hard",
    timeLimit: 1200,
    description: "Advanced quiz on database systems and concepts.",
    questions: []
  },

  // Category: 69440eea2f441ea600de83ce
  {
    title: "React Basics Quiz",
    category: "69440eea2f441ea600de83ce",
    difficulty: "Easy",
    timeLimit: 600,
    description: "A beginner quiz on React fundamentals.",
    questions: []
  },
  {
    title: "React Hooks Quiz",
    category: "69440eea2f441ea600de83ce",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Test your understanding of React Hooks.",
    questions: []
  },
  {
    title: "Advanced React Patterns Quiz",
    category: "69440eea2f441ea600de83ce",
    difficulty: "Hard",
    timeLimit: 1200,
    description: "Deep dive into advanced React patterns.",
    questions: []
  },

  // Category: 69440eea2f441ea600de83cf
  {
    title: "Node.js Fundamentals Quiz",
    category: "69440eea2f441ea600de83cf",
    difficulty: "Easy",
    timeLimit: 600,
    description: "Covers the basics of Node.js.",
    questions: []
  },
  {
    title: "Express.js Quiz",
    category: "69440eea2f441ea600de83cf",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Test your Express.js knowledge.",
    questions: []
  },
  {
    title: "Node.js Performance Quiz",
    category: "69440eea2f441ea600de83cf",
    difficulty: "Hard",
    timeLimit: 1200,
    description: "Advanced quiz on Node.js performance tuning.",
    questions: []
  },

  // Category: 69440eea2f441ea600de83d0
  {
    title: "Software Design Principles Quiz",
    category: "69440eea2f441ea600de83d0",
    difficulty: "Medium",
    timeLimit: 900,
    description: "Test your understanding of software design principles.",
    questions: []
  },
  {
    title: "Clean Code Quiz",
    category: "69440eea2f441ea600de83d0",
    difficulty: "Medium",
    timeLimit: 900,
    description: "A quiz focused on writing clean, maintainable code.",
    questions: []
  },
  {
    title: "Design Patterns Quiz",
    category: "69440eea2f441ea600de83d0",
    difficulty: "Hard",
    timeLimit: 1200,
    description: "Advanced quiz on common software design patterns.",
    questions: []
  }
];

async function seedQuizzes() {
  try {
    await mongoose.connect(env.MONGO_URI)
    console.log("✅ MongoDB connected");

    await Quiz.deleteMany();
    console.log("🗑️ Existing quizzes cleared");

    await Quiz.insertMany(quizzes);
    console.log("🎉 Quizzes seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedQuizzes();