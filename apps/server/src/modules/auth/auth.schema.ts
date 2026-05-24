import z from 'zod';

export const AuthSchema = {
    body: z.object({
    username: z.string().trim().min(2, 'Username is required'),
    email: z.string().trim().toLowerCase().email('A valid email is required'),
    password: z.string().min(6, 'Password is required and must be at least 8 characters'),
})}

export const LoginSchema = {body: AuthSchema.body.omit({ username: true })}

export const SendResetTokenSchema = {
    body: z.object({
        email: z.string()
    })
}

export const VerifyResetTokenSchema = {
    body: z.object({
        token: z.string(),
        password: z.string()
    })
}

export type Register = z.infer<typeof AuthSchema.body>;
export type Login = z.infer<typeof LoginSchema.body>;
export type ResetToken = z.infer<typeof SendResetTokenSchema.body>
export type VerifyToken = z.infer<typeof VerifyResetTokenSchema.body>