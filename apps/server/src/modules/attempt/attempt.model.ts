import { Document, model, Schema, Types } from 'mongoose';

interface IAnswers {
    questionId: Types.ObjectId;
    selectedOptionLabel: string;
    isCorrect: boolean;
}

interface IAttempts extends Document {
    user: Types.ObjectId;
    quiz: Types.ObjectId;
    score: number;
    answers: IAnswers[];
    xpEarned: number;
    status: "in-progress" | "completed" | "abandoned"
    startedAt: Date;
    submittedAt: Date;
    timeTaken: number;
    createdAt: Date;
    updatedAt: Date;
}

const Answers = new Schema<IAnswers>(
    {
        questionId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        selectedOptionLabel: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
    },
    { _id: false }
);

const Attempts = new Schema<IAttempts>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        quiz: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz',
            index: true,
        },
        score: {
            type: Number,
            min: 0,
            default: 0,
        },
        status: {
            type: String,
            enum: ["in-progress", "completed", "abandoned"],
            default: "in-progress"
        },
        answers: [Answers],
        xpEarned: {
            type: Number,
            default: 0,
        },

        startedAt: {
            type: Date,
            required: true,
        },

        submittedAt: {
            type: Date,
        },

        timeTaken: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Attempt = model<IAttempts>('Attempt', Attempts);

export default Attempt;
