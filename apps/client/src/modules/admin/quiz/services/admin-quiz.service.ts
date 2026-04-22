import api from '@/utils/axios';
import {
    AdminQuestionResponse,
    AdminQuizListResponse,
    AdminQuizResponse,
    QuestionMutationPayload,
    QuizMutationPayload,
} from '../types/admin-quiz.types';

export const getQuizzes = async (): Promise<AdminQuizListResponse> => {
    const res = await api.get<AdminQuizListResponse>('/admin/quizzes');
    return res.data;
};

export const getQuiz = async (id: string): Promise<AdminQuizResponse> => {
    const res = await api.get<AdminQuizResponse>(`/admin/quizzes/${id}`);
    return res.data;
};

export const createQuiz = async (payload: QuizMutationPayload): Promise<AdminQuizResponse> => {
    const res = await api.post<AdminQuizResponse>('/admin/quizzes', payload);
    return res.data;
};

export const updateQuiz = async (
    id: string,
    payload: Partial<QuizMutationPayload>
): Promise<AdminQuizResponse> => {
    const res = await api.patch<AdminQuizResponse>(`/admin/quizzes/${id}`, payload);
    return res.data;
};

export const publishQuiz = async (id: string): Promise<AdminQuizResponse> => {
    const res = await api.post<AdminQuizResponse>(`/admin/quizzes/${id}/publish`);
    return res.data;
};

export const deleteQuiz = async (id: string): Promise<AdminQuizResponse> => {
    const res = await api.delete<AdminQuizResponse>(`/admin/quizzes/${id}`);
    return res.data;
};

export const createQuestion = async (
    payload: QuestionMutationPayload
): Promise<AdminQuestionResponse> => {
    const res = await api.post<AdminQuestionResponse>('/admin/questions', payload);
    return res.data;
};

export const updateQuestion = async (
    id: string,
    payload: QuestionMutationPayload
): Promise<AdminQuestionResponse> => {
    const res = await api.patch<AdminQuestionResponse>(`/admin/questions/${id}`, payload);
    return res.data;
};

export const addQuestionToQuiz = async (
    quizId: string,
    questionId: string
): Promise<AdminQuizResponse> => {
    const res = await api.post<AdminQuizResponse>(
        `/admin/questions/${quizId}/addQuestion/${questionId}`
    );
    return res.data;
};

export const removeQuestionFromQuiz = async (
    quizId: string,
    questionId: string
): Promise<AdminQuizResponse> => {
    const res = await api.delete<AdminQuizResponse>(`/admin/questions/${quizId}/remove/${questionId}`);
    return res.data;
};
