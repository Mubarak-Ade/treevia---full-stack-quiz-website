// Path: server\models\Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, 
        required: [true, "Quiz title is required"]
    }, 
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    timeLimit: {
        type: Number,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

quizSchema.statics.createQuiz = async function () {
      
    const quiz = await this.create({
        title,
        category,
        questions,
        timeLimit,
        description
    })
    
    validateQuiz()

    return quiz
}


const Quiz = mongoose.model("Quiz",  quizSchema);

export default Quiz