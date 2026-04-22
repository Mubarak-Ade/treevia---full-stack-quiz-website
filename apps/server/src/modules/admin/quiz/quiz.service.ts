import { Types } from 'mongoose';
import Category from '../../../models/Category.js';
import Quiz from '../../../models/Quiz.js';
import { CreateQuizDTO, UpdateQuizDTO } from '../../../schema/quiz.shema.js';
import { AppError } from '../../../utils/error-handler.js';
import { QuizRepository } from './quiz.repository.js';

interface QuizQuery {
    search?: string;
    sortBy?: string;
    order?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
}

const categoryExist = async (categoryId: string) => {
    const id = toObjectId(categoryId);
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        throw new AppError(404, 'Please choose an existing category');
    }
    return id;
};

export function toObjectId(id: string, label = 'id'): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
        throw new AppError(400, `Invalid ${label}: "${id}"`);
    }
    return new Types.ObjectId(id);
}

const AdminQuizService = {
    async getAllQuiz(query: QuizQuery) {
        const { search, difficulty, page = 1, limit = 10 } = query;
        const filter: any = {};

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        if (difficulty) {
            filter.difficulty = { $regex: difficulty, $options: 'i' };
        }

        const quizzes = await QuizRepository.findAllForAdmin(filter, page, limit);
        const total = await QuizRepository.count(filter);

        return { quizzes, filter: { page, pages: Math.ceil(total / limit), limit, total } };
    },

    async createQuiz(quizData: CreateQuizDTO, userId: string) {
        const {
            category,
            coverImage,
            difficulty,
            isPublic,
            shuffleQuestions,
            timeLimitPerQuestion,
            title,
            xpReward,
        } = quizData;

        const categoryId = await categoryExist(category);

        const createdBy = toObjectId(userId);

        if (!createdBy) {
            throw new AppError(400, 'Invalid User');
        }

        const quiz = await QuizRepository.create({
            title,
            category: String(categoryId),
            difficulty: difficulty,
            isPublic: isPublic,
            createdBy: String(createdBy),
            shuffleQuestions: shuffleQuestions,
            coverImage: coverImage,
            status: 'draft',
            timeLimitPerQuestion: timeLimitPerQuestion,
            xpReward: xpReward,
        });
        return quiz;
    },

    async updateQuiz(quizId: string, body: UpdateQuizDTO, userId: string) {
        const {
            title,
            difficulty,
            category,
            timeLimitPerQuestion,
            shuffleQuestions,
            isPublic,
            xpReward,
            status,
        } = body ?? {};

        await this.findQuizAndCheckOwnerShip(quizId, userId);

        const categoryId = category && (await categoryExist(category as string));

        const update: any = {};
        if (title !== undefined) update.title = title;
        if (difficulty !== undefined) update.difficulty = difficulty;
        if (categoryId !== undefined) update.category = categoryId;
        if (timeLimitPerQuestion !== undefined) update.timeLimitPerQuestion = timeLimitPerQuestion;
        if (shuffleQuestions !== undefined) update.shuffleQuestions = shuffleQuestions;
        if (isPublic !== undefined) update.isPublic = isPublic;
        if (xpReward !== undefined) update.xpReward = xpReward;

        if (status) {
            throw new AppError(400, 'You cant update this field');
        }

        const updatedQuiz = await QuizRepository.update(quizId, update);

        if (!updatedQuiz) {
            throw new AppError(404, 'Quiz not found');
        }

        return updatedQuiz;
    },

    async publishQuiz(quizId: string, userId: string) {
        const quiz = await this.findQuizAndCheckOwnerShip(quizId, userId);

        if (quiz.status === 'published') {
            throw new AppError(400, 'Quiz is already published.');
        }
        if (quiz.status === 'archived') {
            throw new AppError(400, 'Archived quizzes cannot be published.');
        }
        if (!quiz.title?.trim()) {
            throw new AppError(400, 'A quiz must have a title before publishing.');
        }
        if (quiz.questions.length === 0) {
            throw new AppError(400, 'A quiz must have at least one question before publishing.');
        }

        quiz.status = 'published';
        await quiz.save(); // pre-save hook sets publishedAt

        return quiz;
    },

    async getSingleQuiz(id: string) {
        const quiz = await Quiz.findById(toObjectId(id, 'Quiz'))
            .populate('category', 'name')
            .populate('questions.questionId');

        if (!quiz) {
            throw new AppError(404, 'Quiz not Found');
        }

        const populatedQuestions = quiz.questions
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map(question => {
                const questionDoc = question.questionId as any;
                return {
                    ...questionDoc.toObject(),
                    order: question.order,
                };
            });

        return {
            ...quiz.toObject(),
            questions: populatedQuestions,
        };
    },

    async saveDraft(quizId: string, dto: UpdateQuizDTO, userId: string) {
        const quiz = await this.updateQuiz(quizId, dto, userId);

        return quiz;
    },

    async archiveQuiz(quizId: string, userId: string) {
        const quiz = await this.findQuizAndCheckOwnerShip(quizId, userId);

        if (quiz.status === 'archived') {
            throw new AppError(400, 'Quiz already arhive.');
        }

        quiz.status = 'archived';

        await quiz.save();
        return quiz;
    },

    async deleteQuiz(quizId: string, userId: string) {
        const quiz = await this.findQuizAndCheckOwnerShip(quizId, userId);
        if (quiz.status === 'published') {
            throw new AppError(
                400,
                'Published quizzes cannot be hard-deleted. Archive first or use archiveQuiz().'
            );
        }

        await quiz.deleteOne();
        return quiz;
    },

    async recoverQuiz(quizId: string, userId: string) {
        const quiz = await this.findQuizAndCheckOwnerShip(quizId, userId);
        if (quiz.status === 'draft' || quiz.status === 'published') {
            throw new AppError(400, 'Only Archived Quiz can be recovered');
        }
        quiz.status = 'draft';
        await quiz.save();
        return quiz;
    },

    async findQuizAndCheckOwnerShip(quizId: string, userId: string) {
        const quiz = await QuizRepository.findById(quizId);
        if (!quiz) {
            throw new AppError(404, 'Quiz Not Found');
        }

        if (!quiz.createdBy.equals(toObjectId(userId, 'user'))) {
            throw new AppError(403, 'Forbidden');
        }

        return quiz;
    },
};

export default AdminQuizService;
