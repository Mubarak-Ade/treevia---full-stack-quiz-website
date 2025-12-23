import { RequestHandler } from "express"
import Category from "../models/Category.js"
import createHttpError from "http-errors"
import Quiz from "../models/Quiz.js"
import Question from "../models/Question.js"

interface QuizParams {
    slug: string
}

export const getQuizByCategory: RequestHandler<QuizParams, unknown, unknown, unknown> = async (req, res, next): Promise<void> => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
        if (!category) {
            throw createHttpError(404, "Category is not found")
        }
        const quizzes = await Quiz.find({ category: category._id })
        const quizzesWithQuestionCount = await Promise.all(quizzes.map(async (quiz) => {
            const questionCount = await Question.countDocuments({ quizId: quiz._id })
            return {
                ...quiz.toObject(),
                questionCount
            }
        }))
        res.json({ category: category.name, description: category.description, tags: category.tags, quizzes: quizzesWithQuestionCount })
    } catch (error) {
        next(error)
    }
}

export const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await Category.find({}).lean()
        const categoriesWithQuizCount = await Promise.all(categories.map(async (category) => {
            const quizCount = await Quiz.countDocuments({ category: category._id });
            return {
                ...category,
                quizCount
            };
        }));
        res.json(categoriesWithQuizCount);

    } catch (error) {
        createHttpError(500, "Failed to load categories")
    }
}
