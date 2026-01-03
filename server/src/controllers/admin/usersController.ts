import { RequestHandler } from "express";
import User from "../../models/User.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getUsers: RequestHandler = async (req, res, next): Promise<void> => {
	try {
        const {online=false, search} = req.query

        const filter: any = {isOnline: online}
        if (search) {
            filter.$or = [
                {username: {$regex: search, $options: "i"}}
            ]
        }
		const users = await User.find(filter, "-password").sort({createdAt: -1});

		if (!users || users.length === 0) {
			throw createHttpError(404, "No users" );
		}

		res.status(200).json(users);
	} catch (error: any) {
		next(error)
	}
};

export const getSingleUser: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const userId = req.params.userId

        if (!userId || !mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "invalid object id")
        }
        const user = await User.findById(userId, "-password")

        if (!user) throw createHttpError(404, "user does not exist")

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const deleteUser: RequestHandler = async (req, res, next) : Promise<void> => {
    try {
        const id = req.params.id

        if (!id || !mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "invalid object id")
        }
        const user = await User.findByIdAndDelete(id)

        if (!user) throw createHttpError(404, "user does not exist")

        res.status(200).json("user deleted successfully")

    } catch (error) {
        next(error)
    }
}

export const online: RequestHandler = async (req, res, next): Promise<void> => {
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

