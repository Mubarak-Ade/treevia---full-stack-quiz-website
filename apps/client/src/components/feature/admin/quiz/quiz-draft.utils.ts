import { QuizFormData } from '@/schema/quiz.schema';
import { QuizMutationPayload } from '@/modules/admin/quiz/types/admin-quiz.types';

type PartialQuestion = Partial<QuizFormData['questions'][number]>;

export type QuizDraftFormData = Partial<Omit<QuizFormData, 'questions'>> & {
    questions?: PartialQuestion[];
};

const isNonEmptyString = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0;

const isValidQuestion = (question: PartialQuestion): question is QuizFormData['questions'][number] =>
    typeof question?.correctAnswer === 'number' &&
    isNonEmptyString(question.questionText) &&
    isNonEmptyString(question.options?.A) &&
    isNonEmptyString(question.options?.B) &&
    isNonEmptyString(question.options?.C) &&
    isNonEmptyString(question.options?.D);

export const mergeDraftWithDefaults = (
    defaults: QuizFormData,
    draft?: QuizDraftFormData | null
): QuizFormData => ({
    ...defaults,
    ...draft,
    questions:
        draft?.questions?.length
            ? draft.questions.map(question => ({
                  id: question.id,
                  questionText: question.questionText ?? '',
                  correctAnswer:
                      typeof question.correctAnswer === 'number' ? question.correctAnswer : 0,
                  options: {
                      A: question.options?.A ?? '',
                      B: question.options?.B ?? '',
                      C: question.options?.C ?? '',
                      D: question.options?.D ?? '',
                  },
              }))
            : defaults.questions,
});

export const getPartialQuizPayload = (
    data: QuizDraftFormData
): QuizMutationPayload | null => {
    if (
        !isNonEmptyString(data.title) ||
        !isNonEmptyString(data.category) ||
        !isNonEmptyString(data.difficulty) ||
        typeof data.timeLimitPerQuestion !== 'number' ||
        typeof data.xpReward !== 'number'
    ) {
        return null;
    }

    return {
        title: data.title.trim(),
        category: data.category,
        difficulty: data.difficulty,
        timeLimitPerQuestion: data.timeLimitPerQuestion,
        xpReward: data.xpReward,
        isPublic: Boolean(data.isPublic),
        shuffleQuestions: Boolean(data.shuffleQuestions),
    };
};

export const getCompleteQuestions = (data: QuizDraftFormData) =>
    (data.questions ?? []).filter(isValidQuestion);
