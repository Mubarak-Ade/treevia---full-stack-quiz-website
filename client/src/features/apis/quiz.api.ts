import api from "@/utils/axios"

export const fetchQuizzes  = async (params: string) => {
    const res = await api.get("/quiz", {params})
    return res.data
}

export const fetchCategories = async () : Promise<void> => {
    const res = await api.get("/categories")
    return res.data
}

export const fetchQuizByCategories = async (slug: string) : Promise<void> => {
    const res = await api.get(`/categories/${slug}/quizzes`)
    return res.data
}

export const fetchQuizQuestion = async (id: string): Promise<void> =>  {
    const res = await api.get(`/quizzes/${id}/questions`)
    return res.data
}

export const submitQuizAnswers = async (data: {quizId: string, selectedOption: number[]}) : Promise<void> => {
    const res = await api.post("/quizzes/submit", data)
    return res.data
}