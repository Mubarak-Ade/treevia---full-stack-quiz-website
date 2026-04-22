import z from 'zod';

export const CreateCategorySchema = {
    body: z.object({
        name: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).or(z.array(z.object({ name: z.string }))),
    }),
};

export const UpdateCategorySchema = { body: CreateCategorySchema.body.partial(), id: z.string() };

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema.body>;
export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema.body>;
