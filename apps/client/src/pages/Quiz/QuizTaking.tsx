import { useCallback, useEffect, useMemo, useState } from 'react';

import { QuizLoader } from '@/components/feature/QuizLoader';
import { QuizHeader } from '@/components/feature/quiztaking/Header';
import { ProgressBar } from '@/components/feature/quiztaking/ProgressBar';
import { QuizTakingCard } from '@/components/feature/quiztaking/QuizTakingCard';
import { useNotification } from '@/context/NotificationProvider';
import { useFetchQuestion, useSubmitAnswers } from '@/modules/quiz/controllers/quiz-api.controller';
import { SelectedAnswer } from '@/modules/quiz/types/quiz.types';
import { X } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router';

export const QuizTaking = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <p>No quiz id provided</p>;
    }
    const navigate = useNavigate();
    const location = useLocation();
    const { showNotification } = useNotification();
    const submit = useSubmitAnswers(id);
    const { data, isLoading } = useFetchQuestion(id);
    const quizState =
        typeof location.state === 'object' && location.state !== null ? location.state : null;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectedAnswer>>({});
    const initialTimeLimit = useMemo(
        () =>
            typeof location.state === 'number' && Number.isFinite(location.state)
                ? location.state
                : typeof quizState?.timeLimit === 'number' && Number.isFinite(quizState.timeLimit)
                  ? quizState.timeLimit
                : 60,
        [location.state, quizState]
    );
    const quizTitle = typeof quizState?.quizTitle === 'string' ? quizState.quizTitle : '';
    const [timeLeft, setTimeLeft] = useState(initialTimeLimit);
    const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
    const questions = data ?? [];
    const hasQuestions = questions.length > 0;
    const currentQuestion = hasQuestions ? questions[currentIndex] : undefined;
    const questionText = currentQuestion?.prompt ?? '';
    const options = currentQuestion?.options ?? [];
    const currentQuestionId = currentQuestion?._id ?? '';

    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = hasQuestions ? currentIndex === questions.length - 1 : false;

    const selectedAnswer = currentQuestionId ? selectedOptions[currentQuestionId] : undefined;

    const hasAnsweredQuestion = !!selectedAnswer;
    const NextIndex = hasQuestions ? currentIndex < questions.length - 1 : false;
    const PrevIndex = currentIndex > 0;
    const allIsAnswered =
        hasQuestions && questions.every(question => question._id && selectedOptions[question._id]);

    useEffect(() => {
        if (!hasQuestions) return;
        if (currentIndex >= questions.length) {
            setCurrentIndex(questions.length - 1);
        }
    }, [currentIndex, hasQuestions, questions.length]);

    const handleSendResults = useCallback(() => {
        if (!hasQuestions || submit.isPending) return;
        submit.mutate(
            questions
                .map(question => question._id && selectedOptions[question._id])
                .filter((answer): answer is SelectedAnswer => !!answer),
            {
                onSuccess: responseData => {
                    navigate('/result', {
                        state: {
                            data: responseData,
                            quizTitle,
                            timeLimit: initialTimeLimit,
                        },
                    });
                },
                onError: error => {
                    setHasAutoSubmitted(false);
                    showNotification('error', error.message);
                },
            }
        );
    }, [
        id,
        hasQuestions,
        navigate,
        options,
        questionText,
        selectedOptions,
        showNotification,
        submit,
        questions,
    ]);

    useEffect(() => {
        if (!hasQuestions || submit.isPending || hasAutoSubmitted) return;
        if (timeLeft <= 0) {
            setHasAutoSubmitted(true);
            handleSendResults();
            return;
        }

        const timer = window.setTimeout(() => {
            setTimeLeft((prev: number) => Math.max(prev - 1, 0));
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [hasQuestions, handleSendResults, hasAutoSubmitted, submit.isPending, timeLeft]);

    useEffect(() => {
        if (
            typeof location.state !== 'number' &&
            typeof quizState?.timeLimit !== 'number'
        ) {
            showNotification(
                'warning',
                'Timer value was missing. Quiz started with a 60-second timer.'
            );
        }
    }, [location.state, quizState, showNotification]);

    const handleNextQuestion = () => {
        if (NextIndex) {
            setCurrentIndex(next => next + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (PrevIndex) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSelectedOptions = (answer: SelectedAnswer) => {
        setSelectedOptions(currentSelections => ({
            ...currentSelections,
            [answer.questionId]: answer,
        }));
    };

    const handleNext = () => {
        if (!hasAnsweredQuestion) return;
        if (!isLastQuestion) handleNextQuestion();
    };

    const handlePrev = () => {
        if (isFirstQuestion) return;
        handlePrevQuestion();
    };

    const progress = hasQuestions ? ((currentIndex + 1) / questions.length) * 100 : 0;

    if (isLoading || submit.isPending) {
        return <QuizLoader loading />;
    }

    if (!hasQuestions) {
        return (
            <div className="p-10 text-center text-primary">
                <p className="text-xl font-semibold">This quiz has no questions yet.</p>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-4 rounded-full bg-brand px-5 py-3 font-semibold text-on-brand"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-base">
            <QuizHeader
                label="Quit Quiz"
                icon={<X size={20} />}
                timeLimit={timeLeft}
                onClick={() => navigate(-1)}
            />

            <div className="p-4 max-w-2xl flex flex-col items-center justify-center w-full m-auto">
                <div className="w-full">
                    <div className="flex text-secondary text-xs md:text-sm justify-between items-center mb-2">
                        <h2 className="">
                            Question {currentIndex + 1} of {questions.length}
                        </h2>
                        <h4>{Math.floor(progress)}% Completed</h4>
                    </div>
                    <ProgressBar progress={progress} />
                </div>
                <QuizTakingCard
                    allIsAnswered={allIsAnswered}
                    handleSelectedOptions={handleSelectedOptions}
                    handleSendResults={handleSendResults}
                    hasAnsweredQuestion={hasAnsweredQuestion}
                    isFirstQuestion={isFirstQuestion}
                    isLastQuestion={isLastQuestion}
                    questionId={currentQuestionId}
                    options={options}
                    questionText={questionText}
                    selectedLabel={selectedAnswer?.label}
                    key={currentQuestionId || currentIndex}
                    currentIndex={currentIndex}
                    goToPrevQuestion={handlePrev}
                    goToNextQuestion={handleNext}
                />
            </div>
        </div>
    );
};
