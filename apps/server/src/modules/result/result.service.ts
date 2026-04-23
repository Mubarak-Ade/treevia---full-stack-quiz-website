import Result from '../../models/QuizResult.js';
import { AppError } from '../../utils/error-handler.js';

const getResult = async (userId: string) => {
    const results = await Result.find({ user: userId })
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

    return results.map((result:any) => ({
        ...result,
        quiz: result.quiz.title ,
        category: result.quiz.category.name,
    }));
};

const getSingleResult = async (userId: string, quizId: string) => {
    const result = await Result.findOne({ user: userId, quiz: quizId }).populate(
        'user',
        'username'
    );

    if (!result) {
        throw new AppError(404, 'Result not found');
    }

    return result;
};

export default { getResult, getSingleResult };
