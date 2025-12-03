import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IJudge extends Document {
    user: Types.ObjectId;
    expertise: string[];
    rating: number;
}

const JudgeSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    expertise: { type: [String], required: true },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

export const Judge = mongoose.model<IJudge>('Judge', JudgeSchema);