import { QuizFormData } from '@/schema/quiz.schema';
import {
    AdminQuestion,
    AdminQuestionOption,
    AdminQuiz,
    QuestionMutationPayload,
    QuizDifficulty,
    QuizMutationPayload,
} from '@/modules/admin/quiz/types/admin-quiz.types';

const optionLabels = ['A', 'B', 'C', 'D'] as const;

export const difficultyLabel = (difficulty: QuizDifficulty) =>
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

export const buildQuizPayload = (data: QuizFormData): QuizMutationPayload => ({
    title: data.title.trim(),
    category: data.category,
    difficulty: data.difficulty,
    timeLimitPerQuestion: data.timeLimitPerQuestion,
    xpReward: data.xpReward,
    isPublic: data.isPublic,
    shuffleQuestions: data.shuffleQuestions,
});

export const buildQuestionPayload = (
    question: QuizFormData['questions'][number],
    difficulty: QuizDifficulty
): QuestionMutationPayload => ({
    prompt: question.questionText.trim(),
    difficulty,
    options: optionLabels.map((label, index) => ({
        label,
        text: question.options[label].trim(),
        isCorrect: question.correctAnswer === index,
    })) as AdminQuestionOption[],
});

export const mapQuestionToForm = (question: AdminQuestion): QuizFormData['questions'][number] => {
    const options = {
        A: '',
        B: '',
        C: '',
        D: '',
    };

    let correctAnswer = 0;

    question.options.forEach((option, index) => {
        options[option.label] = option.text;
        if (option.isCorrect) {
            correctAnswer = index;
        }
    });

    return {
        id: question._id,
        questionText: question.prompt,
        correctAnswer,
        options,
    };
};

export const mapQuizToForm = (quiz: AdminQuiz): QuizFormData => ({
    title: quiz.title,
    category: quiz.category?._id ?? '',
    difficulty: quiz.difficulty,
    timeLimitPerQuestion: quiz.timeLimitPerQuestion ?? 30,
    xpReward: quiz.xpReward ?? 500,
    isPublic: quiz.isPublic ?? false,
    shuffleQuestions: quiz.shuffleQuestions ?? false,
    questions: quiz.questions?.map(mapQuestionToForm) ?? [],
});

export const defaultQuizFormValues: QuizFormData = {
    title: '',
    category: '',
    difficulty: 'easy',
    timeLimitPerQuestion: 30,
    xpReward: 500,
    isPublic: false,
    shuffleQuestions: false,
    questions: [
        {
            questionText: '',
            correctAnswer: 0,
            options: {
                A: '',
                B: '',
                C: '',
                D: '',
            },
        },
    ],
};
