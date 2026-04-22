import z from 'zod';

export const AuthSchema = {
    body: z.object({
    username: z.string().trim().min(2, 'Username is required'),
    email: z.string().trim().toLowerCase().email('A valid email is required'),
    password: z.string().min(8, 'Password is required and must be at least 8 characters'),
})}

export const LoginSchema = {body: AuthSchema.body.omit({ username: true })}

export type Register = z.infer<typeof AuthSchema>;
export type Login = z.infer<typeof LoginSchema>;
