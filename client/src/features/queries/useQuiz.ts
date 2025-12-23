import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchQuizByCategories, fetchQuizQuestion, submitQuizAnswers } from "../apis/quiz.api";
import { Category, Question } from "@/models/Quiz";

export const useFetchQuizzes = (slug: string) => {
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