import z from "zod";

export const AuthSchema = z.object({
    username: z.string().min(2, "Username is required"),
    email: z.string().min(2, "email is required"),
    password: z.string().min(8, "Password is required and must be atleast 8 char")
})
export type Register = z.infer<typeof AuthSchema>