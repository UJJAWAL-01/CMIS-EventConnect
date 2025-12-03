import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IInstructor extends Document {
    user: Types.ObjectId;
    expertise: string;
    bio: string;
    courses: string[];
}

const InstructorSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    expertise: { type: String, required: true },
    bio: { type: String, required: true },
    courses: [{ type: String }]
}, { timestamps: true });

export const Instructor = mongoose.model<IInstructor>('Instructor', InstructorSchema);