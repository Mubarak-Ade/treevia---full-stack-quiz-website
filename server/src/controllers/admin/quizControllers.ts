import { RequestHandler } from "express";
import Quiz from "../../models/Quiz.js";
import mongoose from "mongoose";
import createHttpError from "http-errors";

interface QuizQuery {
	search?: string;
	sortBy?: string;
	order: string,
	difficulty: string,
	page: number,
	limit: number
}

export const getAllQuiz: RequestHandler<unknown, unknown, unknown, QuizQuery> = async (
	req,
	res,
	next
): Promise<void> => {
	const { search, sortBy = 'createdAt', order = 'desc', difficulty, page = 1, limit = 10 } = req.query;
	const sortOrder = order === 'asc' ? 1 : -1
    const sortObject:Record<string, 1 | -1> = {[sortBy] : sortOrder}
    const filter: any = {}

    if(search) {
        filter.title = {$regex: search, $options: "i"}
    }

	if (difficulty) {
		filter.difficulty = {$regex: difficulty, $options: "i"}
	}

    // if(title) sort.title = title
	const skip = (Number(page) - 1) * Number(limit);
	const [quizzes, total] = await Promise.all([Quiz.find(filter).sort(sortObject).limit(Number(limit)).populate("category", "name -_id").skip(skip).lean(), Quiz.countDocuments(filter).lean()]);
	res.json({quizzes, page: Number(page), pages: Math.ceil(total / Number(limit)), total });
};

interface CreateQuizBody {
	title: string;
	// description: string;
	difficulty: "easy" | "medium" | "hard";
	timeLimit: number,
	category: mongoose.Types.ObjectId
}

export const createQuiz: RequestHandler<unknown, unknown, CreateQuizBody, unknown> = async (req, res, next) : Promise<void> => {
	try {
		const {title, difficulty, timeLimit, category} = req.body
		if (!title || !timeLimit || !category) {
			throw createHttpError(400, "Missing Fields")
		}

		if (!mongoose.isValidObjectId(category)) {
			throw createHttpError(400, "invalid id for category")
		}

		const quiz = await Quiz.findOne({title: title})

		if (title === quiz?.title) {
			throw createHttpError(400, "quiz title already exist, choose another title")
		}


		const quizzes = new Quiz({title, difficulty, category, timeLimit})

		await quizzes.save()

		res.status(201).json({message: "quiz created successfully", quizzes})

	} catch (error) {
		next(error)
	}
}

export const getSingleQuiz: RequestHandler = async (req, res, next) : Promise<void> => {
	try {
		const id = req.params.id

		if (!id || !mongoose.isValidObjectId(id)) {
			throw createHttpError(400, "invalid id")
		}

		const quiz = await Quiz.aggregate([
			{
				$match: {_id: new mongoose.Types.ObjectId(id)}
			},
			{
				$lookup: {
					from: 'categories',
					localField: 'category',
					foreignField: '_id',
					as: "category"
				},
			},
			{
				$lookup: {
					from: 'questions',
					localField: '_id',
					foreignField: 'quizId',
					as: "questions"
				}
			},
			{
				$project: {
					title: 1,
					difficulty: 1,
					timeLimit: 1,
					createdAt: 1,
					// questions: 1,
					_totalQuestions: { $size: "$questions" },
					category: "$category.name"
				}
			},
			{$unwind: "$category"}
		])

		if (!quiz) {
			throw createHttpError(404, "Quiz not Found")
		}

		res.json(quiz)
	} catch (error) {
		next(error)
	}
}