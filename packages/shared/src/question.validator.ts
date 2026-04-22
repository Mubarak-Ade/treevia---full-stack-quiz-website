import z from 'zod';

const AnswerOptionsSchema = z.object({
    label: z.enum(['A', 'B', 'C', 'D']),
    text: z.string(),
    isCorrect: z.boolean(),
});

const QuestionSchema = z.object({
    prompt: z.string(),
    options: z.array(AnswerOptionsSchema).min(2).max(4),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

export type QuestionDTO = z.infer<typeof QuestionSchema>;
