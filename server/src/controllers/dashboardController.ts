import { NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import UserStats from "../models/UserStats.js";
import { calculateLevelFromXp } from "../utils/xp_level_calculator.js";

export const getUserStats: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			throw createHttpError(400, "unauthorized user");
		}

		const stats = await UserStats.findOne({ user: userId });

		if (!stats) throw createHttpError(400, "user does not have stats");

		const { level, xpIntoLevel, totalXpForNextLevel, xpForNextLevel } =
			calculateLevelFromXp(stats.totalXp);

		if (!stats) {
			throw createHttpError(404, "user doesnt have any record yet");
		}

		const progress = {
			level: level,
			xpIntoLevel: xpIntoLevel,
			nextTotalXp: totalXpForNextLevel,
			nextXp: xpForNextLevel,
		};

		res.json({ stats, progress });
	} catch (error) {
		next(error);
	}
};

export const getLeaderBoard: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	const leaderboard = await UserStats.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "user",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $unwind: "$user" },
		{
			$project: {
				user: "$user.username",
				profile: "$user.profilePic",
				level: 1,
				totalXp: 1,
				rank: 1,
			},
		},
		{ $sort: { totalXp: -1 } },
	]);

	const currentUser = req.user?.id
		? await UserStats.findOne({ user: req.user?.id })
				.populate("user", "username profilePic")
				.lean()
		: null;
	const rank =
		(await UserStats.countDocuments({
			totalXp: { $gt: currentUser?.totalXp },
		})) + 1;

	const userRank = currentUser
		? {
				rank,
				name: (currentUser?.user as any).username,
				profile: (currentUser?.user as any).profilePic,
				level: calculateLevelFromXp(currentUser?.totalXp).level,
				totalXp: currentUser?.totalXp,
		  }
		: {};
	res.json({ leaderboard, userRank });
};
