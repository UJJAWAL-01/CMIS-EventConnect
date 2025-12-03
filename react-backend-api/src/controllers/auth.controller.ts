import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    const { username, password, role, name } = req.body;
    try {
        const user = await authService.register(username, password, role, name);
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (e: any) {
        const msg = e.message || 'Registration failed';
        const status = msg === 'Username already taken' || msg === 'Invalid role supplied' ? 400 : 500;
        return res.status(status).json({ message: msg });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (e: any) {
        const msg = e.message || 'Login failed';
        const status = msg === 'Invalid credentials' ? 401 : 500;
        return res.status(status).json({ message: msg });
    }
};