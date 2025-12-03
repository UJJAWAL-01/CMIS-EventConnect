import { Instructor } from '../models/Instructor';
import { validateInstructor } from '../validation/instructor.schema';

export const createInstructor = async (data: any) => {
  const { error } = validateInstructor(data);
  if (error) throw new Error(error);
  const instructor = new Instructor(data);
  return instructor.save();
};
export const getInstructors = async () => Instructor.find();
export const getInstructorById = async (id: string) => Instructor.findById(id);
export const updateInstructor = async (id: string, data: any) => {
  const { error } = validateInstructor(data);
  if (error) throw new Error(error);
  return Instructor.findByIdAndUpdate(id, data, { new: true });
};
export const deleteInstructor = async (id: string) => Instructor.findByIdAndDelete(id);