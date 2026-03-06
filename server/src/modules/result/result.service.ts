import createHttpError from "http-errors";
import mongoose from "mongoose";
import Result from "../../models/QuizResult.js";

const getResult = async (userId: string) => {
  return Result.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "quizzes",
        localField: "quiz",
        foreignField: "_id",
        as: "quiz",
      },
    },
    {
      $addFields: {
        user: { $arrayElemAt: ["$user.username", 0] },
        quiz: { $arrayElemAt: ["$quiz.title", 0] },
      },
    },
  ]);
};

const getSingleResult = async (userId: string, quizId: string) => {
  const result = await Result.findOne({ user: userId, quiz: quizId }).populate("user", "username");

  if (!result) {
    throw createHttpError(404, "Result not found");
  }

  if (userId !== result.user?._id.toString()) {
    throw createHttpError(401, "Unauthorized");
  }

  return result;
};

export default { getResult, getSingleResult };
