import { RequestHandler } from "express";
import Quiz from "../../models/Quiz.js";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import Question from "../../models/Question.js";

interface QuizQuery
{
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
): Promise<void> =>
{
	const { search, sortBy = 'createdAt', order = 'desc', difficulty, page = 1, limit = 10 } = req.query;
	const sortOrder = order === 'asc' ? 1 : -1
	const sortObject: Record<string, 1 | -1> = { [ sortBy ]: sortOrder }
	const filter: any = {}

	if ( search )
	{
		filter.title = { $regex: search, $options: "i" }
	}

	if ( difficulty )
	{
		filter.difficulty = { $regex: difficulty, $options: "i" }
	}

	// if(title) sort.title = title
	const skip = ( Number( page ) - 1 ) * Number( limit );
	const quizzes = await Quiz.aggregate( [
		{
			$match: filter
		},
		{
			$lookup: {
				from: "categories",
				let: { categoryId: "$category" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: [ "$_id", "$$categoryId" ] }
						}
					},
					{
						$project: {
							_id: 1,
							name: 1
						}
					}
				],
				as: "category"
			}
		},
		{
			$lookup: {
				from: "questions",
				let: { questionId: "$_id" },
				pipeline: [
					{
						$match: {
							$expr: { $eq: [ "$quizId", "$$questionId" ] }
						}
					},
					{$count: "total"}
				],
				as: "questions"
			}
		},
		{
			$addFields: {
				questionCount: {
					$ifNull: [ { $arrayElemAt: [ "$questions.total", 0 ] }, 0 ]
				}
			}
		},
		{ $project: { questions: 0 } },
		{ $unwind: "$category" },
	] )

	res.json( { quizzes } );
};

interface CreateQuizBody
{
	title: string;
	// description: string;
	difficulty: "Easy" | "Medium" | "Hard";
	timeLimit: number,
	description?: string,
	category: mongoose.Types.ObjectId
	questions: {
		questionText: string,
		options: string[],
		correctAnswer: number
	}[]
}

export const createQuiz: RequestHandler<unknown, unknown, CreateQuizBody, unknown> = async ( req, res, next ): Promise<void> =>
{
	try
	{
		let { title, difficulty, timeLimit, category, description, questions } = req.body

		if ( !title || !timeLimit || !category || !questions )
		{
			throw createHttpError( 400, "Missing Fields" )
		}

		if ( !mongoose.isValidObjectId( category ) )
		{
			throw createHttpError( 400, "invalid id for category" )
		}

		if ( ![ 'Easy', 'Medium', 'Hard' ].includes( difficulty ) )
		{
			throw createHttpError( 400, "Invalid difficulty level" );
		}

		// Validate questions array
		if ( !Array.isArray( questions ) || questions.length === 0 )
		{
			throw createHttpError( 400, "At least one question is required" );
		}

		if ( questions )
		{
			for ( let i = 0; i < questions.length; i++ )
			{
				const q = questions[ i ];

				if ( !q.questionText || !q.options || q.correctAnswer === undefined )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Invalid structure` );
				}

				if ( !Array.isArray( q.options ) || q.options.length < 2 )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Must have at least 2 options` );
				}

				if ( q.correctAnswer < 0 || q.correctAnswer >= q.options.length )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Invalid correct answer` );
				}
			}
		}

		const quiz = await Quiz.create( {
			title, difficulty, timeLimit, category, description
		} )

		const questionToBeCreated = questions.map( question => ( {
			quizId: quiz._id,
			questionText: question.questionText,
			options: question.options,
			correctAnswer: question.correctAnswer
		} ) )

		const createQuestions = await Question.insertMany( questionToBeCreated )

		res.status( 201 ).json( {
			message: "quiz created successfully", quizzes: {
				id: quiz._id,
				title: quiz.title,
				difficulty: quiz.difficulty,
				category: quiz.category,
				description: quiz.description,
				createdAt: quiz.createdAt,
				questions: createQuestions
			}
		} )

	} catch ( error )
	{
		next( error )
	}
}

export const updateQuiz: RequestHandler<{ id: string }, unknown, CreateQuizBody, unknown> = async ( req, res, next ): Promise<void> =>
{
	try
	{
		const quizId = req.params.id
		let { title, difficulty, timeLimit, category, description, questions } = req.body

		if ( !title || !timeLimit || !category || !questions )
		{
			throw createHttpError( 400, "Missing Fields" )
		}

		if ( !mongoose.isValidObjectId( category ) )
		{
			throw createHttpError( 400, "invalid id for category" )
		}

		if ( ![ 'Easy', 'Medium', 'Hard' ].includes( difficulty ) )
		{
			throw createHttpError( 400, "Invalid difficulty level" );
		}

		// Validate questions array
		if ( !Array.isArray( questions ) || questions.length === 0 )
		{
			throw createHttpError( 400, "At least one question is required" );
		}

		if ( questions )
		{
			for ( let i = 0; i < questions.length; i++ )
			{
				const q = questions[ i ];

				if ( !q.questionText || !q.options || q.correctAnswer === undefined )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Invalid structure` );
				}

				if ( !Array.isArray( q.options ) || q.options.length < 2 )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Must have at least 2 options` );
				}

				if ( q.correctAnswer < 0 || q.correctAnswer >= q.options.length )
				{
					throw createHttpError( 400, `Question ${ i + 1 }: Invalid correct answer` );
				}
			}
		}

		const update: any = {}

		if ( title !== undefined ) update.title = title
		if ( difficulty !== undefined ) update.difficulty = difficulty
		if ( category !== undefined ) update.category = category
		if ( timeLimit !== undefined ) update.timeLimit = timeLimit
		if ( description !== undefined ) update.description = description


		const updatedQuiz = await Quiz.findByIdAndUpdate( quizId, update, { new: true, runValidators: true } )

		let updatedQuestions;

		if ( questions )
		{
			await Question.deleteMany( { quizId } )

			const questionsToCreate = questions.map( q => ( {
				quizId: updatedQuiz!._id,
				questionText: q.questionText,
				options: q.options,
				correctAnswer: q.correctAnswer
			} ) );

			updatedQuestions = await Question.insertMany( questionsToCreate );
		} else
		{
			updatedQuestions = await Question.find( { quizId } );
		}



		res.status( 201 ).json( {
			message: "quiz created successfully", quizzes: {
				id: updatedQuiz!._id,
				title: updatedQuiz!.title,
				difficulty: updatedQuiz!.difficulty,
				category: updatedQuiz!.category,
				description: updatedQuiz!.description,
				createdAt: updatedQuiz!.createdAt,
				questions: updatedQuestions
			}
		} )

	} catch ( error )
	{
		next( error )
	}
}

export const getSingleQuiz: RequestHandler = async ( req, res, next ): Promise<void> =>
{
	try
	{
		const id = req.params.id

		if ( !id || !mongoose.isValidObjectId( id ) )
		{
			throw createHttpError( 400, "invalid id" )
		}

		const quiz = await Quiz.aggregate( [
			{
				$match: { _id: new mongoose.Types.ObjectId( id ) }
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
			{ $unwind: "$category" }
		] )

		if ( !quiz )
		{
			throw createHttpError( 404, "Quiz not Found" )
		}

		res.json( quiz )
	} catch ( error )
	{
		next( error )
	}
}

export const deleteQuiz: RequestHandler = async ( req, res, next ): Promise<void> =>
{
	try
	{
		const quizId = req.params.id

		const quiz = await Quiz.findByIdAndDelete( quizId )

		res.json( {
			message: "Quiz Successfully Deleted",
			quiz
		} )
	} catch ( error )
	{
		next( error )
	}
}
