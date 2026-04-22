import { Category, CategoryWithQuizzes, PublicQuestion, Quiz } from "@/modules/quiz/types/quiz.types"
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
    const res = await api.get<PublicQuestion[]>(`/quizzes/${id}/questions`)
    return res.data
}

export const submitQuizAnswers = async (data: {quizId: string, selectedOptions: number[]}) => {
    const res = await api.post("/quizzes/submit", data)
    return res.data
}

export const fetchRandomQuiz = async (): Promise<Quiz[]> => {
    const res = await api.get<Quiz[]>("/quizzes/random")
    return res.data
}
