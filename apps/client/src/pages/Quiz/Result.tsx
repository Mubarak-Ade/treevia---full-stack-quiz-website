import Logo from '@/assets/logo.png';
import { useFetchQuestion, useStartQuiz } from '@/modules/quiz/controllers/quiz-api.controller';
import {
    AttemptAnswer,
    PublicQuestion,
    Result as ResultModel,
} from '@/modules/quiz/types/quiz.types';
import { Check, Grid2X2, RotateCcw, Trophy, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';

type ResultLocationState = {
    data?: ResultModel | { data?: ResultModel };
    quizTitle?: string;
    timeLimit?: number;
};

const joinButtonStyles =
    'inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-8 text-lg font-semibold transition-colors';

const getResultFromState = (state: ResultLocationState | null | undefined) => {
    if (!state?.data) return null;

    const payload = 'data' in state.data ? state.data.data : state.data;
    return payload && 'attempt' in payload ? payload : null;
};

const findCorrectOption = (question?: PublicQuestion) =>
    question?.options.find(option => option.isCorrect)?.text ?? '';

const findSelectedOption = (answer: AttemptAnswer) =>
    answer.selectedOptionLabel ?? answer.selectOptionLabel ?? 'No answer selected';

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ResultLocationState | null;
    const result = getResultFromState(state);

    if (!result) {
        return (
            <div className="min-h-screen bg-base px-5 py-16">
                <div className="mx-auto max-w-xl rounded-[2rem] border border-default bg-surface-alt px-6 py-10 text-center">
                    <p className="mb-5 text-lg text-primary">No quiz result available.</p>
                    <button
                        onClick={() => navigate('/quizzes')}
                        className="rounded-full bg-brand px-5 py-3 font-semibold text-on-brand"
                    >
                        Back to Categories
                    </button>
                </div>
            </div>
        );
    }

    const { attempt, accuracy } = result;
    const quizTitle = state?.quizTitle || 'this quiz';
    const retryTimeLimit = typeof state?.timeLimit === 'number' ? state.timeLimit : 60;
    const totalQuestions = attempt.answers.length;
    const correctAnswers = attempt.score;
    const incorrectAnswers = Math.max(totalQuestions - correctAnswers, 0);
    const score = Math.round(accuracy);
    const startQuiz = useStartQuiz(attempt.quiz);
    const { data: questions = [] } = useFetchQuestion(attempt.quiz);

    const questionMap = new Map(questions.map(question => [question._id, question]));

    const handleRetakeQuiz = () => {
        startQuiz.mutate(undefined, {
            onSuccess: () => {
                navigate(`/quizzes/${attempt.quiz}/questions`, {
                    state: {
                        timeLimit: retryTimeLimit,
                        quizTitle: state?.quizTitle,
                    },
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-base text-primary">
            <header className="border-b border-default">
                <div className="mx-auto flex  items-center justify-between px-6 py-5 md:px-10">
                    <Link to="/" className="flex items-center gap-4">
                        <img src={Logo} alt="Treevia" className="size-10 rounded-full" />
                        <span className="text-[2rem] font-bold leading-none text-primary">
                            Treevia
                        </span>
                    </Link>

                    <button
                        onClick={() => navigate('/quizzes')}
                        className="hidden items-center gap-3 rounded-full bg-band px-8 py-4 text-lg font-semibold text-primary md:inline-flex"
                    >
                        <Grid2X2 size={20} />
                        Back to Categories
                    </button>
                </div>
            </header>

            <main className="mx-auto flex max-w-4xl flex-col gap-10 px-5 py-10 md:px-8 md:py-12">
                <section className="rounded-4xl border border-default bg-[radial-gradient(circle_at_top,rgba(28,72,44,0.28),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))] bg-surface-alt px-6 py-10 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)] md:px-12 md:py-12">
                    <div className="mx-auto flex max-w-135 flex-col items-center text-center">
                        <div className="mb-10 flex size-26 items-center justify-center rounded-full bg-brand text-on-brand shadow-[0_0_35px_rgba(0,230,118,0.22)]">
                            <Trophy size={46} strokeWidth={2.2} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-primary md:text-5xl">
                            Tree-mendous Work!
                        </h1>
                        <p className="mt-4 text-lg text-secondary">
                            You`ve completed the `{quizTitle}` quiz.
                        </p>

                        <div className="mt-11 text-xl font-bold leading-none text-primary md:text-6xl">
                            {score}%
                        </div>
                        <div className="mt-5 rounded-full bg-band px-5 py-3 text-sm font-semibold text-primary">
                            {correctAnswers} out of {totalQuestions} Correct
                        </div>

                        <div className="mt-10 grid w-full max-w-120 gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-default bg-white/4 px-8 py-7">
                                <div className="text-3xl font-bold text-brand">
                                    {correctAnswers}
                                </div>
                                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-brand">
                                    <Check size={20} />
                                    <span>Correct</span>
                                </div>
                            </div>
                            <div className="rounded-[1.5rem] border border-default bg-white/4 px-8 py-7">
                                <div className="text-3xl font-bold text-red-400">
                                    {incorrectAnswers}
                                </div>
                                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-red-400">
                                    <X size={20} />
                                    <span>Incorrect</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex w-full max-w-[540px] flex-col gap-4 md:flex-row">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleRetakeQuiz}
                                className={`${joinButtonStyles} flex-1 bg-brand text-on-brand`}
                            >
                                <RotateCcw size={22} />
                                Retake Quiz
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/quizzes')}
                                className={`${joinButtonStyles} flex-1 bg-brand-subtle text-primary`}
                            >
                                <Grid2X2 size={22} />
                                Other Categories
                            </motion.button>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-3xl font-bold text-primary md:text-2xl">
                            Answer Breakdown
                        </h2>
                        <button
                            onClick={() =>
                                document
                                    .querySelector('.answer-breakdown-list')
                                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                            className="text-sm font-semibold text-brand"
                        >
                            View All Explanations
                        </button>
                    </div>

                    <ul className="answer-breakdown-list space-y-5">
                        {attempt.answers.map((answer, index) => {
                            const question = questionMap.get(answer.questionId) as
                                | PublicQuestion
                                | undefined;
                            const selectedOption = findSelectedOption(answer);
                            const correctOption = findCorrectOption(question);

                            return (
                                <li
                                    key={`${answer.questionId}-${index}`}
                                    className="rounded-[1.75rem] border border-default bg-surface-alt px-6 py-6 md:px-5"
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="pr-3 text-xl font-medium leading-tight text-primary">
                                                {index + 1}. {question?.prompt ?? answer.questionId}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 text-base text-secondary">
                                                <p>
                                                    Your Answer:{' '}
                                                    <span
                                                        className={`font-bold ${
                                                            answer.isCorrect
                                                                ? 'text-brand'
                                                                : 'text-red-400 line-through'
                                                        }`}
                                                    >
                                                        {selectedOption}
                                                    </span>
                                                </p>

                                                {!answer.isCorrect && correctOption && (
                                                    <p>
                                                        Correct Answer:{' '}
                                                        <span className="font-bold text-brand">
                                                            {correctOption}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            {!answer.isCorrect && (
                                                <div className="mt-6 rounded-full border border-default bg-white/5 px-4 py-4 md:px-5">
                                                    <p className="text-sm font-semibold text-primary">
                                                        Explanation:
                                                    </p>
                                                    <p className="mt-1 text-sm leading-8 text-secondary">
                                                        {question?.explanation ??
                                                            'Review the correct option and try this one again on your next run.'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className={`mt-1 flex size-11 shrink-0 items-center justify-center rounded-full ${
                                                answer.isCorrect
                                                    ? 'bg-brand/20 text-brand'
                                                    : 'bg-red-500/18 text-red-400'
                                            }`}
                                        >
                                            {answer.isCorrect ? (
                                                <Check size={22} />
                                            ) : (
                                                <X size={22} />
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Result;
