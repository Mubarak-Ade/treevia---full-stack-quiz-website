import BreadCrumbs from '@/components/feature/BreadCrumbs';
import { Reveal, Stagger } from '@/components/feature/Motion';
import { QuizCard } from '@/components/feature/quizlist/QuizCard';
import { useFetchQuizzesByCategory } from '@/modules/quiz/controllers/quiz-api.controller';
import { Leaf, Sparkles, TimerReset } from 'lucide-react';
import { useParams } from 'react-router';
import { QuizLoader } from '@/components/feature/QuizLoader';
import type { CategoryWithQuizzes, Category, Quiz } from '@/modules/quiz/types/quiz.types';

export const QuizList = () => {
    const { slug } = useParams();
    const { data, isLoading } = useFetchQuizzesByCategory(slug as string);

    if (isLoading || !data) {
        return <QuizLoader loading />;
    }

    const { name, description, tags, quizzes } = data as CategoryWithQuizzes ?? { quizzes: [] };
    const totalQuestions =
        quizzes?.reduce((sum, quiz) => sum + (quiz.questionCount ?? quiz.stats?.questionCount ?? 0), 0) ?? 0;
    const averageTimeLimit = quizzes?.length
        ? Math.round(
              quizzes?.reduce(
                  (sum, quiz) =>
                      sum + (quiz?.stats?.estimatedDurationMinutes ?? quiz?.timeLimitPerQuestion ?? 0),
                  0
              ) / quizzes?.length
          )
        : 0;


    return (
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-band/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-band/40 blur-3xl" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-6 md:px-8 lg:px-10">
                <Reveal>
                    <BreadCrumbs />
                </Reveal>

                <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-surface px-6 py-8 shadow-[0_30px_80px_-55px_rgba(56,84,103,0.35)] backdrop-blur-md md:px-10 md:py-12">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-brand-subtle/20 blur-3xl" />
                    <div className="">
                        <img src="" alt="" />
                    </div>
                    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-full bg-[#e0f2e7] text-[#1b6b54]">
                                    <Leaf size={20} />
                                </span>
                                <span className="rounded-full border border-default bg-brand-subtle px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                                    Category Collection
                                </span>
                            </div>

                            <div className="max-w-3xl space-y-4">
                                <h1 className="text-4xl font-bold tracking-[-0.06em] text-brand md:text-6xl">
                                    {name} Quizzes
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-secondary md:text-lg">
                                    {description}
                                </p>
                            </div>

                            <ul className="flex flex-wrap gap-3">
                                {tags?.map((tag: Category['tags'][number], index: number) => (
                                    <li
                                        key={index}
                                        className="rounded-full border border-default bg-brand text-on-brand px-4 py-2 text-xs font-semibold capitalize text-[#385170] shadow-[0_10px_25px_-22px_rgba(56,81,112,0.8)]"
                                    >
                                        {typeof tag === 'string' ? tag : tag.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="rounded-4xl border border-default bg-surface-alt p-5 shadow-[0_22px_40px_-30px_rgba(47,74,58,0.4)]">
                                <div className="flex items-center gap-3 text-primary">
                                    <Sparkles size={18} />
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                        Quiz Set
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold text-primary tracking-[-0.05em] ">
                                    {quizzes?.length}
                                </p>
                                <p className="mt-1 text-sm text-secondary">
                                    Fresh challenges in this category
                                </p>
                            </div>

                            <div className="rounded-4xl border border-default bg-surface-alt p-5 shadow-[0_22px_40px_-30px_rgba(47,74,58,0.4)]">
                                <div className="flex items-center gap-3 text-primary">
                                    <Leaf size={18} />
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                        Questions
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-secondary dark:text-white">
                                    {totalQuestions}
                                </p>
                                <p className="mt-1 text-sm text-secondary">
                                    Curated prompts waiting to be explored
                                </p>
                            </div>

                            <div className="rounded-4xl border border-default bg-surface-alt p-5 shadow-[0_22px_40px_-30px_rgba(47,74,58,0.4)]">
                                <div className="flex items-center gap-3 text-primary">
                                    <TimerReset size={18} />
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                                        Pace
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl text-primary font-bold tracking-[-0.05em]">
                                    {averageTimeLimit} min
                                </p>
                                <p className="mt-1 text-sm text-secondary">
                                    Average timer per round
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Stagger className="grid grid-cols-1 place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3 md:p-20">
                    {quizzes?.map((q: Quiz) => (
                        <QuizCard
                            updatedAt={q.updatedAt}
                            _id={q._id}
                            key={q._id}
                            questionCount={q.questionCount}
                            title={q.title}
                            difficulty={q.difficulty}
                            timeLimitPerQuestion={q.timeLimitPerQuestion}
                        />
                    ))}
                </Stagger>
            </div>
        </div>
    );
};
