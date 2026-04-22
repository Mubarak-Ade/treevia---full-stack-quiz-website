import { Request, Response } from 'express';
import { successResponse } from '../../../utils/response.js';
import AdminQuizService from './quiz.service.js';

export const getAllQuiz = async (req: Request, res: Response): Promise<void> => {
    const payload = await AdminQuizService.getAllQuiz(req.query);
    successResponse(res, 'Fetched quizzes successfully', payload);
    res.json(payload);
};

export const createQuiz = async (req: Request, res: Response): Promise<void> => {
    const payload = await AdminQuizService.createQuiz(req.body, req.user as string);
    successResponse(res, 'Created draft quiz successfully', payload, 201);
};

export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string;
    const payload = await AdminQuizService.updateQuiz(req.params.id, req.body, userId);
    successResponse(res, 'Updated draft quiz successfully', payload, 201);
};

export const getSingleQuiz = async (req: Request, res: Response): Promise<void> => {
    const payload = await AdminQuizService.getSingleQuiz(req.params.id);
    successResponse(res, 'Fetched quizzes successfully', payload);
};

export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string;
    const quiz = await AdminQuizService.deleteQuiz(req.params.id, userId);
    successResponse(res, 'Quiz Deleted Successfully', quiz, 201)
};

export const publishQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id as string;
    const userId = req.user as string;
    const quiz = await AdminQuizService.publishQuiz(quizId, userId);
    successResponse(res, 'Quiz Published Successfully', quiz, 201);
};

export const saveDraft = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user as string;
    const quizId = req.params.id;
    const data = req.body;
    const quiz = await AdminQuizService.saveDraft(quizId, data, userId);
    successResponse(res, 'Draft Saved Successfully', quiz, 201);
};

export const archiveQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id;
    const userId = req.user as string;
    const quiz = await AdminQuizService.archiveQuiz(quizId, userId);
    successResponse(res, 'Quiz Archived', quiz, 201);
};

export const recoverQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.id
    const userId = req.user as string
    const quiz = await AdminQuizService.recoverQuiz(quizId, userId)
    successResponse(res, "Quiz Successfully recoverd", quiz, 201)
}