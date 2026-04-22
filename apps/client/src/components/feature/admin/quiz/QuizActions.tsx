import { Button } from '@/components/ui/button';
import { useNotification } from '@/context/NotificationProvider';
import { useDeleteQuiz } from '@/modules/admin/quiz/controllers/admin-quiz.controller';
import { AdminQuiz } from '@/modules/admin/quiz/types/admin-quiz.types';
import { PenBox, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export const QuizActions = ({ quiz }: { quiz: AdminQuiz }) => {
    const navigate = useNavigate();
    const deleteQuiz = useDeleteQuiz();
    const { showNotification } = useNotification();

    const handleEdit = () => {
        navigate(`/admin/quizzes/create?quizId=${quiz._id}`);
    };

    const handleDelete = () => {
        deleteQuiz.mutate(quiz._id, {
            onSuccess: response => {
                showNotification('success', response.message);
            },
            onError: error => {
                showNotification('error', error.message);
            },
        });
    };

    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer text-blue-500 hover:bg-blue-500/20"
                onClick={handleEdit}
            >
                <PenBox size={16} />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="cursor-pointer text-red-500 hover:bg-red-500/20"
                onClick={handleDelete}
                disabled={deleteQuiz.isPending}
            >
                <Trash2 size={16} />
            </Button>
        </div>
    );
};
