import Joi from 'joi';

export const instructorSchema = Joi.object({
  user: Joi.string().optional(),
  expertise: Joi.string().min(2).max(120).required(),
  bio: Joi.string().min(5).max(1000).required(),
  courses: Joi.array().items(Joi.string()).default([])
});

export const validateInstructor = (data: any) => {
  const { error } = instructorSchema.validate(data);
  return error ? { error: error.message } : { error: null };
};
