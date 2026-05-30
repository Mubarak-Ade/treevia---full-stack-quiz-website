import Category from "./category.model.js";
import { AppError } from "../../utils/error-handler.js";
import { QuizRepository } from "../admin/quiz/quiz.repository.js";
import Quiz from "../quiz/quiz.model.js";
import { getOrSetCache } from "../../utils/cache.js";

const getQuizByCategory = async (slug: string) => {
  const cacheKey = `quiz_by_category_${slug}`;

  return getOrSetCache(cacheKey,
    async () => {

      const category = await Category.findOne({ slug })
      if (!category) {
        throw new AppError(404, "Category Not Found")
      }
      const quizzes = await QuizRepository.findAll({ category: category?._id, status: "published" }).populate('category', 'name')

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
    }, 10 * 60)
}

const getCategories = async (query?: { searchTerm?: string }) => {
  const cacheKey = `categories${new URLSearchParams(query).toString()}`;

  return getOrSetCache(cacheKey,
    async () => {

      const filter: any = {};

      if (query?.searchTerm) {
        filter.$or = [
          { name: { $regex: query.searchTerm, $options: "i" } },
          { description: { $regex: query.searchTerm, $options: "i" } }
        ];
      }

      const categories = await Category.find(filter).lean();

      const categoriesWithCount = await Promise.all(
        categories.map(async (category) => {
          const quizCount = await Quiz.countDocuments({ category: category._id });
          return {
            ...category,
            quizCount,
          };
        })
      );

      return categoriesWithCount;
    },
    60 * 60
  )
};

export default { getQuizByCategory, getCategories };
