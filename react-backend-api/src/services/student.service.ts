import { Student } from '../models/Student';
import { validateStudent } from '../validation/student.schema';

export const createStudentService = async (data: any) => {
  const { error } = validateStudent(data);
  if (error) throw new Error(error);
  const student = new Student(data);
  return student.save();
};
export const getStudentByIdService = async (id: string) => Student.findById(id);
export const getAllStudentsService = async () => Student.find();
export const updateStudentService = async (id: string, data: any) => {
  const { error } = validateStudent(data);
  if (error) throw new Error(error);
  return Student.findByIdAndUpdate(id, data, { new: true });
};
export const deleteStudentService = async (id: string) => Student.findByIdAndDelete(id);