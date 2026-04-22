import BreadCrumbs from '@/components/feature/BreadCrumbs';
import { Classification } from '@/components/feature/create_quiz/Classification';
import { GeneralInfo } from '@/components/feature/create_quiz/GeneralInfo';
import { Header } from '@/components/feature/create_quiz/Header';
import { QuestionBuilder } from '@/components/feature/create_quiz/QuestionBuilder';
import { QuizSetting } from '@/components/feature/create_quiz/QuizSetting';
import { QuizLoader } from '@/components/feature/QuizLoader';
import { useNotification } from '@/context/NotificationProvider';
import {
    useAddQuestionToQuiz,
    useCreateQuestion,
    useCreateQuiz,
    useFetchQuiz,
    usePublishQuiz,
    useRemoveQuestionFromQuiz,
    useUpdateQuestion,
    useUpdateQuiz,
} from '@/modules/admin/quiz/controllers/admin-quiz.controller';
import { useFetchCategories } from '@/modules/quiz/controllers/quiz-api.controller';
import { QUIZ_DIFFICULTIES, QuizFormData, QuizSchema } from '@/schema/quiz.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
    buildQuestionPayload,
    defaultQuizFormValues,
    mapQuizToForm,
} from '@/components/feature/admin/quiz/quiz-form.utils';
import {
    getCompleteQuestions,
    getPartialQuizPayload,
    mergeDraftWithDefaults,
    QuizDraftFormData,
} from '@/components/feature/admin/quiz/quiz-draft.utils';

export const CreateQuiz = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get('quizId') ?? undefined;
    const isEditing = Boolean(quizId);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [submitIntent, setSubmitIntent] = useState<'draft' | 'published'>('draft');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'local' | 'error'>(
        'idle'
    );
    const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
    const existingQuestionIdsRef = useRef<string[]>([]);
    const hydratedRef = useRef(false);
    const skipAutosaveRef = useRef(true);
    const autosaveTimerRef = useRef<number | null>(null);
    const currentQuizIdRef = useRef<string | undefined>(quizId);

    const methods = useForm<QuizFormData>({
        resolver: zodResolver(QuizSchema),
        defaultValues: defaultQuizFormValues,
    });
    const watchedValues = useWatch({ control: methods.control });

    const { data: categoryData, isLoading: isCategoryLoading } = useFetchCategories();
    const { data: quizResponse, isLoading: isQuizLoading } = useFetchQuiz(quizId);
    const createQuizMutation = useCreateQuiz();
    const updateQuizMutation = useUpdateQuiz();
    const publishQuizMutation = usePublishQuiz();
    const createQuestionMutation = useCreateQuestion();
    const updateQuestionMutation = useUpdateQuestion();
    const addQuestionToQuizMutation = useAddQuestionToQuiz();
    const removeQuestionFromQuizMutation = useRemoveQuestionFromQuiz();

    const getDraftStorageKey = (targetQuizId?: string) => `treevia-quiz-draft:${targetQuizId ?? 'new'}`;
    const parseStoredDraft = (value: string | null): QuizDraftFormData | null => {
        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value) as QuizDraftFormData;
        } catch {
            return null;
        }
    };

    const persistLocalDraft = (data: QuizDraftFormData) => {
        localStorage.setItem(getDraftStorageKey(currentQuizIdRef.current), JSON.stringify(data));
        setSaveStatus('local');
        setLastSavedAt(new Date().toLocaleTimeString());
    };

    const removeStoredDraft = (targetQuizId?: string) => {
        localStorage.removeItem(getDraftStorageKey(targetQuizId));
    };

    const resetToServerState = () => {
        if (!quizResponse?.data) {
            methods.reset(defaultQuizFormValues);
            existingQuestionIdsRef.current = [];
            return;
        }

        const serverDraft = mapQuizToForm(quizResponse.data);
        methods.reset(serverDraft);
        existingQuestionIdsRef.current =
            quizResponse.data.questions
                ?.map(question => question._id)
                .filter((questionId): questionId is string => Boolean(questionId)) ?? [];
    };

    const syncQuestions = async (savedQuizId: string, data: QuizDraftFormData) => {
        const retainedQuestionIds = new Set<string>();
        const completeQuestions = getCompleteQuestions(data);

        for (const question of data.questions ?? []) {
            if (question.id) {
                retainedQuestionIds.add(question.id);
            }
        }

        for (const question of completeQuestions) {
            const payload = buildQuestionPayload(question, data.difficulty as QuizFormData['difficulty']);

            if (question.id) {
                retainedQuestionIds.add(question.id);
                await updateQuestionMutation.mutateAsync({ id: question.id, data: payload });
                continue;
            }

            const createdQuestion = await createQuestionMutation.mutateAsync(payload);
            const createdQuestionId = createdQuestion.data._id;
            retainedQuestionIds.add(createdQuestionId);

            question.id = createdQuestionId;

            await addQuestionToQuizMutation.mutateAsync({
                quizId: savedQuizId,
                questionId: createdQuestionId,
            });
        }

        const removedQuestionIds = existingQuestionIdsRef.current.filter(
            existingId => !retainedQuestionIds.has(existingId)
        );

        for (const questionId of removedQuestionIds) {
            await removeQuestionFromQuizMutation.mutateAsync({
                quizId: savedQuizId,
                questionId,
            });
        }

        existingQuestionIdsRef.current = Array.from(retainedQuestionIds);
    };

    const syncDraft = async (
        data: QuizDraftFormData,
        mode: 'autosave' | 'manual' | 'publish' = 'autosave'
    ) => {
        const partialQuizPayload = getPartialQuizPayload(data);

        persistLocalDraft(data);

        if (!partialQuizPayload) {
            return { savedToServer: false, quizId: currentQuizIdRef.current };
        }

        try {
            if (mode !== 'autosave') {
                setSaveStatus('saving');
            }

            const savedQuiz =
                currentQuizIdRef.current
                    ? await updateQuizMutation.mutateAsync({
                          id: currentQuizIdRef.current,
                          data: partialQuizPayload,
                      })
                    : await createQuizMutation.mutateAsync(partialQuizPayload);

            const savedQuizId = savedQuiz.data._id;
            const previousDraftKey = getDraftStorageKey(currentQuizIdRef.current);

            currentQuizIdRef.current = savedQuizId;
            await syncQuestions(savedQuizId, data);

            if (previousDraftKey !== getDraftStorageKey(savedQuizId)) {
                const savedDraft = localStorage.getItem(previousDraftKey);
                if (savedDraft) {
                    localStorage.setItem(getDraftStorageKey(savedQuizId), savedDraft);
                    localStorage.removeItem(previousDraftKey);
                }
            }

            if (savedQuizId !== quizId) {
                navigate(`/admin/quizzes/create?quizId=${savedQuizId}`, { replace: true });
            }

            setSaveStatus('saved');
            setLastSavedAt(new Date().toLocaleTimeString());

            return { savedToServer: true, quizId: savedQuizId };
        } catch (error) {
            setSaveStatus('error');
            if (mode !== 'autosave') {
                throw error;
            }
            return { savedToServer: false, quizId: currentQuizIdRef.current };
        }
    };

    useEffect(() => {
        currentQuizIdRef.current = quizId;
    }, [quizId]);

    useEffect(() => {
        if (!isEditing) {
            const localDraft = parseStoredDraft(localStorage.getItem(getDraftStorageKey()));
            if (localDraft) {
                methods.reset(mergeDraftWithDefaults(defaultQuizFormValues, localDraft));
            }
            hydratedRef.current = true;
            skipAutosaveRef.current = true;
            return;
        }

        if (!quizResponse?.data) {
            return;
        }

        const serverDraft = mapQuizToForm(quizResponse.data);
        const localDraft = parseStoredDraft(localStorage.getItem(getDraftStorageKey(quizResponse.data._id)));
        const mergedDraft = localDraft
            ? mergeDraftWithDefaults(serverDraft, localDraft)
            : serverDraft;

        methods.reset(mergedDraft);
        existingQuestionIdsRef.current =
            quizResponse.data.questions
                ?.map(question => question._id)
                .filter((questionId): questionId is string => Boolean(questionId)) ?? [];
        hydratedRef.current = true;
        skipAutosaveRef.current = true;
    }, [isEditing, methods, quizResponse]);

    const isSubmitting =
        createQuizMutation.isPending ||
        updateQuizMutation.isPending ||
        publishQuizMutation.isPending ||
        createQuestionMutation.isPending ||
        updateQuestionMutation.isPending ||
        addQuestionToQuizMutation.isPending ||
        removeQuestionFromQuizMutation.isPending;

    useEffect(() => {
        if (!hydratedRef.current || !watchedValues) {
            return;
        }

        if (skipAutosaveRef.current) {
            skipAutosaveRef.current = false;
            return;
        }

        if (autosaveTimerRef.current) {
            window.clearTimeout(autosaveTimerRef.current);
        }

        autosaveTimerRef.current = window.setTimeout(() => {
            void syncDraft(watchedValues, 'autosave');
        }, 5000);

        return () => {
            if (autosaveTimerRef.current) {
                window.clearTimeout(autosaveTimerRef.current);
            }
        };
    }, [watchedValues]);

    const onSubmit: SubmitHandler<QuizFormData> = async data => {
        if (submitIntent === 'published' && data.questions.length === 0) {
            showNotification('error', 'Add at least one question before publishing.');
            return;
        }

        try {
            setSaveStatus('saving');
            const result = await syncDraft(data, submitIntent === 'published' ? 'publish' : 'manual');

            if (!result.savedToServer || !result.quizId) {
                showNotification(
                    'error',
                    'Fill in the quiz title, category, difficulty, time limit, and XP reward before saving to the server.'
                );
                return;
            }

            if (submitIntent === 'published') {
                await publishQuizMutation.mutateAsync(result.quizId);
                removeStoredDraft(result.quizId);
                removeStoredDraft();
            }

            showNotification(
                'success',
                submitIntent === 'published'
                    ? 'Quiz saved and published successfully.'
                    : result.savedToServer
                      ? 'Quiz draft saved successfully.'
                      : 'Draft saved locally.'
            );
            if (submitIntent === 'published') {
                navigate('/admin/quizzes');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to save quiz.';
            showNotification('error', message);
        }
    };

    const submitQuiz = methods.handleSubmit(onSubmit);
    const saveDraft = async () => {
        try {
            setSaveStatus('saving');
            const result = await syncDraft(methods.getValues(), 'manual');

            showNotification(
                'success',
                result.savedToServer
                    ? 'Quiz draft saved successfully.'
                    : 'Draft saved locally. Complete the quiz details to sync it to the server.'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to save draft.';
            showNotification('error', message);
        }
    };

    const discardDraft = () => {
        if (autosaveTimerRef.current) {
            window.clearTimeout(autosaveTimerRef.current);
        }

        removeStoredDraft(currentQuizIdRef.current);
        removeStoredDraft();
        skipAutosaveRef.current = true;
        setSaveStatus('idle');
        setLastSavedAt(null);

        if (isEditing) {
            resetToServerState();
            showNotification('success', 'Draft changes discarded.');
            return;
        }

        methods.reset(defaultQuizFormValues);
        existingQuestionIdsRef.current = [];
        showNotification('success', 'Draft cleared.');
    };

    if (isCategoryLoading || (isEditing && isQuizLoading)) {
        return <QuizLoader loading />;
    }

    return (
        <div className="min-h-screen">
            <Header
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                saveStatus={saveStatus}
                lastSavedAt={lastSavedAt}
                handleCancel={() => navigate('/admin/quizzes')}
                handleDiscardDraft={discardDraft}
                handleSaveDraft={() => {
                    void saveDraft();
                }}
                handlePublish={() => {
                    setSubmitIntent('published');
                    void submitQuiz();
                }}
            />

            <BreadCrumbs />

            <FormProvider {...methods}>
                <form id="create_quiz" className="p-6">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,2fr)_360px]">
                        <div className="space-y-5">
                            <GeneralInfo />
                            <Classification
                                category={categoryData ?? []}
                                difficulty={QUIZ_DIFFICULTIES}
                            />
                            <QuestionBuilder />
                        </div>

                        <QuizSetting />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
