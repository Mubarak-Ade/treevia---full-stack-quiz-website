import { Response } from '@/modules/auth/types/auth.types';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuizStatus = 'draft' | 'published' | 'archived';

export interface AdminQuestionOption {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
}

export interface AdminQuestion {
    _id: string;
    prompt: string;
    difficulty?: QuizDifficulty;
    order?: number;
    options: AdminQuestionOption[];
}

export interface AdminQuiz {
    _id: string;
    title: string;
    status: QuizStatus;
    difficulty: QuizDifficulty;
    createdAt: string;
    updatedAt: string;
    coverImage?: string;
    timeLimitPerQuestion: number;
    xpReward: number;
    isPublic: boolean;
    shuffleQuestions: boolean;
    category?: {
        _id: string;
        name: string;
    };
    questions?: AdminQuestion[];
    stats?: {
        questionCount?: number;
    };
}

export interface AdminQuizFilter {
    quizzes: AdminQuiz[];
    filter: {
        page?: number;
        pages?: number;
        total?: number;
        limit?: number;
    };
}

export interface QuizMutationPayload {
    title: string;
    category: string;
    difficulty: QuizDifficulty;
    timeLimitPerQuestion: number;
    xpReward: number;
    isPublic: boolean;
    shuffleQuestions: boolean;
}

export interface QuestionMutationPayload {
    prompt: string;
    difficulty: QuizDifficulty;
    options: AdminQuestionOption[];
}

export type AdminQuizListResponse = Response<AdminQuizFilter>;
export type AdminQuizResponse = Response<AdminQuiz>;
export type AdminQuestionResponse = Response<AdminQuestion>;
