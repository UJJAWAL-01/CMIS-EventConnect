import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'instructor', 'judge', 'admin').required()
});

export const validateUser = (data: any) => {
    const { error } = userSchema.validate(data);
    return error ? { error: error.message } : { error: null };
};