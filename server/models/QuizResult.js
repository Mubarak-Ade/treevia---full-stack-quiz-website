// Path: server/models/QuizResult.js
import mongoose from 'mongoose'

const QuizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    score: {
        type: Number,
    },
    correctAnswers: {
        type: Number
    },
    percentage: {
        type: Number
    },
    answers: {
        type: Array
    },
    submittedAt: {
        type: Date
    } 
})


const Result = mongoose.model("Result", QuizResultSchema)

export default Result
