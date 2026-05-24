import { Document, model, Schema } from 'mongoose';

interface IAnswer {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
}

interface IQuestion extends Document {
    prompt: string;
    options: [IAnswer];
    difficulty: 'easy' | 'medium' | 'hard';
    order?: number;
}

const AnswerOptionsSchema = new Schema<IAnswer>(
    {
        label: {
            type: String,
            enum: ['A', 'B', 'C', 'D'],
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
            maxLength: 300,
        },
        isCorrect: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const QuestionSchema = new Schema<IQuestion>(
    {
        prompt: {
            type: String,
            required: true,
            trim: true,
            maxLength: 1000,
        },
        options: {
            type: [AnswerOptionsSchema],
            validate: {
                validator: (opts: { isCorrect: boolean }[]) =>
                    opts.length >= 2 &&
                    opts.length <= 4 &&
                    opts.filter(o => o.isCorrect).length === 1,
                message: 'A question must have 2-4 options with exactly one correct answer.',
            },
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
        },
    },
    { timestamps: true }
);

const Question = model<IQuestion>('Question', QuestionSchema);

export default Question;
