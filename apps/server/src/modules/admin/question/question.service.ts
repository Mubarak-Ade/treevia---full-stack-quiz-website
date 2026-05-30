import Question from '../../quiz/question.model.js';
import { IQuiz } from '../../quiz/quiz.model.js';
import { AppError } from '../../../utils/error-handler.js';
import AdminQuizService, { invalidateQuizCaches, toObjectId } from '../quiz/quiz.service.js';
import { AddQuestionDTO, UpdateQuestionDTO } from './question.validate.js';

export const AdminQuestionService = {
    async getQuestions() {
        const question = await Question.find({}).lean();
        return question;
    },

    async getQuestion(questionId: string) {
        const question = await Question.findById(questionId)
        if(!question) {
            throw new AppError(404, "Question Not Found")
        }
        return question
    },

    async createQuestion(dto: AddQuestionDTO) {
        const correctCount = dto.options.filter(q => q.isCorrect).length;
        if (dto.options.length < 2 || dto.options.length > 4) {
            throw new AppError(400, 'A question must have between 2 and 4 answer options.');
        }
        if (correctCount !== 1) {
            throw new AppError(400, 'A question must have exactly one correct answer.');
        }
        const difficulty = dto.difficulty ?? 'easy';
        const questions = await Question.create({ ...dto, difficulty });
        return questions;
    },
    async addQuestionToQuiz(quizId: string, questionId: string, userId: string) {
        const quiz = await AdminQuizService.findQuizAndCheckOwnerShip(quizId, userId);

        if (quiz.status === 'archived') {
            throw new AppError(400, 'Cant add question to archived quiz');
        }

        const questionExists = await Question.exists({ _id: questionId });
        if (!questionExists) {
            throw new AppError(404, 'Please add an existing question');
        }

        const alreadyExists = quiz.questions.some(
            q => q.questionId && q.questionId.toString() === questionId
        );

        if (alreadyExists) {
            throw new AppError(400, 'Question already exist in quiz');
        }

        const maxOrder = quiz.questions.length
            ? Math.max(...quiz.questions.map(q => q.order ?? 0))
            : 0;

        quiz.questions.push({ questionId: toObjectId(questionId), order: maxOrder + 1 });

        this._normaliseOrder(quiz);

        await quiz.save();
        await invalidateQuizCaches(quizId);

        return quiz;
    },
    async updateQuestion(dto: UpdateQuestionDTO, questionId: string) {
        const update: any = {};

        if (dto.prompt !== undefined) update.prompt = dto.prompt;
        if (dto.difficulty !== undefined) update.difficulty = dto.difficulty;

        if (dto.options !== undefined) {
            const correctCount = dto.options.filter(o => o.isCorrect).length;
            if (dto.options.length < 2 || dto.options.length > 4) {
                throw new AppError(400, 'A question must have between 2 and 4 answer options.');
            }
            if (correctCount !== 1) {
                throw new AppError(400, 'A question must have exactly one correct answer.');
            }
            update.options = dto.options as any;
        }

        const question = await Question.findByIdAndUpdate(questionId, update, { new: true });
        await invalidateQuizCaches();
        return question;
    },

    async removeQuestion(quizId: string, questionId: string, userId: string) {
        const quiz = await AdminQuizService.findQuizAndCheckOwnerShip(quizId, userId);

        if (quiz.status === 'archived') {
            throw new AppError(400, 'Cant add question to archived quiz');
        }

        const questionExists = await Question.exists({ _id: questionId });
        if (!questionExists) {
            throw new AppError(404, 'Please add an existing question');
        }

        const questionIndex = quiz.questions.findIndex(
            q => q.questionId && q.questionId.toString() === questionId
        );

        if (questionIndex) {
            throw new AppError(400, 'Question does not exist in quiz');
        }

        quiz.questions.splice(questionIndex, 1);

        console.log(questionIndex);

        this._normaliseOrder(quiz);

        await quiz.save();
        await invalidateQuizCaches(quizId);

        return quiz;
    },
    _normaliseOrder(quiz: IQuiz): void {
        const sorted = [...quiz.questions].sort((a, b) => a.order - b.order);
        sorted.forEach((q, i) => {
            q.order = i + 1;
        });
    },
};
