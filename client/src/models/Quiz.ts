// import { Quiz } from "@/types"

interface Tag {
    _id?: string;
    name: string;
}

export interface Category {
    name: string;
    slug: string;
    description: string;
    quizCount?: number;
    tags: Tag[];
}

export interface CategoryWithQuizzes {
    category: Category["name"],
    description: Category["description"],
    tags: Category["tags"],
    quizzes: Quiz[],
}

export interface Quiz {
    _id: string
    title: string,
    difficulty: 'easy' | 'medium' | 'hard',
    timeLimit: number,
    description: string,
    questionCount?: number
}

export interface Question {
    _id: string,
    quizId: string,
    questionText: string,
    options: string[],
    correctOption: number,
}

export interface QuizWithCategory {
    category: Category["name"],
    tags: Category["tags"],
    categoryDescription: Category["description"],
    quizzes: Quiz[],
}