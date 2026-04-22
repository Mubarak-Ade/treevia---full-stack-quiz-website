import Quiz from '../../../models/Quiz.js';
import { CreateQuizDTO, UpdateQuizDTO } from '../../../schema/quiz.shema.js';
import { toObjectId } from './quiz.service.js';

export const QuizRepository = {
    create: (payload: CreateQuizDTO) => Quiz.create(payload),
    findAllForAdmin: (filter: any, page: number, limit: number) =>
        Quiz.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate('category', 'name')
            .lean(),
    findAll: (filter: any) => Quiz.find(filter).sort({createdAt: -1}),
    count: (filter: any) => Quiz.countDocuments(filter),
    findById: (quizId: string) => Quiz.findById(toObjectId(quizId, 'quizId')),
    update: (quizId: string, payload: UpdateQuizDTO) =>
        Quiz.findByIdAndUpdate(toObjectId(quizId, 'quizId'), payload, {
            new: true,
            runValidators: true,
        }),
};
