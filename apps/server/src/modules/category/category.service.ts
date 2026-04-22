import Category from "../../models/Category.js";
import { AppError } from "../../utils/error-handler.js";
import { QuizRepository } from "../admin/quiz/quiz.repository.js";

const getQuizByCategory = async (slug: string) => {
  const category = await Category.findOne({slug})
  if (!category) {
    throw new AppError(404, "Category Not Found")
  }
  const quizzes = await QuizRepository.findAll({category: category?._id, status: "published"}).populate('category', 'name')

  return {
    name: category.name,
    description: category.description,
    tags: category.tags,
    quizzes: quizzes.map(quiz => ({
      _id: String(quiz._id),
      title: quiz.title,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      difficulty: quiz.difficulty,
      status: quiz.status,
      coverImage: quiz.coverImage,
      timeLimitPerQuestion: quiz.timeLimitPerQuestion,
      questionCount: quiz.stats?.questionCount ?? 0,
      stats: quiz.stats,
      category: quiz.category,
    })),
  };
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
