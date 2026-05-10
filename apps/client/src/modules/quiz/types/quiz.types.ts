// import { Quiz } from "@/types"
import { Leaderboard } from '@/pages/Leaderboard';

interface Tag {
    _id?: string;
    name: string;
}

export interface Category {
    _id?: string;
    name: string;
    slug?: string;
    description: string;
    quizCount?: number;
    tags: Tag[] | string[];
    updatedAt?: string;
}

export interface CategoryWithQuizzes {
    name: Category['name'];
    description: Category['description'];
    tags: Category['tags'];
    quizzes: Quiz[];
}

export interface Quiz {
    _id: string;
    createdAt?: string;
    status?: string;
    title: string;
    imageUrl?: string;
    coverImage?: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'easy' | 'medium' | 'hard';
    category?: {
        _id: string;
        name: string;
    };
    timeLimit?: number;
    timeLimitPerQuestion?: number;
    updatedAt?: string;
    stats?: {
        questionCount?: number;
        estimatedDurationMinutes?: number;
        estimatedSuccessRate?: number;
    };
    questionCount?: number;
    questions?: Question[];
}

export interface FilterQuiz {
    quizzes: Quiz[];
    filter: {
        page?: number;
        pages?: number;
        total?: number;
        limit?: number;
    };
}

export interface Question {
    _id?: string;
    quizId?: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
}

export interface Options {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
}

export interface PublicQuestion {
    _id?: string;
    prompt: string;
    options: Options[];
    difficulty: 'easy' | 'medium' | 'hard';
    explanation?: string;
}

export interface SelectedAnswer {
    questionId: string;
    label: Options['label'];
}

export interface QuizWithCategory {
    category: Category['name'];
    tags: Category['tags'];
    categoryDescription: Category['description'];
    quizzes: Quiz[];
}

export interface AttemptAnswer {
    questionId: string;
    selectedOptionLabel?: string;
    selectOptionLabel?: string;
    correctOptionText?: string;
    isCorrect: boolean;
}

export interface AttemptRecord {
    answers: AttemptAnswer[];
    createdAt: string;
    quiz: string;
    score: number;
    startedAt: string;
    status: string;
    submittedAt: string;
    timeTaken: number;
    updatedAt: string;
    user: string;
    xpEarned: number;
}

export interface Result {
    attempt: AttemptRecord;
    accuracy: number;
}

export interface GetResult {
    _id?: string;
    quiz?: string;
    answers: {
        questionId: string;
        selectOptionLabel?: string;
        isCorrect: boolean;
    }[];
    category: string;
    user: string;
    // quiz: string;
    xpEarned: number;
    score: number;
    createdAt: string;
    updatedAt: string;
}

export interface Stats {
    _id: string;
    user: string;
    accuracy: number;
    createdAt: string;
    currentStreak: number;
    highestScore: number;
    lastQuizDate: string;
    level: number;
    rank: number;
    longestStreak: number;
    quizzesTaken: number;
    totalCorrect: number;
    totalFailed: number;
    totalXp: number;
    updatedAt: number;
    xp: {
        currentLevel: number;
        totalXp: number;
        levelStartXp: number;
        levelEndXp: number;
        progress: number;
        needed: number;
        total: number;
    };
}

export interface Leaderboard {
    leaderboard: {
        _id: string;
        profile: string;
        user: string;
        totalXp: number;
    }[];
    userRank: {
        rank: number;
        name: string;
        profile: string;
        totalXp: number;
    };
}
