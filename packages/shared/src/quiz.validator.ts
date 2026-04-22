import z from 'zod';
import { ValidTime } from './constants';

const QuizSchema = z.object({
    title: z.string().min(3, 'Please enter quiz title'),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    isPublic: z.boolean().default(false),
    xpReward: z.number().default(500),
    coverImage: z.string().optional(),
    createdBy: z.string().optional(),
    shuffleQuestions: z.boolean().default(false),
    category: z.string().min(1, 'Select a category'),
    timeLimitPerQuestion: z
        .number()
        .refine(val => ValidTime.includes(val), { message: 'Invalid time limit select' })
        .default(30),
    difficulty: z
        .enum(['easy', 'medium', 'hard'], {
            message: 'Select a difficulty level',
        })
        .default('easy'),
    // questions: z.array(QuestionSchema),
});

export type QuizFormData = z.infer<typeof QuizSchema>;
