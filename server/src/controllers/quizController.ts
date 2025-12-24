import { Response, Request, RequestHandler } from 'express';
import mongoose from 'mongoose';
import Question from '../models/Question.js';
import Quiz from '../models/Quiz.js';
import Result from '../models/QuizResult.js';
import User from '../models/User.js';
import { validateQuiz } from '../utils/validator.js';
import createHttpError from 'http-errors';
import Category from '../models/Category.js';

interface AuthRequest extends Request {
	user?: any;
	params: {
		id?: string;
		quizId?: string;
		questionId?: string;
	};
}

export const createQuiz = async (req: Request, res: Response): Promise<void> => {
	const { title, category, difficulty, timeLimit } = req.body;

	try {
		validateQuiz(title, category, timeLimit);
		const quiz = new Quiz({ title, category, difficulty, timeLimit });
		await quiz.save();
		res.status(200).json({ message: 'Quiz Created Successfully', quiz: quiz.id, quizTitle: title });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getQuizzes = async (req: Request, res: Response): Promise<void> => {
	try {
		const { category } = req.query
		const filter = category ? { categories: category } : {}
		const quiz = await Quiz.find(filter).sort({ createdAt: -1 }).lean();
		res.status(200).json(quiz);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getQuizById = async (req: Request, res: Response): Promise<void> => {
	const { quizId } = req.params;

	try {
		const [quiz] = await Quiz.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(quizId),
				},
			},
			{
				$lookup: {
					from: 'questions',
					localField: '_id',
					foreignField: 'quizId',
					as: 'questions',
				},
			},
		]);
		res.status(200).json(quiz);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteQuizById = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;
	try {
		const quiz = await Quiz.findByIdAndDelete(id);

		if (!quiz) {
			res.status(404).json({ message: 'Quiz not found' });
			return;
		}
		res.status(200).json({ message: 'Quiz successfully deleted', quiz });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
	const { quizId, questionId } = req.params;

	try {
		const quiz = await Quiz.findById(quizId);

		if (!quiz) {
			res.status(404).json({ message: 'Question not found in any quiz' });
			return;
		}

		const question = await Question.findById(questionId);

		if (!question) {
			res.status(404).json({ message: 'Question not found' });
			return;
		}

		res.status(200).json(question);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const updateQuiz = async (req: Request, res: Response): Promise<void> => {
	const { quizId } = req.params;
	const { } = req.body;
	// Implementation pending
};

export const submitQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
	const { quizId, selectedOption } = req.body;

	try {

		if (!quizId || !Array.isArray(selectedOption)) {
			throw createHttpError(400, "invalid submission data")
		}
		const questions = await Question.find({ quizId }).lean();
		
		if (!questions.length) {
			throw createHttpError(404, "Quiz not found")
		}
		
		let score = 0;
		let correctAnswers: number[] = [];
		let selectedIndex: number;
		let correctIndex: number;

		// Process answers
		const attempts = questions.map((question, index) => {
			const selectedIndex = selectedOption[index];
			const isCorrect = selectedIndex === question.correctAnswer;
			
			if (isCorrect) {
				score += 1
			}
			return {
				question: question.questionText,
				selected: question.options[selectedIndex],
				correct: question.options[question.correctAnswer],
				isCorrect
			}
		})

		const totalQuestion = questions.length;
		const percentage = (score / totalQuestion) * 100;

		if (req.user) {
			await Result.findOneAndUpdate(
				{ quiz: quizId, user: req.user.id },
				{
					score,
					percentage,
					correctAnswers: questions.map(q => q.correctAnswer),
				},
				{ upsert: true, new: true }
			);
		}


		res.status(200).json({ score, totalQuestion, percentage, attempts, saved: Boolean(req.user) });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
	try {
		const quizId = req.params.quizId
		const question = await Question.find({ quizId });
		res.status(200).json(question);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const editQuestions = async (req: Request, res: Response): Promise<void> => {
	const { quizId, questionId } = req.params;
	const updated = req.body;

	try {
		const question = await Question.findByIdAndUpdate(questionId, updated, { new: true });

		if (!question) {
			res.status(404).json({ error: 'Question not found' });
			return;
		}

		res.status(200).json(question);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
