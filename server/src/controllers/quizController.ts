import { Response, Request, RequestHandler, NextFunction } from "express";
import mongoose from "mongoose";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import Result from "../models/QuizResult.js";
import User from "../models/User.js";
import { validateQuiz } from "../utils/validator.js";
import createHttpError from "http-errors";
import Category from "../models/Category.js";
import UserStats from "../models/UserStats.js";
import { calculateLevelFromXp } from "../utils/xp_level_calculator.js";

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
		const { category } = req.query;
		const filter = category ? { categories: category } : {};
		const quiz = await Quiz.find(filter).sort({ createdAt: -1 }).lean();
		res.json(quiz);
	} catch (error: any) {
		next(error)
	}
};

export const submitQuiz = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { quizId, selectedOptions } = req.body;

	try {
		if (!quizId || !Array.isArray(selectedOptions)) {
			throw createHttpError(400, "invalid submission data");
		}
		const questions = await Question.find({ quizId }).lean();

		if (!questions.length) {
			throw createHttpError(404, "Quiz not found");
		}

		let correctCount = 0;
		// Process answers
		const attempts = questions.map((question, index) => {
			const selectedIndex = selectedOptions[index];
			const isCorrect =
				typeof selectedIndex === "number" &&
				selectedIndex === question.correctAnswer;

			if (isCorrect) correctCount++;
			return {
				question: question.questionText,
				selected: question.options[selectedIndex] ?? null,
				correct: question.options[question.correctAnswer],
				isCorrect,
			};
		});

		const totalQuestions = questions.length;
		const score = correctCount;
		const xpEarned = correctCount * 10;

		if (req.user) {
			await Result.create({
				user: req.user.id,
				quiz: quizId,
				score,
				xpEarned,
				correctAnswers: questions.map((q) => q.correctAnswer),
			});
			await UserStats.findOneAndUpdate(
				{ user: req.user?.id },
				{
					$inc: {
						quizzesTaken: 1,
						// highestScore: score,
						totalCorrect: correctCount,
						totalFailed: totalQuestions - correctCount,
						totalXp: xpEarned,
					},
					$max: {highestScore: score},
					$set: { lastQuizDate: Date.now() },
				},
				{ upsert: true }
			);
		}

		const stats = req.user
			? await UserStats.findOne({ user: req.user?.id }).populate(
					"user",
					"username"
			  )
			: null;

		res.json({
			score,
			stats,
			totalQuestions,
			accuracy: (score / totalQuestions) * 100,
			xpEarned,
			attempts,
			saved: Boolean(req.user),
		});
	} catch (error: any) {
		next(error)
	}
};

export const getQuestions = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const quizId = req.params.quizId;
		const question = await Question.find({ quizId });
		res.json(question);
	} catch (error: any) {
		next(error)
	}
};

export const getRandomQuiz = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const randomQuiz = await Quiz.aggregate([
			{ $sample: { size: 3 } },
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				$lookup: {
					from: "questions",
					localField: "_id",
					foreignField: "quizId",
					as: "questions"
				}
			},
			{
				$project: {
					_id: 1,
					title: 1,
					description: 1,
					category: "$category.name",
					difficulty: 1,
					timeLimit: 1,
					createdAt: 1,
					updatedAt: 1,
					questionCount: {$size: "$questions"}
				}
			},
			{$unwind: "$category"}
		]);
		if (randomQuiz.length === 0) {
			throw createHttpError(404, "No quizzes available");
		}
		res.json(randomQuiz);
	} catch (error: unknown) {
		next(error)
	}
};
