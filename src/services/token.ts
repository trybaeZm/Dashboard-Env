// utils/jwt.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = 'your_default_secret';

export function generateToken(payload: object, expiresIn: any | '1h'): string {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, JWT_SECRET as string, options);
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET as string);
}