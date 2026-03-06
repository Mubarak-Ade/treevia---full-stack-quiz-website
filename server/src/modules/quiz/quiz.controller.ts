import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import QuizService from "./quiz.service.js";

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
    const quizzes = await QuizService.getQuizzes(req.query.category as string | string[] | undefined);
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
    const payload = await QuizService.submitQuiz(quizId, selectedOptions, req.user?.id);
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
  try {
    const quizId = req.params.quizId;
    if (!quizId) {
      throw createHttpError(400, "quizId is required");
    }

    const questions = await QuizService.getQuestions(quizId, req.user?.id);
    res.json(questions);
  } catch (error) {
    next(error);
  }
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
