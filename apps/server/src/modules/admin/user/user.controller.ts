import { RequestHandler } from "express";
import AdminUserService from "./user.service.js";

export const getUsers: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const users = await AdminUserService.getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const user = await AdminUserService.getSingleUser(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const message = await AdminUserService.deleteUser(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const online: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const user = await AdminUserService.updateOnlineStatus(req.params.id, req.body.isOnline);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
