import { Response, Request, RequestHandler, NextFunction } from 'express';
import Result from '../models/QuizResult.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: any;
  params: {
    id?: string;
  };
}

export const getResult = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await Result.find({user: req.user.id}).populate({path: 'quiz', select: 'title category', populate: {path: 'category', select: 'name'}}).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};

export const getSingleResult = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id
    const quizId = req.params.id

    const result = await Result.findOne({ user: userId, quiz: quizId }).populate("user", "username")
    
    if (!result) {
      throw createHttpError(404, 'Result not found' );
    }
    if (userId !== result?.user?._id.toString()) {
      throw createHttpError(401, "Unauthorized")
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};
