import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addQuestionToQuiz,
    createQuestion,
    createQuiz,
    deleteQuiz,
    getQuiz,
    getQuizzes,
    publishQuiz,
    removeQuestionFromQuiz,
    updateQuestion,
    updateQuiz,
} from '../services/admin-quiz.service';

export const useFetchQuizzes = () =>
    useQuery({
        queryKey: ['admin-quizzes'],
        queryFn: getQuizzes,
    });

export const useFetchQuiz = (id?: string) =>
    useQuery({
        queryKey: ['admin-quizzes', id],
        queryFn: () => getQuiz(id as string),
        enabled: Boolean(id),
    });

export const useCreateQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
        },
    });
};

export const useUpdateQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateQuiz>[1] }) =>
            updateQuiz(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes', variables.id] });
        },
    });
};

export const usePublishQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: publishQuiz,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes', id] });
        },
    });
};

export const useDeleteQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
        },
    });
};

export const useCreateQuestion = () => useMutation({ mutationFn: createQuestion });

export const useUpdateQuestion = () =>
    useMutation({
        mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateQuestion>[1] }) =>
            updateQuestion(id, data),
    });

export const useAddQuestionToQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ quizId, questionId }: { quizId: string; questionId: string }) =>
            addQuestionToQuiz(quizId, questionId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes', variables.quizId] });
        },
    });
};

export const useRemoveQuestionFromQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ quizId, questionId }: { quizId: string; questionId: string }) =>
            removeQuestionFromQuiz(quizId, questionId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['admin-quizzes', variables.quizId] });
        },
    });
};
