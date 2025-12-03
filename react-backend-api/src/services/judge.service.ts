import { Judge } from '../models/Judge';
import { validateJudge } from '../validation/judge.schema';

export const createJudge = async (data: any) => {
  const { error } = validateJudge(data);
  if (error) throw new Error(error);
  const judge = new Judge(data);
  return judge.save();
};
export const getJudges = async () => Judge.find();
export const getJudgeById = async (id: string) => Judge.findById(id);
export const updateJudge = async (id: string, data: any) => {
  const { error } = validateJudge(data);
  if (error) throw new Error(error);
  return Judge.findByIdAndUpdate(id, data, { new: true });
};
export const deleteJudge = async (id: string) => Judge.findByIdAndDelete(id);