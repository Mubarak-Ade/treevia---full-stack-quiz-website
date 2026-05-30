import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchQuizByCategories, fetchQuizQuestion, fetchRandomQuiz, startQuiz, submitQuizAnswers } from "../services/quiz-api.service";
import { Category, Quiz, SelectedAnswer } from "@/modules/quiz/types/quiz.types";

export const useFetchQuizzesByCategory = (slug: string) => {
    // const category = useQuizStore(s => s.category)
    // const params = {category}
    return useQuery({
        queryKey: ["quizzes", slug],
        queryFn: () => fetchQuizByCategories(slug),
        enabled: !!slug,
    })
}

export const useFetchQuestion = (id: string) => {
    return useQuery({
        queryKey: ["quizzes", "question", id],
        queryFn: () => fetchQuizQuestion(id),
        enabled: !!id,
    })
}

export const useFetchCategories = (params?: { searchTerm?: string }) => useQuery<Category[]>({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories(params)
})

export const useSubmitAnswers = (quizId: string) => {
    return useMutation({
        mutationFn: (data:  SelectedAnswer[]) => submitQuizAnswers(quizId, data),
    })
}

export const useStartQuiz = (quizId: string) => {
    return useMutation({
        mutationFn: () => startQuiz(quizId),
    })
}

export const useFetchRandomQuiz = () => {
    return useQuery<Quiz[]>({
        queryKey: ["random"],
        queryFn: fetchRandomQuiz,
        initialData: []
    })
}
