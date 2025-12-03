import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/default';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
    const token = header.split(' ')[1];
    try {
        const payload: any = jwt.verify(token, config.jwt.secret);
        req.user = { id: payload.sub, role: payload.role };
        return next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};