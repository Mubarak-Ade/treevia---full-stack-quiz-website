import { Response } from "@/modules/auth/types/auth.types"
import { Category, CategoryWithQuizzes, PublicQuestion, Quiz, Result, SelectedAnswer } from "@/modules/quiz/types/quiz.types"
import api from "@/utils/axios"

export const fetchQuizzes  = async (params: string) => {
    const res = await api.get("/quizzes", {params})
    return res.data
}

export const fetchCategories = async () : Promise<Category[]> => {
    const res = await api.get<Category[]>("/categories")
    return res.data
}

export const fetchQuizByCategories = async (slug: string) : Promise<CategoryWithQuizzes> => {
    const res = await api.get<CategoryWithQuizzes>(`/categories/${slug}/quizzes`)
    return res.data
}

export const fetchQuizQuestion = async (id: string): Promise<PublicQuestion[]> =>  {
    const res = await api.get<Response<PublicQuestion[]>>(`/quizzes/${id}/questions`)
    return res.data.data
}

export const startQuiz = async (quizId: string): Promise<void> => {
    const res = await api.post(`/attempts/${quizId}/start`)
    return res.data
}

export const submitQuizAnswers = async (quizId: string, data: SelectedAnswer[]): Promise<Result> => {
    const res = await api.post<Result>(`/attempts/${quizId}/submit`, data)
    return res.data
}

export const fetchRandomQuiz = async (): Promise<Quiz[]> => {
    const res = await api.get<Quiz[]>("/quizzes/random")
    return res.data
}
