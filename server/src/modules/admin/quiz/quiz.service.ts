import createHttpError from "http-errors";
import mongoose from "mongoose";
import Quiz from "../../../models/Quiz.js";
import Question from "../../../models/Question.js";

interface QuizQuery {
  search?: string;
  sortBy?: string;
  order?: string;
  difficulty?: string;
  page?: number;
  limit?: number;
}

interface CreateQuizBody {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimit: number;
  description?: string;
  category: mongoose.Types.ObjectId;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const validateQuizPayload = (body: CreateQuizBody) => {
  const { title, difficulty, timeLimit, category, questions } = body;

  if (!title || !timeLimit || !category || !questions) {
    throw createHttpError(400, "Missing Fields");
  }

  if (!mongoose.isValidObjectId(category)) {
    throw createHttpError(400, "invalid id for category");
  }

  if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
    throw createHttpError(400, "Invalid difficulty level");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw createHttpError(400, "At least one question is required");
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    if (!q.questionText || !q.options || q.correctAnswer === undefined) {
      throw createHttpError(400, `Question ${i + 1}: Invalid structure`);
    }

    if (!Array.isArray(q.options) || q.options.length < 2) {
      throw createHttpError(400, `Question ${i + 1}: Must have at least 2 options`);
    }

    if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
      throw createHttpError(400, `Question ${i + 1}: Invalid correct answer`);
    }
  }
};

const getAllQuiz = async (query: QuizQuery) => {
  const { search, difficulty } = query;
  const filter: any = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (difficulty) {
    filter.difficulty = { $regex: difficulty, $options: "i" };
  }

  const quizzes = await Quiz.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "categories",
        let: { categoryId: "$category" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$categoryId"] },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "category",
      },
    },
    {
      $lookup: {
        from: "questions",
        let: { questionId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$quizId", "$$questionId"] },
            },
          },
          { $count: "total" },
        ],
        as: "questions",
      },
    },
    {
      $addFields: {
        questionCount: {
          $ifNull: [{ $arrayElemAt: ["$questions.total", 0] }, 0],
        },
      },
    },
    { $project: { questions: 0 } },
    { $unwind: "$category" },
  ]);

  return { quizzes };
};

const createQuiz = async (body: CreateQuizBody) => {
  validateQuizPayload(body);

  const { title, difficulty, timeLimit, category, description, questions } = body;

  const quiz = await Quiz.create({ title, difficulty, timeLimit, category, description });

  const questionToBeCreated = questions.map((question) => ({
    quizId: quiz._id,
    questionText: question.questionText,
    options: question.options,
    correctAnswer: question.correctAnswer,
  }));

  const createQuestions = await Question.insertMany(questionToBeCreated);

  return {
    message: "quiz created successfully",
    quizzes: {
      id: quiz._id,
      title: quiz.title,
      difficulty: quiz.difficulty,
      category: quiz.category,
      description: quiz.description,
      createdAt: quiz.createdAt,
      questions: createQuestions,
    },
  };
};

const updateQuiz = async (quizId: string, body: CreateQuizBody) => {
  validateQuizPayload(body);

  const { title, difficulty, timeLimit, category, description, questions } = body;

  const update: any = {};
  if (title !== undefined) update.title = title;
  if (difficulty !== undefined) update.difficulty = difficulty;
  if (category !== undefined) update.category = category;
  if (timeLimit !== undefined) update.timeLimit = timeLimit;
  if (description !== undefined) update.description = description;

  const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, update, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuiz) {
    throw createHttpError(404, "Quiz not found");
  }

  await Question.deleteMany({ quizId });

  const questionsToCreate = questions.map((q) => ({
    quizId: updatedQuiz._id,
    questionText: q.questionText,
    options: q.options,
    correctAnswer: q.correctAnswer,
  }));

  const updatedQuestions = await Question.insertMany(questionsToCreate);

  return {
    message: "quiz created successfully",
    quizzes: {
      id: updatedQuiz._id,
      title: updatedQuiz.title,
      difficulty: updatedQuiz.difficulty,
      category: updatedQuiz.category,
      description: updatedQuiz.description,
      createdAt: updatedQuiz.createdAt,
      questions: updatedQuestions,
    },
  };
};

const getSingleQuiz = async (id: string) => {
  if (!id || !mongoose.isValidObjectId(id)) {
    throw createHttpError(400, "invalid id");
  }

  const quiz = await Quiz.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
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
      $project: {
        title: 1,
        difficulty: 1,
        timeLimit: 1,
        createdAt: 1,
        _totalQuestions: { $size: "$questions" },
        category: "$category.name",
      },
    },
    { $unwind: "$category" },
  ]);

  if (!quiz.length) {
    throw createHttpError(404, "Quiz not Found");
  }

  return quiz;
};

const deleteQuiz = async (quizId: string) => {
  const quiz = await Quiz.findByIdAndDelete(quizId);

  return {
    message: "Quiz Successfully Deleted",
    quiz,
  };
};

export type { QuizQuery, CreateQuizBody };
export default { getAllQuiz, createQuiz, updateQuiz, getSingleQuiz, deleteQuiz };
