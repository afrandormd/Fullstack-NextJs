import { redirect } from "next/navigation";
import { getCurrentUser } from "./session";

/**
 * Middleware for make sure user has logged-in
 * Otherwise, redirect to the sign-in page
 * @returns user object
*/
export async function authIsRequired() {

    // make sure user has authenticated
    const user = await getCurrentUser()

    // If user hasn't login, redirect to the sign-in page
    if (!user) {
        redirect('/sign-in')
    }

    // return user object
    return user
}

/**
 * Middleware for make sure user hasn't login
 * If has logged-in, redirect to the dashboard page
*/
export async function authIsNotRequired() {
    // make sure user hasn't authenticated
    const user = await getCurrentUser()

    // If user has logged-in, redirect to dashboard page
    if (user) {
        redirect('/dashboard')
    }
}
