import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import DashboardService from "./dashboard.service.js";
import { AppError } from "../../utils/error-handler.js";
import { successResponse } from "../../utils/response.js";

export const getUserStats= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const stats = await DashboardService.getUserStats(req.user as string);
    successResponse(res, "Here are your stats", stats, 200)
};


export const getLeaderBoard: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload = await DashboardService.getLeaderBoard(req.user);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};
