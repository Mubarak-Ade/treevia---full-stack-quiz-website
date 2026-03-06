import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import env from "../env.js";

export const createJWT = (id: mongoose.Types.ObjectId, role: string): string => {
	return jwt.sign({ id, role }, env.SECRET, { expiresIn: "1d" });
};