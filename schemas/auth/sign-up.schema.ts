import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 character"),
    email: z.string().trim().email("Email not valid"),
    password: z.string().min(8, "Password must be at least 8 character"),
    termsAccepted: z.literal(true, {
        message: "You must accepted Terms & Privacy Policy",
    })
})

export type SignUpInput = z.infer<typeof signUpSchema>
