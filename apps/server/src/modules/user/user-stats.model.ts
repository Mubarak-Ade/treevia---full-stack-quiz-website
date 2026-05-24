import { Document, InferSchemaType, model, Schema, Types } from 'mongoose';
import { calculateLevel, getNextXp } from '../../utils/xp_level_calculator.js';
import { getUserRank } from '../dashboard/dashboard.service.js';

export interface IStats extends Document {
    user: Types.ObjectId;
    quizzesTaken: number;
    totalCorrect: number;
    totalFailed: number;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
    highestScore: number;
    lastQuizDate: Date;
    nextXp: number;
    level: number;
}

const UserStatsSchema = new Schema<IStats>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            unique: true,
            required: true,
        },
        quizzesTaken: {
            type: Number,
            default: 0,
        },

        totalCorrect: {
            type: Number,
            default: 0,
        },
        totalFailed: {
            type: Number,
            default: 0,
        },
        totalXp: {
            type: Number,
            default: 0,
            index: true,
        },
        currentStreak: {
            type: Number,
            default: 0,
        },
        longestStreak: {
            type: Number,
            default: 0,
        },
        highestScore: {
            type: Number,
            default: 0,
        },
        lastQuizDate: {
            type: Date,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserStatsSchema.virtual('accuracy').get(function () {
    const totalFailed = this.totalFailed
    const totalCorrect = this.totalCorrect
    const totalQuestion = totalFailed + totalCorrect

    const accuracy = Math.round((totalCorrect / totalQuestion) * 100)
    return accuracy
})

UserStatsSchema.virtual('level').get(function () {
    const totalXp = this.totalXp;
    const level = calculateLevel(totalXp)
    return level
});

UserStatsSchema.virtual('xp').get(function () {
    const totalXp = this.totalXp
    const xp = getNextXp(totalXp)
    return xp 
});

UserStatsSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;

    const stats = update.$set || update;

    const today = new Date();
    const lastAttempt = stats?.lastQuizDate;

    const diffDays = lastAttempt
        ? Math.floor(today.getTime() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24)
        : null;

    let newStreak: number;

    if (!lastAttempt || diffDays! > 1) {
        newStreak = 1;
    } else if (diffDays === 1) {
        newStreak = (stats?.currentStreak ?? 0) + 1;
    } else {
        newStreak = stats.currentStreak ?? 1;
    }

    stats.currentStreak = newStreak;
    stats.longestStreak = stats.currentStreak;

    next();
});

const UserStats = model<IStats>('UserStats', UserStatsSchema);

export default UserStats;
