import crypto from "crypto"

const SESSION_COOKIE = 'nextjs_session'

/**
 * Generate hash SHA-256 from input string
 * @param input string will be hashed
 * @returns Hashed string with hex format
*/
function sha256(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex')
}


/**
 * Generate secure random token for cookie
 * @returns token with base64url format
*/
function generateToken(): string {
    return crypto.randomBytes(32).toString('base64url')
}

export { sha256, generateToken, SESSION_COOKIE }
