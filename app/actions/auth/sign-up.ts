"use server"

import { prisma } from "@/lib/db"
import { signUpSchema } from "@/schemas/auth/sign-up.schema"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

// Interface for error validation
interface SignUpActionState {
    errors: {
        name?: string[]
        email?: string[]
        password?: string[]
        termsAccepted?: string[]
        _form?: string[]
    }
}

/*
 * Action for sign up process
 * @param formData the data is from sign up form
*/
export async function signUpAction(
    _prevState: SignUpActionState,
    formData: FormData
): Promise<SignUpActionState> {

    // Form data validation using zod
    const result = signUpSchema.safeParse({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        termsAccepted: formData.get('termsAccepted') === 'on' || formData.get('termsAccepted') === 'true'
    })

    // If validation failed
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    try {
        // Hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(result.data.password, 10)

        // Save new user into database using prisma
        await prisma.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
            }
        })

        // Redirect to sign-in page after successfully sign-up
        redirect('/sign-in')

    } catch (error: any) {

        // Error NEXT_REDIRECT
        if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error

        // Error handling from prisma (email duplication)
        // NOTE: Prisma unique constraint usually is code = P2002
        if (error?.code === 'P2002') {
            return {
                errors: {
                    email: ['Email already registered']
                }
            }
        }

        // General errors
        return {
            errors: {
                _form: ['Registration failed, please try again']
            }
        }

    }

}
