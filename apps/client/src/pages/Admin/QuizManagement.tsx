import { FilterBar } from '@/components/feature/admin/quiz/FilterBar';
import { QuizActions } from '@/components/feature/admin/quiz/QuizActions';
import { QuizCard } from '@/components/feature/admin/quiz/QuizCard';
import { QuizLoader } from '@/components/feature/QuizLoader';
import { DashboardHeader } from '@/components/feature/share/DashboardHeader';
import { Button } from '@/components/ui/button';
import { useFetchQuizzes } from '@/modules/admin/quiz/controllers/admin-quiz.controller';
import { AdminQuiz } from '@/modules/admin/quiz/types/admin-quiz.types';
import { difficultyLabel } from '@/components/feature/admin/quiz/quiz-form.utils';
import { getColorFromString } from '@/utils/colorFormat';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { ReusableTable as QuizTable } from '../../components/feature/admin/quiz/QuizTable';

const columns: ColumnDef<AdminQuiz>[] = [
    {
        header: 'QUIZ TITLE',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    {row.original.coverImage ? (
                        <img
                            src={row.original.coverImage}
                            alt={row.original.title}
                            className="w-10 h-10 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                            {row.original.title?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="font-medium">{row.original.title || 'N/A'}</span>
                </div>
            );
        },
    },
    {
        header: 'CATEGORY',
        cell: ({ row }) => {
            const category = row.original.category?.name ?? 'Uncategorized';
            const color = getColorFromString(category);
            return (
                <span
                    className={`${color.text} ${color.gradient} px-3 py-1 rounded text-xs font-semibold`}
                >
                    {category}
                </span>
            );
        },
    },
    {
        header: 'DIFFICULTY',
        cell: ({ row }) => (
            <span className="text-sm font-medium text-secondary">
                {difficultyLabel(row.original.difficulty)}
            </span>
        ),
    },
    {
        header: 'STATUS',
        cell: ({ row }) => {
            const statusMap: Record<string, { label: string; color: string }> = {
                published: { label: 'Published', color: 'bg-green-500/20 text-green-400' },
                draft: { label: 'Draft', color: 'bg-gray-500/20 text-gray-400' },
                archived: { label: 'Archived', color: 'bg-red-500/20 text-red-400' },
            };
            const status = row.original.status || 'draft';
            const config = statusMap[status] || statusMap.draft;
            return (
                <span
                    className={`${config.color} px-3 py-1 rounded text-xs font-semibold inline-flex items-center gap-1`}
                >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {config.label}
                </span>
            );
        },
    },
    {
        header: 'CREATED DATE',
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt || row.original.updatedAt);
            return <span className="text-sm text-secondary">{format(date, 'MMM dd, yyyy')}</span>;
        },
    },
    {
        id: 'action',
        header: 'ACTIONS',
        cell: ({ row }) => <QuizActions quiz={row.original} />,
    },
];

export const QuizManagement = () => {
    const { data: quizData, isLoading } = useFetchQuizzes();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    if (isLoading || !quizData) {
        return <QuizLoader loading={isLoading} />;
    }

    const { quizzes, filter } = quizData.data;
    const statuses = ['all', 'draft', 'published', 'archived'];
    const difficulties = ['all', 'easy', 'medium', 'hard'];

    const filteredQuizzes = quizzes.filter(quiz =>
        (quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) === true) &&
        (statusFilter === 'all' || quiz.status === statusFilter) &&
        (difficultyFilter === 'all' || quiz.difficulty === difficultyFilter)
    );

    return (
        <div className="p-5 space-y-6">
            <DashboardHeader
                title="Quiz Management"
                subtitle="Nurture your knowledge grove by curating, editing, and expanding the quiz ecosystem."
                buttonIcon={<Plus />}
                onClick={() => navigate('create')}
                buttonName="Create New Quiz"
            />

            <FilterBar
                searchTerm={searchTerm}
                status={statusFilter}
                difficulty={difficultyFilter}
                statuses={statuses}
                difficulties={difficulties}
                handleSearch={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                }
                handleStatusChange={setStatusFilter}
                handleDifficultyChange={setDifficultyFilter}
            />

            <div>
                <QuizTable columns={columns} data={filteredQuizzes} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuizCard
                    title="Total Quizzes"
                    value={filter.total ?? 0}
                    info={`${filteredQuizzes.length} visible right now`}
                />
                <QuizCard
                    title="Published Quizzes"
                    value={quizzes.filter(quiz => quiz.status === 'published').length}
                    info="Ready for learners"
                />
                <QuizCard
                    title="Draft Quizzes"
                    value={quizzes.filter(quiz => quiz.status === 'draft').length}
                    info="Still being prepared"
                />
            </div>

            <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 rounded-full p-3">
                        <TrendingUp className="text-green-400" size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">New Insights Available</h3>
                        <p className="text-sm text-secondary-btn">
                            Your quiz performance analytics have been updated
                        </p>
                    </div>
                </div>
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                    onClick={() => navigate('create')}
                >
                    Create Quiz
                </Button>
            </div>
        </div>
    );
};
