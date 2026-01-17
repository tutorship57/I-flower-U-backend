import * as argon2 from 'argon2';
import * as crypto from 'crypto';

export const hashPassword = async (password: string) => {
    try {
        const salt = crypto.randomBytes(16);
        const hashOptions = {
            type: argon2.argon2id,
            salt,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1,
        }
        const hash = await argon2.hash(
            password,
            hashOptions
        )
        return hash ;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

export const verifyPassword = async (hashedPassword: string, plainPassword: string) => {
    try {
        return await argon2.verify(hashedPassword, plainPassword);
    }catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Failed to verify password');
    }
}