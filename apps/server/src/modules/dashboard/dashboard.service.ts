import UserStats from "../../models/UserStats.js";
import { calculateAccuracy, calcuteTotalQuestion, matchStage } from "../../pipelines/stats.js";
import { AppError } from "../../utils/error-handler.js";
import { calculateLevelFromXp } from "../../utils/xp_level_calculator.js";

const getUserStats = async (userId: string) => {
  if (!userId) {
    throw new AppError(400, "unauthorized user");
  }

  const stats = await UserStats.aggregate([
    matchStage(userId),
    calcuteTotalQuestion,
    calculateAccuracy,
  ]);

  const [userStats] = stats;
  if (!userStats) {
    throw new AppError(404, "user doesnt have any record yet");
  }

  const { level, xpIntoLevel, xpForNextLevel } = calculateLevelFromXp(userStats.totalXp);

  return {
    ...userStats,
    level,
    xpIntoLevel,
    xpForNextLevel,
  };
};

const getLeaderBoard = async (userId?: string) => {
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

  const currentUser = userId
    ? await UserStats.findOne({ user: userId }).populate("user", "username profilePic").lean()
    : null;

  const rank =
    (await UserStats.countDocuments({
      totalXp: { $gt: currentUser?.totalXp },
    })) + 1;

  const userRank = currentUser
    ? {
        rank,
        name: (currentUser.user as any).username,
        profile: (currentUser.user as any).profilePic,
        level: calculateLevelFromXp(currentUser.totalXp).level,
        totalXp: currentUser.totalXp,
      }
    : {};

  return { leaderboard, userRank };
};

export default { getUserStats, getLeaderBoard };
