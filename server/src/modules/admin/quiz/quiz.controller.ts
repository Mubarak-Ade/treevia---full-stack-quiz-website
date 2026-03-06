import { RequestHandler } from "express";
import AdminQuizService, { type CreateQuizBody, type QuizQuery } from "./quiz.service.js";

export const getAllQuiz: RequestHandler<unknown, unknown, unknown, QuizQuery> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await AdminQuizService.getAllQuiz(req.query);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const createQuiz: RequestHandler<unknown, unknown, CreateQuizBody> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await AdminQuizService.createQuiz(req.body);
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz: RequestHandler<{ id: string }, unknown, CreateQuizBody> = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const payload = await AdminQuizService.updateQuiz(req.params.id, req.body);
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
};

export const getSingleQuiz: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const quiz = await AdminQuizService.getSingleQuiz(req.params.id);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload = await AdminQuizService.deleteQuiz(req.params.id);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};
