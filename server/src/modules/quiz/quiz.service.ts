import createHttpError from 'http-errors';
import Question from '../../models/Question.js';
import Quiz from '../../models/Quiz.js';
import Result from '../../models/QuizResult.js';
import UserStats from '../../models/UserStats.js';

const getQuizzes = async (category?: string | string[]) => {
    const filter = category ? { categories: category } : {};
    return Quiz.find(filter).sort({ createdAt: -1 }).lean();
};

const getQuestions = async (quizId: string, userId?: string) => {
    const questions = await Question.find({ quizId });

    if (userId) {
        const activeAttempt = await Result.findOne({
            user: userId,
            quiz: quizId,
            submittedAt: null,
        });

        if (!activeAttempt) {
            await Result.create({
                user: userId,
                quiz: quizId,
                score: 0,
                xpEarned: 0,
                correctAnswers: [],
                startedAt: new Date(),
            });
        }
    }

    return questions;
};

const submitQuiz = async (quizId: string, selectedOptions: number[], userId?: string) => {
    if (!quizId || !Array.isArray(selectedOptions)) {
        throw createHttpError(400, 'invalid submission data');
    }

    const [questions, quiz] = await Promise.all([
        Question.find({ quizId }).lean(),
        Quiz.findById(quizId),
    ]);

    if (!questions.length || !quiz) {
        throw createHttpError(404, 'Quiz not found');
    }

    let correctCount = 0;
    const attempts = questions.map((question, index) => {
        const selectedIndex = selectedOptions[index];
        const isCorrect =
            typeof selectedIndex === 'number' && selectedIndex === question.correctAnswer;

        if (isCorrect) {
            correctCount++;
        }

        return {
            question: question.questionText,
            selected: question.options[selectedIndex] ?? null,
            correct: question.options[question.correctAnswer],
            isCorrect,
        };
    });

    const totalQuestions = questions.length;
    const score = correctCount;
    const xpEarned = correctCount * 10;
    const correctAnswers = questions.map(q => q.correctAnswer);

    let saved = false;
    let elapsedSeconds = 0;

	console.log(userId);
	

    if (userId) {
        let attempt = await Result.findOne({
            user: userId,
            quiz: quizId,
            submittedAt: null,
        });

        if (!attempt) {
            attempt = await Result.create({
                user: userId,
                quiz: quizId,
                score: 0,
                xpEarned: 0,
                correctAnswers: [],
                startedAt: new Date(),
            });
        }

        const attemptStartedAt = attempt.startedAt ?? attempt.createdAt ?? new Date();
        if (!attempt.startedAt) {
            attempt.startedAt = attemptStartedAt;
        }

        elapsedSeconds = (Date.now() - attemptStartedAt.getTime()) / 1000;

        attempt.submittedAt = new Date();
        attempt.timeTaken = Math.floor(elapsedSeconds);
        attempt.score = score;
        attempt.xpEarned = xpEarned;
        attempt.correctAnswers = correctAnswers;
        await attempt.save();

        await UserStats.findOneAndUpdate(
            { user: userId },
            {
                $inc: {
                    quizzesTaken: 1,
                    totalCorrect: correctCount,
                    totalFailed: totalQuestions - correctCount,
                    totalXp: xpEarned,
                },
                $max: { highestScore: score },
                $set: { lastQuizDate: Date.now() },
            },
            { upsert: true }
        );

        saved = true;
    }

    const stats = userId
        ? await UserStats.findOne({ user: userId }).populate('user', 'username')
        : null;

    return {
        score,
        stats,
        totalQuestions,
        accuracy: (score / totalQuestions) * 100,
        xpEarned,
        attempts,
        saved,
    };
};

const getRandomQuiz = async () => {
    const randomQuiz = await Quiz.aggregate([
        { $sample: { size: 3 } },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $lookup: {
                from: 'questions',
                localField: '_id',
                foreignField: 'quizId',
                as: 'questions',
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                category: '$category.name',
                difficulty: 1,
                timeLimit: 1,
                createdAt: 1,
                updatedAt: 1,
                questionCount: { $size: '$questions' },
            },
        },
        { $unwind: '$category' },
    ]);

    if (randomQuiz.length === 0) {
        throw createHttpError(404, 'No quizzes available');
    }

    return randomQuiz;
};

export default { getQuizzes, getQuestions, submitQuiz, getRandomQuiz };
