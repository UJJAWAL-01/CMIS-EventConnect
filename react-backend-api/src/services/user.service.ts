import { User } from '../models/User';
import { Student } from '../models/Student';
import { Instructor } from '../models/Instructor';
import { Judge } from '../models/Judge';

export const getUserById = async (userId: string) => User.findById(userId);
export const updateUser = async (userId: string, updateData: any) => User.findByIdAndUpdate(userId, updateData, { new: true });
export const getAllUsers = async () => User.find();
export const deleteUser = async (userId: string) => User.findByIdAndDelete(userId);
export const createUser = async (data: any) => User.create(data);
export const getStudents = async () => Student.find();
export const getInstructors = async () => Instructor.find();
export const getJudges = async () => Judge.find();