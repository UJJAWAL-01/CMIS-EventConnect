import { object, string } from 'yup';
import { Request, Response, NextFunction } from 'express';

const registerSchema = object({
  username: string().email('Username must be a valid email').required('Username (email) is required'),
  password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: string().oneOf(['student', 'instructor', 'judge', 'admin'], 'Invalid role').required('Role is required'),
  name: string().optional()
});

const loginSchema = object({
  username: string().email('Username must be a valid email').required('Username (email) is required'),
  password: string().required('Password is required')
});

export const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerSchema.validate(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.errors?.[0] || 'Invalid registration data' });
  }
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginSchema.validate(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.errors?.[0] || 'Invalid login data' });
  }
};
