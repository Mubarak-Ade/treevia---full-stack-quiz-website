import { Response, Request, RequestHandler } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import env from '../env.js';
import bcrypt from 'bcryptjs';

interface AuthRequest extends Request {
	params: {
		id?: string;
	};
	user?: any;
}

interface Register {
	username?: string;
	password: string
	email: string;
	role: 'student' | 'teacher' | 'admin';
}

const createJWT = (id: mongoose.Types.ObjectId, email: string): string => {
	return jwt.sign({ id, email }, env.SECRET, { expiresIn: '1d' });
};

export const register: RequestHandler<unknown, unknown, Register, unknown> = async (req, res, next): Promise<void> => {
	const { username, email, password, role } = req.body;
	try {
		if (!username || !email || !password) {
			throw createHttpError(400, "Missing fields")
		}
		let user = await User.findOne({ email });

		if (user) {
			throw createHttpError(400, "User already exists")
		}

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)

		user = new User({ username, email, password: passwordHash, role: role || 'student' });

		await user.save()

		const token = createJWT(user._id, user.email)
		res.status(201).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			token: token,
		});
	} catch (error) {
		next(error)
	}
};

interface Login {
	username?: string;
	password: string
	email: string;
	role: 'student' | 'teacher' | 'admin';
}

export const login: RequestHandler<unknown, unknown, Login, unknown> = async (req, res, next): Promise<void> => {
	const {email, password } = req.body;
	try {
		if (!email || !password) {
			throw createHttpError(400, "Missing fields")
		}
		let user = await User.findOne({ email });

		if (!user) {
			throw createHttpError(400, "User doesnt exists")
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			res.status(400).json({ error: 'Invalid credentials' });
			return;
		}

		const token = createJWT(user._id, user.email);
		res.json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
			token: token,
		});
	} catch (error) {
		next(error)
	}
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await User.find({}, '-password');

		if (!users || users.length === 0) {
			res.status(404).json({ error: 'No users' });
			return;
		}

		res.status(200).json(users);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const online = async (req: AuthRequest, res: Response): Promise<void> => {
	const { isOnline } = req.body;
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{ isOnline },
			{ new: true }
		);
		res.status(200).json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
