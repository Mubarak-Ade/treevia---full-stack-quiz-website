import Quiz from '../../models/Quiz.js';
import Result from '../../models/QuizResult.js';
import UserStats from '../../models/UserStats.js';
import { AppError } from '../../utils/error-handler.js';
import { QuizRepository } from '../admin/quiz/quiz.repository.js';

const getQuizzes = async (category?: string | string[]) => {
    const filter = category ? { category, status: 'published' } : { status: 'published' };
    const quizzes = await QuizRepository.findAll(filter).populate('category', 'name');

    return quizzes.map(quiz => ({
        _id: String(quiz._id),
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
        status: quiz.status,
        questionCount: quiz.stats?.questionCount ?? 0,
        timeLimitPerQuestion: quiz.timeLimitPerQuestion,
        xpReward: quiz.xpReward,
        coverImage: quiz.coverImage,
        estimatedDurationMinutes: quiz.stats?.estimatedDurationMinutes ?? 0,
        estimatedSuccessRate: quiz.stats?.estimatedSuccessRate ?? 0,
    }));
};

const getQuestions = async (quizId: string, userId?: string) => {
    const quiz = await Quiz.findById(quizId).populate('questions.questionId');
    if (!quiz) {
        throw new AppError(404, 'Quiz not found');
    }

    const questions = [...quiz.questions]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(item => {
            const question = item.questionId as any;
            return {
                _id: String(question._id),
                prompt: question.prompt,
                options: question.options.map((option: any) => option.text),
                correctAnswer: question.options.findIndex((option: any) => option.isCorrect),
            };
        });

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
        throw new AppError(400, 'invalid submission data');
    }

    const quiz = await Quiz.findById(quizId).populate('questions.questionId');
    if (!quiz || !quiz.questions.length) {
        throw new AppError(404, 'Quiz not found');
    }

    const questions = [...quiz.questions]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(item => {
            const question = item.questionId as any;
            return {
                prompt: question.prompt,
                options: question.options.map((option: any) => option.text),
                correctAnswer: question.options.findIndex((option: any) => option.isCorrect),
            };
        });

    let correctCount = 0;
    const attempts = questions.map((question, index) => {
        const selectedIndex = selectedOptions[index];
        const isCorrect =
            typeof selectedIndex === 'number' && selectedIndex === question.correctAnswer;

        if (isCorrect) {
            correctCount++;
        }

        return {
            question: question.prompt,
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

    userId;

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
        { $match: { status: 'published' } },
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
            $project: {
                _id: 1,
                title: 1,
                category: { $arrayElemAt: ['$category', 0] },
                difficulty: 1,
                status: 1,
                coverImage: 1,
                timeLimitPerQuestion: 1,
                createdAt: 1,
                updatedAt: 1,
                questionCount: '$stats.questionCount',
            },
        },
    ]);

    if (randomQuiz.length === 0) {
        throw new AppError(404, 'No quizzes available');
    }

    return randomQuiz;
};

export default { getQuizzes, getQuestions, submitQuiz, getRandomQuiz };
