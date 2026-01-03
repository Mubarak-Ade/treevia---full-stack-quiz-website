import { Response, Request, RequestHandler } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import env from "../env.js";
import bcrypt from "bcryptjs";

interface AuthRequest extends Request {
	params: {
		id?: string;
	};
	user?: any;
}

interface Register {
	username?: string;
	password: string;
	email: string;
}

const createJWT = (id: mongoose.Types.ObjectId, role: string): string => {
	return jwt.sign({ id, role }, env.SECRET, { expiresIn: "1d" });
};

export const register: RequestHandler<
	unknown,
	unknown,
	Register,
	unknown
> = async (req, res, next): Promise<void> => {
	const { username, email, password } = req.body;
	try {
		if (!username || !email || !password) {
			throw createHttpError(400, "Missing fields");
		}
		let user = await User.findOne({ email });

		if (user) {
			throw createHttpError(400, "User already exists");
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		user = new User({
			username,
			email,
			password: passwordHash,
		});

		await user.save();

		const token = createJWT(user._id, user.role);
		res.status(201).json({
			user: {
				id: user._id,
				profile: user.profilePic,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			token: token,
		});
	} catch (error) {
		next(error);
	}
};

interface Login {
	username?: string;
	password: string;
	email: string;
}

export const login: RequestHandler<unknown, unknown, Login, unknown> = async (
	req,
	res,
	next
): Promise<void> => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw createHttpError(400, "Missing fields");
		}
		let user = await User.findOne({ email });

		if (!user) {
			throw createHttpError(400, "User doesnt exists");
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw createHttpError(400, "Invalid credentials");
		}

		const token = createJWT(user._id, user.role);
		res.json({
			user: {
				id: user._id,
				profile: user.profilePic,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			token: token,
		});
	} catch (error) {
		next(error);
	}
};


