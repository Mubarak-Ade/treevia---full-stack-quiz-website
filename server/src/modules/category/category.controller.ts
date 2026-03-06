import { RequestHandler } from "express";
import CategoryService from "./category.service.js";

interface QuizParams {
  slug: string;
}

export const getQuizByCategory: RequestHandler<QuizParams> = async (req, res, next): Promise<void> => {
  try {
    const slug = req.params.slug;
    const quizzes = await CategoryService.getQuizByCategory(slug);
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const getCategories: RequestHandler = async (_req, res, next): Promise<void> => {
  try {
    const categories = await CategoryService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
