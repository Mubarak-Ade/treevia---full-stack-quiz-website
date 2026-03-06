import { RequestHandler } from "express";
import createHttpError from "http-errors";
import DashboardService from "./dashboard.service.js";

export const getUserStats: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw createHttpError(401, "Unauthorized");
    }

    const stats = await DashboardService.getUserStats(req.user.id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getLeaderBoard: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const payload = await DashboardService.getLeaderBoard(req.user?.id);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};
