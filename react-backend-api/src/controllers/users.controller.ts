import { Request, Response } from 'express';
import { validateUser } from '../validation/user.schema';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/user.service';

export const listUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.json(users);
};

export const fetchUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

export const addUser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error });
  const user = await createUser(req.body);
  return res.status(201).json(user);
};

export const modifyUser = async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error });
  const user = await updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

export const removeUser = async (req: Request, res: Response) => {
  const user = await deleteUser(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(204).send();
};