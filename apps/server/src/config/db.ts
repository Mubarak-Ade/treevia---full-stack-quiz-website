import mongoose from 'mongoose';
import env from '../env.js';

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        ('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(env.MONGO_URI as string, {
            // Use connection pooling for serverless
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });

        isConnected = db.connections[0].readyState === 1;
        ('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};