import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions, sign } from 'jsonwebtoken';
import { User } from '../models/User';
import config from '../config/default';

const SALT_ROUNDS = 10;
const allowedRoles = ['student', 'instructor', 'judge', 'admin'];

export class AuthService {
    async register(username: string, password: string, role: string, name?: string) {
        if (!allowedRoles.includes(role)) {
            throw new Error('Invalid role supplied');
        }
        const existing = await User.findOne({ username });
        if (existing) {
            throw new Error('Username already taken');
        }
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({ username, password: hashed, role, name });
        const safeUser = { id: user._id, username: user.username, role: user.role, name: user.name };
        return safeUser;
    }

    async login(username: string, password: string) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }
        const secret: Secret = config.jwt.secret as string;
        const token = sign(
            { sub: user._id.toString(), role: user.role, username: user.username, name: user.name },
            secret,
            { expiresIn: config.jwt.expiration } as SignOptions
        );
        return token;
    }
}

export const verifyTokenMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, config.jwt.secret) as any;
        req.user = payload;
        next();
    } catch (e) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};