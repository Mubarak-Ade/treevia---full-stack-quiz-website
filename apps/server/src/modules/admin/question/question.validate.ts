import z from 'zod';

const AnswerOptionsSchema = z.object({
    label: z.enum(['A', 'B', 'C', 'D']),
    text: z.string(),
    isCorrect: z.boolean(),
});

export const QuestionSchema = {
    // params: z.object({
    //     id: z.string(),
    // }),
    body: z.object({
        prompt: z.string(),
        options: z.array(AnswerOptionsSchema).min(2).max(4),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    }),
};

export const UpdateQuestionSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        prompt: z.string().optional(),
        options: z.array(AnswerOptionsSchema).min(2).max(4).optional(),
        difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    }),
};

export const AddQuestionParamSchema = {
    params: z.object({
        quizId: z.string(),
        questionId: z.string(),
    }),
};

export const QuestionParamSchema = {
    params: z.object({
        id: z.string(),
    }),
};

export type UpdateQuestionDTO = z.infer<typeof UpdateQuestionSchema.body>;
export type AddQuestionDTO = z.infer<typeof QuestionSchema.body>;
