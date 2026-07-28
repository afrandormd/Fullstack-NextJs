import { cookies } from "next/headers";
import { prisma } from "../db";
import { generateToken, SESSION_COOKIE, sha256 } from "./utils";

/**
 * Create new session for user
 * @param userId ID user will be created session
*/
export async function createSession(userId: string): Promise<void> {
    // Generate token with hash
    const token = generateToken()
    const tokenHash = sha256(token)

    // Session valid for 30 days
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    // Save session to database
    await prisma.session.create({
        data: {
            userId,
            tokenHash,
            expiresAt
        }
    })

    // Set cookie with not hashed token
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true, // Not accesed with JavaScript
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'lax', // CSRF protection
        path: '/', // Applies to all sites
        expires: expiresAt, // Epires according to database
    })

}

/**
 * Delete user's session (logout) 
*/
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    // Delete session from the database if the token exists
    if (token) {
        await prisma.session.deleteMany({
            where: { tokenHash: sha256(token) },
        })
    }

    // Clear cookie with change expired date to past time
    cookieStore.set(SESSION_COOKIE, '', {
        path: '/',
        expires: new Date(0) // Expires immediately
    })
}

/**
 * Retrieve the currently logged-in user based on the session
 * @returns User object if the session is valid, null otherwise
*/
export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    // If there is no token, the user is not logged in
    if (!token) {
        return null
    }

    // Find the session in the database based on the token hash
    const session = await prisma.session.findUnique({
        where: { tokenHash: sha256(token) },
        include: { user: true } // Include data user
    })

    // If the session not founded
    if (!session) {
        return null
    }

    // Check if session has expired
    if (session.expiresAt < new Date()) {
        // Delete expired session in the database
        await prisma.session.delete({
            where: { id: session.id }
        })
        return null
    }

    // Return data user
    return session.user
}

