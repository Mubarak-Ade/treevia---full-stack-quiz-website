import { Category, Question, Quiz } from "@/models/Quiz"
import api from "@/utils/axios"

export const fetchQuizzes  = async (params: string) => {
    const res = await api.get("/quiz", {params})
    return res.data
}

export const fetchCategories = async () : Promise<Category[]> => {
    const res = await api.get<Category[]>("/categories")
    return res.data
}

export const fetchQuizByCategories = async (slug: string) : Promise<void> => {
    const res = await api.get(`/categories/${slug}/quizzes`)
    return res.data
}

export const fetchQuizQuestion = async (id: string): Promise<Question[]> =>  {
    const res = await api.get<Question[]>(`/quizzes/${id}/questions`)
    return res.data
}

export const submitQuizAnswers = async (data: {quizId: string, selectedOptions: number[]}) : Promise<void> => {
    const res = await api.post("/quizzes/submit", data)
    return res.data
}

export const fetchRandomQuiz = async (): Promise<Quiz[]> => {
    const res = await api.get<Quiz[]>("/quizzes/random")
    return res.data
}