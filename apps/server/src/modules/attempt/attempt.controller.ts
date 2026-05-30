import { Request, Response } from 'express';
import AttemptService from './attempt.services.js';
import { successResponse } from '../../utils/response.js';

export const getAttempt = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string
    const attempt = await AttemptService.getAttempt(userId, req.query as any)
    successResponse(res, "", attempt)
}

export const getSingleAttempt = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string
    const quizId = req.params.id
    const attempt = await AttemptService.getSingleAttempt(userId, quizId)
    successResponse(res, "", attempt)
}

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizId;
    const userId = req.user as string;
    const quiz = await AttemptService.submitQuiz(quizId, req.body, userId);
    successResponse(res, 'Quiz Submitted Successfully', quiz, 201);
};

export const startQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizId;
    const userId = req.user as string;
    const result = await AttemptService.startQuiz(quizId, userId);
    successResponse(res, 'Quiz Have Started', result, 201);
};
