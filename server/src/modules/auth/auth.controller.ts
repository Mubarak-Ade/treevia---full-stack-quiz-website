import { RequestHandler } from "express";
import { AuthSchema } from "../../schema/auth.schema.js";
import { zodValidator } from "../../utils/validator.js";
import AuthService from "./auth.service.js";

export const register: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = zodValidator(AuthSchema, req.body);
    const user = await AuthService.register(data);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const data = zodValidator(AuthSchema.omit({ name: true }), req.body);
    const user = await AuthService.login(data);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
