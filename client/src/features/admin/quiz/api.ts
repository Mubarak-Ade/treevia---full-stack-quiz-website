import { FilterQuiz, Question } from "@/features/quiz/types"
import api from "@/utils/axios"

export const getQuizzes = async () : Promise<FilterQuiz> => {
    const res = await api.get<FilterQuiz>("/admin/quiz")
    return res.data
}

interface QuizState {
    title: string,
    description?: string, 
    timeLimit: number,
    category: string,
    level?: "Easy" | "Medium" | "Hard"
    questions?: Question[]
}

export const createQuiz = async (data: QuizState) : Promise<QuizState> => {
    const res = await api.post("/admin/quiz", data)
    return res.data
}

interface updateQuizState {
    id: string, 
    data: QuizState
}

export const updateQuiz = async ({id, data} : updateQuizState) : Promise<QuizState> => {
    const res = await api.patch(`/admin/quiz/${id}`, data)
    return res.data
}

export const deleteQuiz = async (id: string) : Promise<void> => {
    const res = await api.delete(`/admin/quiz/${id}`)
    return res.data
}