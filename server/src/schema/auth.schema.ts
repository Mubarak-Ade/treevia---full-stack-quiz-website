import z from "zod";

export const AuthSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})
export type Register = z.infer<typeof AuthSchema>