import { z } from "zod"

export const updateUserSchema = z.object({
    id: z.string().cuid("ID user not valid"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Email not valid"),
    password: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((v) => !v || v.length >= 8, "Password must be at least 8 characters")
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
