import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, fetchQuizByCategories, fetchQuizQuestion, submitQuizAnswers } from "../apis/quiz.api";

export const useFetchQuizzes = (slug: string) => {
    // const category = useQuizStore(s => s.category)
    // const params = {category}
    return useQuery({
        queryKey: ["quizzes", slug],
        queryFn: () => fetchQuizByCategories(slug)
    })
}

export const useFetchQuestion = (id: string) => {
    return useQuery({
        queryKey: ["quizzes", "question", id],
        queryFn: () => fetchQuizQuestion(id)
    })
}

export const useFetchCategories = () => useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
})

export const useSubmitAnswers = () => {
    return useMutation({
        mutationFn: submitQuizAnswers,
    })
}