import 'dotenv/config';
import mongoose from 'mongoose';
import env from '../env.js';
import Quiz from '../models/Quiz.js';

const applyQuizPreSave = async () => {
    await mongoose.connect(env.MONGO_URI);
    console.log('Connected to db successfully');

    try {
        const quizzes = await Quiz.find();

        console.log(`Found ${quizzes.length} quizzes to refresh`);

        let updatedCount = 0;

        for (const quiz of quizzes) {
            // Mark quiz as dirty so save middleware recalculates derived stats.
            quiz.markModified('questions');
            await quiz.save();
            updatedCount += 1;
        }

        console.log(`Applied pre-save middleware to ${updatedCount} quizzes successfully`);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from db successfully');
    }
};

applyQuizPreSave().catch(error => {
    console.error('Failed to apply pre-save middleware to quizzes');
    console.error(error);
    process.exit(1);
});
