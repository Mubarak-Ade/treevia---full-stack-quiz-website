import Category from "../../models/Category.js";

const getQuizByCategory = async (slug: string) => {
  const quizzes = await Category.aggregate([
    {
      $match: { slug },
    },
    {
      $lookup: {
        from: "quizzes",
        let: { category: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$category", "$$category"] },
            },
          },
          {
            $lookup: {
              from: "questions",
              localField: "_id",
              foreignField: "quizId",
              as: "questions",
            },
          },
          {
            $addFields: {
              questionCount: { $size: "$questions" },
            },
          },
          {
            $project: { questions: 0 },
          },
        ],
        as: "quizzes",
      },
    },
  ]);

  return quizzes[0];
};

const getCategories = async () => {
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "quizzes",
        localField: "_id",
        foreignField: "category",
        as: "quizzes",
      },
    },
    {
      $addFields: {
        quizCount: {
          $size: "$quizzes",
        },
      },
    },
    {
      $project: {
        quizzes: 0,
      },
    },
  ]);

  return categories;
};

export default { getQuizByCategory, getCategories };
