import z from 'zod';

const ValidTime = [15, 30, 45, 60, 90, 120];

const QuestionSchema = z.object({
    prompt: z.string(),
    options: z.array(
        z.object({ label: z.enum(['A', 'B', 'C', 'D']), text: z.string, isCorrect: z.boolean() })
    ),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    order: z.number(),
});

export const CreateQuizSchema = {
    body: z.object({
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
    }),
};

export const UpdateQuizSchema = {
    param: z.object({ id: z.string() }),
    body: z.object({
        title: z.string().optional(),
        status: z.enum(['draft', 'published', 'archived']).optional(),
        isPublic: z.boolean().optional(),
        xpReward: z.number().optional(),
        shuffleQuestions: z.boolean().optional(),
        category: z.string().optional(),
        timeLimitPerQuestion: z
            .number()
            .refine(val => ValidTime.includes(val), { message: 'Invalid time limit select' })
            .optional(),
        difficulty: z
            .enum(['easy', 'medium', 'hard'], {
                message: 'Select a difficulty level',
            })
            .optional(),
        // questions: z.array(QuestionSchema),
    }),
};

export type CreateQuizDTO = z.infer<typeof CreateQuizSchema.body>;
export type UpdateQuizDTO = z.infer<typeof UpdateQuizSchema.body>;
