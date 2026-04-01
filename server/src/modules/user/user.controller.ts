import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserService from "./user.service.js";

export const uploadProfilePic: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    if (!req.user) {
      throw createHttpError(401, "Unauthorized");
    }

    const userId = req.user;
    const payload = await UserService.uploadProfilePic(userId, req.file?.filename);
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = req.user;
    
    if (!userId) {
      throw createHttpError(401, "Unauthorized");
    }

    const user = await UserService.getUserInfo(userId as string);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
