import Attempt from './attempt.model.js';
import Question from '../quiz/question.model.js';
import UserStats from '../user/user-stats.model.js';
import { AppError } from '../../utils/error-handler.js';
import { QuizRepository } from '../admin/quiz/quiz.repository.js';
import { SelectedOption } from './attempt.validate.js';

const AttemptService = {
    async getAttempt(userId: string) {
        const results = await Attempt.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('quiz', 'title category')
            .populate({
                path: 'quiz',
                populate: {
                    path: 'category',
                    select: 'name',
                },
            })
            .lean();

        return results.map((result: any) => ({
            ...result,
            quiz: result.quiz.title,
            category: result.quiz.category.name,
        }));
    },

    async getSingleAttempt(userId: string, quizId: string) {
        const result = await Attempt.findOne({ user: userId, quiz: quizId }).populate(
            'user',
            'username'
        );

        if (!result) {
            throw new AppError(404, 'Result not found');
        }

        return result;
    },

    async startQuiz(quizId: string, userId?: string) {
        const quiz = await QuizRepository.findById(quizId).lean();
        if (!quiz) {
            throw new AppError(404, 'Quiz Not Found');
        }

        if (!userId) {
            return {
                quiz: quizId,
                startedAt: new Date(),
                status: 'guest',
                saved: false,
            };
        }

        const attempt = await Attempt.findOneAndUpdate(
            {
                quiz: quizId,
                user: userId,
                status: 'in-progress',
                submittedAt: { $exists: false },
            },
            {
                $setOnInsert: {
                    quiz: quizId,
                    user: userId,
                    startedAt: new Date(),
                    status: 'in-progress',
                },
            },
            { new: true, upsert: true, runValidators: true }
        );

        return attempt;
    },

    async submitQuiz(quizId: string, selectedAnswers: SelectedOption, userId?: string) {
        // validate quiz data

        if (!quizId || !Array.isArray(selectedAnswers)) {
            throw new AppError(400, 'invalid input');
        }

        // find the quiz and the question

        let correctCount = 0;

        const quiz = await QuizRepository.findById(quizId).lean();

        if (!quiz) {
            throw new AppError(404, 'Quiz Not Found');
        }

        const questionIds = quiz.questions.map(q => q.questionId.toString());

        for (const selected of selectedAnswers) {
            if (!questionIds.includes(selected.questionId)) {
                throw new AppError(400, `id: ${selected.questionId} does not exist in quiz`);
            }
        }

        const questions = await Question.find({ _id: { $in: questionIds } }).lean();

        const answerMap = new Map(selectedAnswers.map(a => [a.questionId, a.label]));

        const attempts = questions.map(question => {
            const selectedLabel = answerMap.get(question._id.toString()) ?? '';

            const matched = question.options.find(opt => opt.label === selectedLabel);
            const correctOption = question.options.find(opt => opt.isCorrect);
            if (matched?.isCorrect) correctCount++;

            return {
                questionId: question._id,
                selectedOptionLabel: selectedLabel,
                isCorrect: matched?.isCorrect ?? false,
                correctOptionText: correctOption?.text ?? '',
            };
        });

        const totalQuestion = quiz.questions.length ?? 0;

        const accuracy = totalQuestion ? Math.round((correctCount / totalQuestion) * 100) : 0;

        if (!userId) {
            const now = new Date();

            return {
                attempt: {
                    quiz: quizId,
                    user: 'guest',
                    score: correctCount,
                    answers: attempts,
                    xpEarned: 0,
                    status: 'completed',
                    startedAt: now,
                    submittedAt: now,
                    timeTaken: 0,
                    createdAt: now,
                    updatedAt: now,
                },
                accuracy,
                stats: null,
                saved: false,
            };
        }

        let elapsedSeconds = 0;

        // save quiz attempts

        let attempt = await Attempt.findOne({
            user: userId,
            quiz: quizId,
            status: 'in-progress',
            submittedAt: { $exists: false },
        }).sort({ startedAt: -1, createdAt: -1 });

        if (!attempt) {
            throw new AppError(409, 'This quiz attempt is no longer active. Please restart the quiz.');
        }


        const attemptStartedAt = attempt.startedAt ?? attempt.createdAt ?? new Date();
        if (!attempt.startedAt) {
            attempt.startedAt = attemptStartedAt;
        }

        elapsedSeconds = (Date.now() - attemptStartedAt.getTime()) / 1000;

        attempt.score = correctCount;
        attempt.answers = attempts.map(({ correctOptionText, ...answer }) => answer);
        attempt.xpEarned = quiz.xpReward;
        attempt.submittedAt = new Date();
        attempt.timeTaken = Math.floor(elapsedSeconds);
        attempt.status = 'completed';
        await attempt.save();

        const BASE_XP = 10;
        const ACCURACY_BONUS = accuracy >= 80 ? 20 : 0;
        // const STREAK_BONUS =

        const xpEarned = attempt.xpEarned + correctCount * BASE_XP + ACCURACY_BONUS;

        const stats = await UserStats.findOneAndUpdate(
            { user: userId },
            {
                $inc: {
                    quizzesTaken: 1,
                    totalCorrect: correctCount,
                    totalFailed: totalQuestion - correctCount,
                    totalXp: xpEarned,
                },

                $set: {
                    lastQuizDate: attempt.createdAt,
                },
                $max: {
                    highestScore: correctCount,
                },
            },
            { new: true, runValidators: true, upsert: true }
        );

        return { attempt, accuracy, stats };
    },
};

export default AttemptService;
