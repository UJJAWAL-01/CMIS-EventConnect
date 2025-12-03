import Joi from 'joi';

export const studentSchema = Joi.object({
    user: Joi.string().optional(),
    major: Joi.string().max(100).required(),
    year: Joi.number().integer().min(1).max(8).required(),
    gpa: Joi.number().min(0).max(4).required()
});

export const validateStudent = (data: any) => {
    const { error } = studentSchema.validate(data);
    return error ? { error: error.message } : { error: null };
};