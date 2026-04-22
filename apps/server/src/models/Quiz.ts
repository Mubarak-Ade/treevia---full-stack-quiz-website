import { Document, model, Schema, Types } from 'mongoose';

export interface IQuiz extends Document {
    title: string;
    category: Types.ObjectId;
    difficulty: 'easy' | 'medium' | 'hard';
    status: 'draft' | 'published' | 'archived';
    coverImage: string;
    xpReward: number;
    timeLimitPerQuestion: number;
    createdBy: Types.ObjectId;
    isPublic: boolean;
    shuffleQuestions: boolean;
    questions: { questionId: Types.ObjectId; order: number }[];
    stats: {
        questionCount: number;
        estimatedDurationMinutes: number;
        estimatedSuccessRate: number; // 0–100
    };
    publishedAt: Date;
    createdAt: String;
    updatedAt: String;
}

const QuizSchema = new Schema<IQuiz>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
        },
        timeLimitPerQuestion: {
            type: Number,
            default: 30,
            enum: [15, 30, 45, 60, 90, 120],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        xpReward: {
            type: Number,
            default: 500,
            min: 0,
            max: 10000,
        },
        shuffleQuestions: {
            type: Boolean,
            default: false,
        },
        coverImage: {
            type: String,
        },
        stats: {
            questionCount: {
                type: Number,
                default: 0,
                min: 0,
            },
            estimatedDurationMinutes: {
                type: Number,
                default: 0,
                min: 0,
            },
            estimatedSuccessRate: {
                type: Number,
                default: 0,
                min: 0,
                max: 100,
            },
        },
        questions: [
            {
                _id: false,
                questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
                order: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

QuizSchema.index({ status: 1, category: 1 });
QuizSchema.index({ createdBy: 1, status: 1 });

QuizSchema.pre('save', function (next) {
    const quiz = this;

    const count = quiz.questions.length;
    // ~30 s per question as a baseline, converted to minutes
    const avgSecondsPerQuestion = quiz.timeLimitPerQuestion ?? 30;
    const estimatedMinutes = parseFloat(((count * avgSecondsPerQuestion) / 60).toFixed(1));

    quiz.stats = {
        questionCount: count,
        estimatedDurationMinutes: estimatedMinutes,
        // Placeholder — replace with real ML/historical value
        estimatedSuccessRate: quiz.stats?.estimatedSuccessRate ?? 72,
    };

    if (quiz.isModified('status') && quiz.status === 'published') {
        quiz.publishedAt = new Date();
    }

    next();
});

const Quiz = model<IQuiz>('Quiz', QuizSchema);

export default Quiz;
