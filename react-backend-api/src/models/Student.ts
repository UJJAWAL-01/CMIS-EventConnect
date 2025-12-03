import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudent extends Document {
    user: Types.ObjectId;
    major: string;
    year: number;
    gpa: number;
}

const StudentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    major: { type: String, required: true },
    year: { type: Number, required: true },
    gpa: { type: Number, required: true }
}, { timestamps: true });

export const Student = mongoose.model<IStudent>('Student', StudentSchema);