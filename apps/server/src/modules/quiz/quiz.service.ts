import Quiz from './quiz.model.js';
import Result from '../attempt/attempt.model.js';
import UserStats from '../user/user-stats.model.js';
import { AppError } from '../../utils/error-handler.js';
import { QuizRepository } from '../admin/quiz/quiz.repository.js';
import Question from './question.model.js';
import { SelectedOption } from '../attempt/attempt.validate.js';
import { getOrSetCache } from '../../utils/cache.js';

type QuizOption = {
    label: string;
    text: string;
    isCorrect: boolean;
};

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
    const cacheKey = `questions_${quizId}`;

    return getOrSetCache(
        cacheKey,

        async () => {

            const quiz = await Quiz.findById(quizId).populate('questions.questionId');
            if (!quiz) {
                throw new AppError(404, 'Quiz not found');
            }

            const questions = quiz.questions
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map(item => item.questionId as any)
                .filter(question => question?._id);

            const completedAttempt = userId
                ? await Result.exists({
                    user: userId,
                    quiz: quizId,
                    status: 'completed',
                    submittedAt: { $exists: true },
                })
                : null;

            return questions.map(question => ({
                _id: question._id,
                prompt: question.prompt,
                difficulty: question.difficulty,
                options: question.options.map((option: QuizOption) => ({
                    label: option.label,
                    text: option.text,
                    isCorrect: completedAttempt ? option.isCorrect : false,
                })),
            }));
        }, 60 * 60 * 6)
};

const submitQuiz = async (quizId: string, selectedOptions: SelectedOption, userId?: string) => {
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
                id: question._id.toString(),
                prompt: question.prompt,
                options: question.options.map((option: any): QuizOption => ({
                    label: option.label,
                    text: option.text,
                    isCorrect: option.isCorrect,
                })),
            };
        });

    const validQuestionIds = new Set(questions.map(question => question.id));
    for (const selectedOption of selectedOptions) {
        if (!validQuestionIds.has(selectedOption.questionId)) {
            throw new AppError(400, `Question ${selectedOption.questionId} does not belong to this quiz`);
        }
    }

    const selectedByQuestionId = new Map(
        selectedOptions.map(selectedOption => [selectedOption.questionId, selectedOption.label])
    );

    let correctCount = 0;
    const attempts = questions.map((question) => {
        const selectedLabel = selectedByQuestionId.get(question.id);
        const selectedOption = question.options.find((option: QuizOption) => option.label === selectedLabel);
        const correctOption = question.options.find((option: QuizOption) => option.isCorrect);
        const isCorrect = !!selectedOption?.isCorrect;

        if (isCorrect) {
            correctCount++;
        }

        return {
            question: question.prompt,
            selected: selectedOption?.text ?? null,
            correct: correctOption?.text ?? '',
            isCorrect,
        };
    });

    const totalQuestions = questions.length;
    const score = correctCount;
    const xpEarned = correctCount * 10;

    let saved = false;
    let elapsedSeconds = 0;

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
                answers: [],
                status: 'in-progress',
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
        attempt.answers = questions.map((question) => {
            const selectedLabel = selectedByQuestionId.get(question.id) ?? '';
            const selectedOption = question.options.find((option: QuizOption) => option.label === selectedLabel);

            return {
                questionId: question.id,
                selectedOptionLabel: selectedLabel,
                isCorrect: !!selectedOption?.isCorrect,
            };
        });
        attempt.status = 'completed';
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
