import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'judge', 'admin'],
        default: 'student',
    },
    name: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);