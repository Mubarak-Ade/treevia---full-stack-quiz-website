import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import QuizService from './quiz.service.js';
import { AppError } from '../../utils/error-handler.js';
import { successResponse } from '../../utils/response.js';

interface AuthRequest extends Request {
    user?: any;
    params: {
        id?: string;
        quizId?: string;
        questionId?: string;
    };
}

export const getQuizzes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const quizzes = await QuizService.getQuizzes(
            req.query.category as string | string[] | undefined
        );
        res.json(quizzes);
    } catch (error) {
        next(error);
    }
};

export const submitQuiz = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { quizId, selectedOptions } = req.body;

		const userId = req.user
        const payload = await QuizService.submitQuiz(quizId, selectedOptions, userId);
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const getQuestions = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
        const quizId = req.params.quizId as string
        const questions = await QuizService.getQuestions(quizId, req.user);
        successResponse(res, "", questions);
};

export const getRandomQuiz = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const randomQuiz = await QuizService.getRandomQuiz();
        res.json(randomQuiz);
    } catch (error) {
        next(error);
    }
};
