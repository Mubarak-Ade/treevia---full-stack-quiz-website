import z from 'zod';

export const QUIZ_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export const QUIZ_TIME_LIMITS = [15, 30, 45, 60, 90, 120] as const;

const QuestionOptionSchema = z.object({
    A: z.string().min(1, 'Option A is required'),
    B: z.string().min(1, 'Option B is required'),
    C: z.string().min(1, 'Option C is required'),
    D: z.string().min(1, 'Option D is required'),
});

const QuizQuestionSchema = z.object({
    id: z.string().optional(),
    questionText: z.string().min(1, 'Question text is required'),
    correctAnswer: z.number().int().min(0).max(3),
    options: QuestionOptionSchema,
});

export const QuizSchema = z.object({
    title: z.string().min(3, 'Please enter quiz title'),
    category: z.string().min(1, 'Select a category'),
    timeLimitPerQuestion: z
        .number()
        .refine(value => QUIZ_TIME_LIMITS.includes(value as (typeof QUIZ_TIME_LIMITS)[number]), {
            message: 'Select a valid time limit',
        }),
    difficulty: z.enum(QUIZ_DIFFICULTIES, {
        message: 'Select a difficulty level',
    }),
    xpReward: z.number().min(0, 'XP reward cannot be negative').max(10000),
    isPublic: z.boolean(),
    shuffleQuestions: z.boolean(),
    questions: z.array(QuizQuestionSchema),
});

export type QuizFormData = z.infer<typeof QuizSchema>;
