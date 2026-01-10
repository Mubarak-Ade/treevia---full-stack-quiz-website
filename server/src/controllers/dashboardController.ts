import { NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import UserStats from "../models/UserStats.js";
import { calculateLevelFromXp } from "../utils/xp_level_calculator.js";
import mongoose from "mongoose";
import { calculateAccuracy, calcuteTotalQuestion, matchStage } from "../pipelines/stats.js";

export const getUserStats: RequestHandler = async (
	req,
	res,
	next
): Promise<void> =>
{
	try
	{
		const userId = req.user?.id;

		if ( !userId )
		{
			throw createHttpError( 400, "unauthorized user" );
		}

		const stats = await UserStats.aggregate( [
			matchStage( userId ),
			calcuteTotalQuestion,
			calculateAccuracy
		] )

		const [ userStats ] = stats

		const { level, xpIntoLevel, xpForNextLevel } =
			calculateLevelFromXp( userStats.totalXp );

		if ( !stats )
		{
			throw createHttpError( 404, "user doesnt have any record yet" );
		}

		res.json( {
			...userStats,
			level,
			xpIntoLevel,
			xpForNextLevel
		} );
	} catch ( error )
	{
		next( error );
	}
};

export const getLeaderBoard: RequestHandler = async (
	req,
	res,
	next
): Promise<void> =>
{
	const leaderboard = await UserStats.aggregate( [
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
	] );

	const currentUser = req.user?.id
		? await UserStats.findOne( { user: req.user?.id } )
			.populate( "user", "username profilePic" )
			.lean()
		: null;
	const rank =
		( await UserStats.countDocuments( {
			totalXp: { $gt: currentUser?.totalXp },
		} ) ) + 1;

	const userRank = currentUser
		? {
			rank,
			name: ( currentUser?.user as any ).username,
			profile: ( currentUser?.user as any ).profilePic,
			level: calculateLevelFromXp( currentUser?.totalXp ).level,
			totalXp: currentUser?.totalXp,
		}
		: {};
	res.json( { leaderboard, userRank } );
};
