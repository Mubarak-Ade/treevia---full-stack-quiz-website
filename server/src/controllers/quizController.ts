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

interface AuthRequest extends Request
{
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
): Promise<void> =>
{
	try
	{
		const { category } = req.query;
		const filter = category ? { categories: category } : {};
		const quiz = await Quiz.find( filter ).sort( { createdAt: -1 } ).lean();
		res.json( quiz );
	} catch ( error: any )
	{
		next( error )
	}
};

export const submitQuiz = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> =>
{
	const { quizId, selectedOptions } = req.body;

	try
	{
		if ( !quizId || !Array.isArray( selectedOptions ) )
		{
			throw createHttpError( 400, "invalid submission data" );
		}
		const [questions, quiz] = await Promise.all( [
			Question.find( { quizId } ).lean(),
			Quiz.findById( quizId ),
		] );

		if ( !questions.length )
		{
			throw createHttpError( 404, "Quiz not found" );
		}

		if ( !quiz )
		{
			throw createHttpError( 404, "Quiz not found" );
		}

		let correctCount = 0;
		// Process answers
		const attempts = questions.map( ( question, index ) =>
		{
			const selectedIndex = selectedOptions[ index ];
			const isCorrect =
				typeof selectedIndex === "number" &&
				selectedIndex === question.correctAnswer;

			if ( isCorrect ) correctCount++;
			return {
				question: question.questionText,
				selected: question.options[ selectedIndex ] ?? null,
				correct: question.options[ question.correctAnswer ],
				isCorrect,
			};
		} );

		const totalQuestions = questions.length;
		const score = correctCount;
		const xpEarned = correctCount * 10;

		let elapsedSeconds = 0;
		const correctAnswers = questions.map( ( q ) => q.correctAnswer );
		let saved = false;

		if ( req.user )
		{
			let attempt = await Result.findOne( {
				user: req.user.id,
				quiz: quizId,
				submittedAt: null,
			} );

			if ( !attempt )
			{
				attempt = await Result.create( {
					user: req.user.id,
					quiz: quizId,
					score: 0,
					xpEarned: 0,
					correctAnswers: [],
					startedAt: new Date(),
				} );
			}

			// Backward-compat for legacy attempt records created before startedAt was enforced.
			const attemptStartedAt =
				attempt.startedAt ?? attempt.createdAt ?? new Date();

			if ( !attempt.startedAt )
			{
				attempt.startedAt = attemptStartedAt;
			}

			elapsedSeconds = ( Date.now() - attemptStartedAt.getTime() ) / 1000;

			// if ( elapsedSeconds > quiz.timeLimit + 1 )
			// {
			// 	throw createHttpError( 403, "Time limit exceeded" );
			// }

			attempt.submittedAt = new Date();
			attempt.timeTaken = Math.floor( elapsedSeconds );
			attempt.score = score;
			attempt.xpEarned = xpEarned;
			attempt.correctAnswers = correctAnswers;
			await attempt.save();

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
					$max: { highestScore: score },
					$set: { lastQuizDate: Date.now() },
				},
				{ upsert: true }
			);
			saved = true;
		}

		const stats = req.user
			? await UserStats.findOne( { user: req.user?.id } ).populate(
				"user",
				"username"
			)
			: null;

		res.json( {
			score,
			stats,
			totalQuestions,
			accuracy: ( score / totalQuestions ) * 100,
			xpEarned,
			attempts,
			saved,
		} );
	} catch ( error: any )
	{
		next( error )
	}
};

export const getQuestions = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> =>
{
	try
	{
		const quizId = req.params.quizId;
		const question = await Question.find( { quizId } );

		if ( req.user )
		{
			const activeAttempt = await Result.findOne( {
				user: req.user.id,
				quiz: quizId,
				submittedAt: null,
			} );

			if ( !activeAttempt )
			{
				await Result.create( {
					user: req.user.id,
					quiz: quizId,
					score: 0,
					xpEarned: 0,
					correctAnswers: [],
					startedAt: new Date(),
				} );
			}
		}

		res.json( question );
	} catch ( error: any )
	{
		next( error )
	}
};

export const getRandomQuiz = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> =>
{
	try
	{
		const randomQuiz = await Quiz.aggregate( [
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
					questionCount: { $size: "$questions" }
				}
			},
			{ $unwind: "$category" }
		] );
		if ( randomQuiz.length === 0 )
		{
			throw createHttpError( 404, "No quizzes available" );
		}
		res.json( randomQuiz );
	} catch ( error: unknown )
	{
		next( error )
	}
};
