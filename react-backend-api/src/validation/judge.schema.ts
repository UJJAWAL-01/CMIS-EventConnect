import Joi from 'joi';

export const judgeSchema = Joi.object({
  user: Joi.string().optional(),
  expertise: Joi.array().items(Joi.string()).min(1).required(),
  rating: Joi.number().min(0).max(5).default(0)
});

export const validateJudge = (data: any) => {
  const { error } = judgeSchema.validate(data);
  return error ? { error: error.message } : { error: null };
};
