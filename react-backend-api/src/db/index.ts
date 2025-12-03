import mongoose from 'mongoose';
import config from '../config/default';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.database.uri);
        console.log(`MongoDB connected: ${config.database.uri}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};