// import { Quiz } from "@/types"

interface Category {
    // import { Quiz } from '../types/index';
    name: string,
    description: string
    quizCount: number,
    tags: [string]
}

export interface Quiz {
    id: string
    title: string,
    difficulty: 'easy' | 'medium' | 'hard',
    timeLimit: number,
    description: string,
    questionCount: number
}

export interface QuizWithCategory {
    category: Category["name"],
    tags: Category["tags"],
    categoryDescription: Category["description"],
    quizzes: Quiz[],
}