import { InferSchemaType, model, Schema } from "mongoose";

const UserStatsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        unique: true,
        required: true
    },
    quizzesTaken: {
        type: Number,
        default: 0
    },
    totalCorrect: {
        type: Number,
        default: 0
    },
    totalFailed: {
        type: Number,
        default: 0
    },
    totalXp: {
        type: Number,
        default: 0,
        index: true
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    highestScore: {
        type: Number,
        default: 0
    },
    lastQuizDate: {
        type: Date
    }
}, {timestamps: true});

type UserStats = InferSchemaType<typeof UserStatsSchema>

const UserStats = model<UserStats>('UserStats', UserStatsSchema);

export default UserStats;