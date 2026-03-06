import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import ResultService from "./result.service.js";

interface AuthRequest extends Request {
  user?: any;
  params: {
    id?: string;
  };
}

export const getResult = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw createHttpError(401, "Unauthorized");
    }

    const result = await ResultService.getResult(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleResult: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw createHttpError(401, "Unauthorized");
    }

    const userId = req.user.id;
    const quizId = req.params.id;
    const result = await ResultService.getSingleResult(userId, quizId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
