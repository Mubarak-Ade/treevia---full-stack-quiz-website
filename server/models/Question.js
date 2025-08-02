// Path: server\models\Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    questionText: {
        type: String,
        required: [true, "Question is required"],
    },
    options: { 
        type: [String],
        required: [true, "Options are required"],
        validate: [arr => arr.length === 4, "Must provide exactly 4 options"]
    },
    correctAnswer: {
        type: Number,
        required: [true, "Correct Answer is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

const Question = mongoose.model("Question", questionSchema)

export default Question