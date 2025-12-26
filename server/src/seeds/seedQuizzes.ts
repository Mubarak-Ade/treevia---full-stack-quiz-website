import mongoose from 'mongoose';
import slugify from 'slugify';
import Question from '../models/Question.ts';
import Quiz from '../models/Quiz.ts';
import Category from '../models/Category.ts';

// --- CONFIG ---

const MONGO_URI = 'mongodb://localhost:27017/QuizApp';
const QUESTIONS_PER_QUIZ = 10;

// --- SAMPLE DATA ---
const categoriesData = [
  {
    name: 'Web Development',
    tags: [
      { name: 'HTML', slug: 'html' },
      { name: 'CSS', slug: 'css' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
    ],
    description: 'Frontend & backend web development quizzes',
  },
  {
    name: 'Databases',
    tags: [
      { name: 'SQL', slug: 'sql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'PostgreSQL', slug: 'postgresql' },
    ],
    description: 'Database fundamentals',
  },
  {
    name: 'Programming Fundamentals',
    tags: [
      { name: 'Variables', slug: 'variables' },
      { name: 'Loops', slug: 'loops' },
      { name: 'Functions', slug: 'functions' },
      { name: 'OOP', slug: 'oop' },
      { name: 'Data Structures', slug: 'data-structures' },
    ],
    description: 'Core programming concepts',
  },
  {
    name: 'Dev Tools',
    tags: [
      { name: 'Git', slug: 'git' },
      { name: 'CLI', slug: 'cli' },
      { name: 'VSCode', slug: 'vscode' },
    ],
    description: 'Development tools and best practices',
  },
  {
    name: 'Algorithms & Data Structures',
    tags: [
      { name: 'Sorting', slug: 'sorting' },
      { name: 'Searching', slug: 'searching' },
      { name: 'Trees', slug: 'trees' },
      { name: 'Graphs', slug: 'graphs' },
    ],
    description: 'Test your algorithm and data structure knowledge',
  }
];

const quizzesPerCategory = [
  { titleSuffix: 'Basics', difficulty: 'Easy', timeLimit: 15 },
  { titleSuffix: 'Intermediate', difficulty: 'Medium', timeLimit: 20 },
  { titleSuffix: 'Advanced', difficulty: 'Hard', timeLimit: 25 },
];

// --- HELPER FUNCTIONS ---
const generateSlug = (text: string) => slugify(text, { lower: true, strict: true });

const generateQuestions = (quizId: mongoose.Types.ObjectId, topic: string) => {
  // Example questions per category (you can expand later)
  const sampleQuestions = [
    {
      questionText: `What is ${topic}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: `${topic} is an important concept in this domain.`,
      difficulty: 'Medium',
    },
    {
      questionText: `Which of the following is true about ${topic}?`,
      options: ['True A', 'True B', 'True C', 'True D'],
      correctAnswer: 1,
      explanation: `Correct statement about ${topic}.`,
      difficulty: 'Medium',
    },
    {
      questionText: `How does ${topic} affect development?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 2,
      explanation: `Explanation about ${topic} in development.`,
      difficulty: 'Medium',
    },
    {
      questionText: `Why is ${topic} important?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 3,
      explanation: `${topic} matters because...`,
      difficulty: 'Medium',
    },
  ];

  const questions = [];
  for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
    const qTemplate = sampleQuestions[i % sampleQuestions.length];
    questions.push({
      ...qTemplate,
      quizId,
      questionText: `${qTemplate.questionText} (#${i + 1})`,
    });
  }
  return questions;
};

// --- SEED FUNCTION ---
const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear collections
    await Question.deleteMany({});
    await Quiz.deleteMany({});
    await Category.deleteMany({});
    console.log('Old collections cleared');

    const savedCategories: any[] = [];

    // Insert categories
    for (const cat of categoriesData) {
      const newCat = new Category({
        ...cat,
        slug: generateSlug(cat.name),
      });
      const savedCat = await newCat.save();
      savedCategories.push(savedCat);
    }
    console.log('Categories seeded');

    // Insert quizzes and questions
    for (const cat of savedCategories) {
      for (const q of quizzesPerCategory) {
        const quiz = new Quiz({
          title: `${cat.name} ${q.titleSuffix}`,
          slug: generateSlug(`${cat.name} ${q.titleSuffix}`),
          description: `Test your knowledge of ${cat.name} (${q.titleSuffix})`,
          category: cat._id,
          difficulty: q.difficulty,
          timeLimit: q.timeLimit,
          createdBy: null,
        });
        const savedQuiz = await quiz.save();

        const questions = generateQuestions(savedQuiz._id, `${cat.name} ${q.titleSuffix}`);
        await Question.insertMany(questions);
        console.log(`Quiz '${savedQuiz.title}' with questions seeded`);
      }
    }

    console.log('Seeding complete!');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
