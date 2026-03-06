import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserService from "./user.service.js";

export const uploadProfilePic: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw createHttpError(401, "Unauthorized");
    }

    const userId = req.user.id;
    const payload = await UserService.uploadProfilePic(userId, req.file?.filename);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw createHttpError(401, "Unauthorized");
    }

    const userId = req.user.id;
    const user = await UserService.getUserInfo(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
