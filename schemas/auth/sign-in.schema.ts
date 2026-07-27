import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().trim().email("Email not valid"),
    password: z.string().min(8, "Password must be at least 8 character")
})

export type SignInInput = z.infer<typeof signInSchema>

