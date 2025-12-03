import { Request, Response } from 'express';
import { getAllUsers, deleteUser, updateUser } from '../services/user.service';

export const adminGetAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (e) {
        return res.status(500).json({ message: 'Error retrieving users' });
    }
};

export const adminDeleteUser = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        return res.json({ message: 'User deleted' });
    } catch (e) {
        return res.status(500).json({ message: 'Error deleting user' });
    }
};

export const adminUpdateUser = async (req: Request, res: Response) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ message: 'Error updating user' });
    }
};