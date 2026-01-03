import { RequestHandler } from "express";
import User from "../models/User.js";



export const uploadProfilePic: RequestHandler = async (req, res, next) : Promise<void> => {
	const userId = req.user?.id;
    const imagePath = `/uploads/${req.file?.filename}`
	const user = await User.findByIdAndUpdate(
		userId,
		{
			profilePic: imagePath,
		},
		{ new: true, upsert: true }
	);
    res.json({message: "File uploaded successfully", user})
};


export const getUserInfo: RequestHandler = async (req, res, next) : Promise<void> => {
	const userId = req.user?.id
	const user = await User.findById(userId).lean()

	res.json(user)
}

