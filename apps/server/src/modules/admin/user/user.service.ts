import createHttpError from "http-errors";
import mongoose from "mongoose";
import User from "../../../models/User.js";
import { AppError } from "../../../utils/error-handler.js";

const getUsers = async (query: Record<string, unknown>) => {
  const { online = false, search } = query as { online?: boolean; search?: string };

  const filter: any = { isOnline: online };
  if (search) {
    filter.$or = [{ username: { $regex: search, $options: "i" } }];
  }

  const users = await User.find(filter, "-password").sort({ createdAt: -1 });

  if (!users || users.length === 0) {
    throw new AppError(404, "No users");
  }

  return users;
};

const getSingleUser = async (userId: string) => {
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw new AppError(400, "invalid object id");
  }

  const user = await User.findById(userId, "-password");
  if (!user) {
    throw new AppError(404, "user does not exist");
  }

  return user;
};

const deleteUser = async (id: string) => {
  if (!id || !mongoose.isValidObjectId(id)) {
    throw new AppError(400, "invalid object id");
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, "user does not exist");
  }

  return "user deleted successfully";
};

const updateOnlineStatus = async (id: string, isOnline: boolean) => {
  return User.findByIdAndUpdate(id, { isOnline }, { new: true });
};

export default { getUsers, getSingleUser, deleteUser, updateOnlineStatus };
