import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDatabase } from '../src/db/seeds/seed';

dotenv.config({ path: __dirname + '/../.env' });

const run = async () => {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/cmis_event_connect';
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB:', uri);
        await seedDatabase();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

run();