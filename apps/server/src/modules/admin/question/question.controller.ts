import { Request, Response } from 'express';
import { AdminQuestionService } from './question.service.js';
import { successResponse } from '../../../utils/response.js';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
    const question = await AdminQuestionService.getQuestions();
    successResponse(res, 'Fetched Question Sucessfully', question);
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string;
    const quiz = await AdminQuestionService.createQuestion(req.body);
    successResponse(res, 'Question created successfully', quiz, 201);
};

export const addQuestion = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizId;
    const questionId = req.params.questionId;
    const userId = req.user as string;
    const quiz = await AdminQuestionService.addQuestionToQuiz(quizId, questionId, userId);
    successResponse(res, 'Question added to quiz successfully', quiz, 201);
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
    const questionId = req.params.id;
    const question = await AdminQuestionService.updateQuestion(req.body, questionId);
    successResponse(res, 'Question updated successfully', question, 201);
};

export const removeQuestion = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizId
    const questionId = req.params.questionId
    const userId = req.user as string
    const question = await AdminQuestionService.removeQuestion(quizId, questionId, userId)
    successResponse(res, "Question removed from quiz", question, 200)
}