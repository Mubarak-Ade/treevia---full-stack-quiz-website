// Path: server\controllers\questionController.js
import Question from "../models/Question.js"
import Quiz from "../models/Quiz.js"
import { validateQuestion } from "../utils/validator.js"

export const createQuestion = async (req, res) => {
    const {questionText, options, correctAnswer} = req.body
    const { quizId } = req.params

    try {
        validateQuestion(questionText, options, correctAnswer)
        const question = new Question({quizId, questionText, options, correctAnswer})
        await question.save()
        res.status(200).json({message: "question created Successfully", question})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteQuestion = async (req, res) => { 
    const { questionId } = req.params

    try {
        const question = await Question.findByIdAndDelete(questionId)
         if (!question) {
            return res.status(404).json({message: "Question not found"})
        }
        res.status(200).json({message: "question deleted successfully", question})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}