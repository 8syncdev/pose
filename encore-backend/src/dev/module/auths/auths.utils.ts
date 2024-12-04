import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Secure password hashing using bcrypt
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // Higher rounds increase security but take more time
    return await bcrypt.hash(password, saltRounds); // bcrypt automatically generates salt and hashes the password
}

// Password verification using bcrypt
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return await bcrypt.compare(password, storedHash); // bcrypt automatically handles salt and hash comparison
}


// Simulate the secure retrieval of the JWT secret
const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

// JWT-like token generation using jsonwebtoken
export function generateToken(userId: string, username: string): string {
    const payload = { sub: userId, username };
    const options = { expiresIn: '7d' }; // Token expiration time (7 days)
    // expiresIn accepts:
    // Seconds: '120' = 2 minutes
    // Minutes: '2m' = 2 minutes  
    // Hours: '2h' = 2 hours
    // Days: '2d' = 2 days
    // Weeks: '2w' = 2 weeks
    // Months: '2M' = 2 months (case sensitive)
    // Years: '2y' = 2 years

    return jwt.sign(payload, jwtSecret, options); // Signs the token with HS256 by default
}

// JWT-like token verification using jsonwebtoken
export function verifyToken(token: string): { sub: string, username: string } {
    try {
        const decoded = jwt.verify(token, jwtSecret); // Automatically verifies the signature and expiration
        return decoded as { sub: string, username: string };
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
}
