import 'dotenv/config';
import mongoose from 'mongoose';
import slugify from '@sindresorhus/slugify';
import env from '../config/env.js';
import Quiz from '../modules/quiz/quiz.model.js';
import Question from '../modules/quiz/question.model.js';
import Category from '../modules/category/category.model.js';
import { Categories } from './seedData.js';

const createSeed = async () => {
    await mongoose.connect(env.MONGO_URI);
    console.log('Connected to db successfull');

    const MOCK_USER_ID = '69cceaec680ccda4b6f2ef8b';
    const category1 = '69ea3141e9bf0e031ed75129';
    const category2 = '69ea3141e9bf0e031ed7512a';
    const category3 = '69ea3141e9bf0e031ed7512b';

    const question1 = await Question.insertMany([
        {
            prompt: 'Which company created React?',
            options: [
                { label: 'A', text: 'Google', isCorrect: false },
                { label: 'B', text: 'Microsoft', isCorrect: false },
                { label: 'C', text: 'Facebook (Meta)', isCorrect: true },
                { label: 'D', text: 'Twitter', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Who Played Iron Man?',
            options: [
                { label: 'A', text: 'Chris Evans', isCorrect: false },
                { label: 'B', text: 'Robert Downey Jr.', isCorrect: true },
                { label: 'C', text: 'Tom Holland', isCorrect: false },
                { label: 'D', text: 'Mark Ruffalo', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Which movie won Best Picture in 2020?',
            options: [
                { label: 'A', text: 'Joker', isCorrect: false },
                { label: 'B', text: 'Parasite', isCorrect: true },
                { label: 'C', text: '1917', isCorrect: false },
                { label: 'D', text: 'Once Upon a Time in Hollywood', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Which studio made Toy Story?',
            options: [
                { label: 'A', text: 'DreamWorks', isCorrect: false },
                { label: 'B', text: 'Disney', isCorrect: false },
                { label: 'C', text: 'Pixar', isCorrect: true },
                { label: 'D', text: 'Illumination', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: "The character 'Neo' appears in:",
            options: [
                { label: 'A', text: 'Inception', isCorrect: false },
                { label: 'B', text: 'The Matrix', isCorrect: true },
                { label: 'C', text: 'Avatar', isCorrect: false },
                { label: 'D', text: 'Tenet', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: "Who directed 'Titanic'?",
            options: [
                { label: 'A', text: 'Steven Spielberg', isCorrect: false },
                { label: 'B', text: 'James Cameron', isCorrect: true },
                { label: 'C', text: 'Christopher Nolan', isCorrect: false },
                { label: 'D', text: 'Ridley Scott', isCorrect: false },
            ],
            difficulty: 'easy',
        },
    ]);

    const question2 = await Question.insertMany([
        {
            prompt: 'Saving money means:',
            options: [
                { label: 'A', text: 'Hiding cash', isCorrect: false },
                { label: 'B', text: 'Spending less than you earn', isCorrect: true },
                { label: 'C', text: 'Avoiding banks', isCorrect: false },
                { label: 'D', text: 'Investing only', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Inflation does what to money?',
            options: [
                { label: 'A', text: 'Increases value', isCorrect: false },
                { label: 'B', text: 'Keeps it stable', isCorrect: false },
                { label: 'C', text: 'Reduces purchasing power', isCorrect: true },
                { label: 'D', text: 'Doubles it', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Which is a liability?',
            options: [
                { label: 'A', text: 'Salary', isCorrect: false },
                { label: 'B', text: 'Investment', isCorrect: false },
                { label: 'C', text: 'Credit card debt', isCorrect: true },
                { label: 'D', text: 'Savings', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Budgeting helps you:',
            options: [
                { label: 'A', text: 'Spend more', isCorrect: false },
                { label: 'B', text: 'Track and control spending', isCorrect: true },
                { label: 'C', text: 'Avoid work', isCorrect: false },
                { label: 'D', text: 'Get rich instantly', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'Emergency funds should ideally cover:',
            options: [
                { label: 'A', text: '1 week', isCorrect: false },
                { label: 'B', text: '1 month', isCorrect: false },
                { label: 'C', text: '3-6 months', isCorrect: true },
                { label: 'D', text: '1 year', isCorrect: false },
            ],
            difficulty: 'easy',
        },
        {
            prompt: 'JWT is commonly used for:',
            options: [
                { label: 'A', text: 'Database migrations', isCorrect: false },
                { label: 'B', text: 'Authentication', isCorrect: true },
                { label: 'C', text: 'CSS styling', isCorrect: false },
                { label: 'D', text: 'Frontend routing', isCorrect: false },
            ],
            difficulty: 'easy',
        },
    ]);

    const question3 = await Question.insertMany([
        {
            prompt: 'Why do people fear public speaking?',
            options: [
                { label: 'A', text: 'Lack of skill', isCorrect: false },
                { label: 'B', text: 'Fear of judgment', isCorrect: true },
                { label: 'C', text: 'Loud rooms', isCorrect: false },
                { label: 'D', text: 'Poor memory', isCorrect: false },
            ],
            difficulty: 'medium',
        },
        {
            prompt: 'Decision fatigue happens when you:',
            options: [
                { label: 'A', text: 'Sleep less', isCorrect: false },
                { label: 'B', text: 'Make too many decisions', isCorrect: true },
                { label: 'C', text: 'Eat late', isCorrect: false },
                { label: 'D', text: 'Think deeply', isCorrect: false },
            ],
            difficulty: 'medium',
        },
        {
            prompt: 'The brain prefers:',
            options: [
                { label: 'A', text: 'New habits', isCorrect: false },
                { label: 'B', text: 'Complexity', isCorrect: false },
                { label: 'C', text: 'Familiar patterns', isCorrect: true },
                { label: 'D', text: 'Chaos', isCorrect: false },
            ],
            difficulty: 'medium',
        },
        {
            prompt: 'Which emotion is strongest for memory?',
            options: [
                { label: 'A', text: 'Happiness', isCorrect: false },
                { label: 'B', text: 'Fear', isCorrect: true },
                { label: 'C', text: 'Calmness', isCorrect: false },
                { label: 'D', text: 'Boredom', isCorrect: false },
            ],
            difficulty: 'medium',
        },
        {
            prompt: 'Multitasking usually makes you:',
            options: [
                { label: 'A', text: 'Faster', isCorrect: false },
                { label: 'B', text: 'Smarter', isCorrect: false },
                { label: 'C', text: 'Less Productive', isCorrect: true },
                { label: 'D', text: 'More creative', isCorrect: false },
            ],
            difficulty: 'medium',
        },
        {
            prompt: 'What is a key principle of frontend development?',
            options: [
                { label: 'A', text: 'Separation of concerns', isCorrect: true },
                { label: 'B', text: 'Database normalization', isCorrect: false },
                { label: 'C', text: 'Continuous deployment', isCorrect: false },
                { label: 'D', text: 'Container orchestration', isCorrect: false },
            ],
            difficulty: 'medium',
        },
    ]);

    // Create quiz and add all questions
    const questions1 = question1.map((q, i) => ({ questionId: q._id, order: i + 1 }));
    const questions2 = question2.map((q, i) => ({ questionId: q._id, order: i + 1 }));
    const questions3 = question3.map((q, i) => ({ questionId: q._id, order: i + 1 }));

    const quiz = await Quiz.insertMany([
        {
            title: 'Movie Trivia Basics',
            description: 'Test your knowledge of popular movies and actors',
            difficulty: 'easy',
            status: 'published',
            isPublic: true,
            xpReward: 400,
            timeLimitPerQuestion: 30,
            shuffleQuestions: true,
            coverImage: 'https://via.placeholder.com/300x200?text=Movies',
            category: category1,
            questions: questions1,
            createdBy: MOCK_USER_ID
        },
        {
            title: 'Personal Finance Fundamentals',
            description: 'Essential concepts for managing personal finances',
            difficulty: 'easy',
            status: 'published',
            isPublic: true,
            xpReward: 550,
            timeLimitPerQuestion: 30,
            shuffleQuestions: true,
            coverImage: 'https://via.placeholder.com/300x200?text=Finance',
            category: category2,
            questions: questions2,
            createdBy: MOCK_USER_ID
        },
        {
            title: 'Psychology & Decision Making',
            description: 'Understanding cognitive biases and decision-making processes',
            difficulty: 'medium',
            status: 'published',
            isPublic: true,
            xpReward: 650,
            timeLimitPerQuestion: 60,
            shuffleQuestions: true,
            coverImage: 'https://via.placeholder.com/300x200?text=Psychology',
            category: category3,
            questions: questions3,
            createdBy: MOCK_USER_ID
        },
    ]);

    console.log('Quiz Seeded successfully with all questions');
    // console.log(`Created Quiz: ${quiz.title} with ${quiz.stats.questionCount} questions`);
    await mongoose.disconnect();
};

createSeed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
