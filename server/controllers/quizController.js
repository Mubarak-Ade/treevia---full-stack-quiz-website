// Path: server\controllers\quizController.js
import mongoose from "mongoose"
import Question from "../models/Question.js"
import Quiz from "../models/Quiz.js"
import Result from "../models/QuizResult.js"
import User from "../models/User.js"
import { validateQuiz } from "../utils/validator.js"

export const createQuiz = async (req, res) => {
    const { title, category, difficulty, timeLimit, description } = req.body

    try {
        validateQuiz(title, category, timeLimit)
        const quiz = new Quiz({title, category, difficulty, timeLimit, description})
        await quiz.save()
        res.status(200).json({message: "Quiz Created Successfully", quiz: quiz.id, quizTitle: title})
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

}

export const getAllQuiz = async (req, res) => {

    try {
        const quiz = await Quiz.aggregate([
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "quizId",
                    as: "questions"
                }
            }
        ])
        res.status(200).json(quiz)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
export const getQuizzes = async (req, res) => {

    try {
        const quiz = await Quiz.find({})
        res.status(200).json(quiz)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const getQuizById = async (req, res) => {
    const { quizId } = req.params

    try {
        const [quiz] = await Quiz.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.quizId)
                }
            },
            {   
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "quizId",
                    as: "questions"
                }
            }
        ])
        res.status(200).json(quiz)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const deleteQuizById = async (req, res) => {
    const { id } = req.params
    try {
        const quiz = await Quiz.findByIdAndDelete(id)

        if (!quiz) {
            return res.status(404).json({message: "Quiz not found"})
        }
        res.status(200).json({msg:"quiz successfully deleted", quiz})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getQuestionById = async (req, res) => {
    const { quizId, questionId } = req.params

    try {
        const quiz = await Quiz.findById(quizId)

        if (!quiz) {
            return res.status(404).json({message: "Question not found in any quiz"})
        }

        const question = quiz.questions.id(questionId)

        if (!question) {
            return res.status(404).json({message: "Question not found"})
        }

        const {correctAnswer, ...questionData} = question.toObject()

        res.status(200).json(questionData)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateQuiz = async (req, res) => {
    const { quizId } = req.params
    const {} = req.body
}

export const submitQuiz = async (req, res) => {
    const { id } = req.params
    const { answers } = req.body

    try {
        const quiz = await Quiz.findById(id)
        // const user = await User.findById(id)

        if (!quiz) {
            res.status(404).json({ message: "Quiz not found" })
        }
        let score = 0

        quiz.questions.forEach((question, index) => {
            const userAnswer = answers[index]
            if (userAnswer && userAnswer === question.correctAnswer) {
                score++
            }
        })
        const total = quiz.questions.length;
        const percentage = (score / total) * 100


        const result = await Result.create({
            user: req.user.id,
            quiz: quiz._id,
            score,
            total,
            percentage,
            answers,
            submittedAt: new Date()
        })
        await result.populate("user", "username")
        await result.populate("quiz", "title")

        res.status(200).json({ score, total, percentage, result })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const getQuestions = async (req, res) => {
    try {
        const question = await Question.find({})
        res.status(200).json(question)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const editQuestions = async (req, res) => {

    const {quizId, questionId} = req.params
    const updated = req.body

    try {
        const quizzes = await Quiz.findById(quizId)

        if (!quizzes) {
            res.status(404).json('Quiz not found')
        }

        const questions = quizzes.questions.id(questionId)
        
        if (!questions) {
            res.status(404).json('Questions not found')
        }

        Object.assign(questions, updated)

        await quizzes.save()

        res.status(200).json(quizzes)
        
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

