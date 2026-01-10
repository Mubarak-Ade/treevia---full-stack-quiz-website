import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchQuizByCategories, fetchQuizQuestion, fetchRandomQuiz, submitQuizAnswers } from "./quiz.api";
import { Category, Question, Quiz } from "@/features/quiz/types";

export const useFetchQuizzesByCategory = (slug: string) => {
    // const category = useQuizStore(s => s.category)
    // const params = {category}
    return useQuery({
        queryKey: ["quizzes", slug],
        queryFn: () => fetchQuizByCategories(slug)
    })
}

export const useFetchQuestion = (id: string) => {
    return useQuery<Question[]>({
        queryKey: ["quizzes", "question", id],
        queryFn: () => fetchQuizQuestion(id),
        enabled: !!id,
    })
}

export const useFetchCategories = () => useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories
})

export const useSubmitAnswers = () => {
    return useMutation({
        mutationFn: submitQuizAnswers,
    })
}

export const useFetchRandomQuiz = () => {
    return useQuery<Quiz[]>({
        queryKey: ["random"],
        queryFn: fetchRandomQuiz,
        initialData: []
    })
}