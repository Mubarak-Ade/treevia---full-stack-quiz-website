import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import Result from '../models/QuizResult.js';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
	user?: any;
	params: {
		id?: string;
	};
}

export const getResult = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
	try {
		const userId = req.user.id

		const result = await Result.aggregate([
			{
				$match: {
					user: new mongoose.Types.ObjectId(userId)
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "user",
					foreignField: "_id",
					as: "user"
				}	
			},
			{
				$lookup: {
					from: "quizzes",
					localField: "quiz",
					foreignField: "_id",
					as: "quiz"
				}	
			},
			{
				$addFields: {
					user: {$arrayElemAt: ['$user.username', 0]},
					quiz: {$arrayElemAt: ["$quiz.title", 0]}
				}
			}
		]);
		res.status(200).json(result);
	} catch (error) {
		next(error)
	}
};

export const getSingleResult: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const userId = req.user?.id
		const quizId = req.params.id

		const result = await Result.findOne({ user: userId, quiz: quizId }).populate("user", "username")

		if (!result) {
			throw createHttpError(404, 'Result not found');
		}
		if (userId !== result?.user?._id.toString()) {
			throw createHttpError(401, "Unauthorized")
		}
		res.status(200).json(result);
	} catch (error) {
		next(error)
	}
};

