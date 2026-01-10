import { FilterQuiz } from "@/features/quiz/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQuiz, deleteQuiz, getQuizzes, updateQuiz } from "./api";

export const useFetchQuizzes = () => useQuery<FilterQuiz>({
    queryKey: ["filter-quiz"],
    queryFn: getQuizzes,
    initialData: {
        quizzes: [],
        page: 0,
        pages: 0,
        total: 0
    } as FilterQuiz
})

export const useCreateQuiz = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filter-quiz"] })
        }
    })
}

export const useDeleteQuiz = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["filter-quiz"] })
        }
    })
}

export const useUpdateQuiz = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["filter-quiz"]})
        }
    })
    
}