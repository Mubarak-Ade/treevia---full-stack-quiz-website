import z from "zod";

const OptionSchema = z.object({
    questionId: z.string(),
    label: z.string(),
    // isCorrect: z.boolean()
})

export const AttemptSchema = {
    body: z.array(OptionSchema),
    params: z.object({
        quizId: z.string()
    })
}

export const AttemptParams = {
    params: z.object({
        quizId: z.string()
    })
} 

export type SelectedOption = z.infer<typeof AttemptSchema.body>