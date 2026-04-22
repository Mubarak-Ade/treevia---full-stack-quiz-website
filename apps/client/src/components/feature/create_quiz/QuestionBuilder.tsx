import { QuizFormData } from '@/schema/quiz.schema';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { QuestionList } from './QuestionList';
import { Plus } from 'lucide-react';

export const QuestionBuilder = () => {
    const { control } = useFormContext<QuizFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    const handleAddQuestion = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        append({
            questionText: '',
            correctAnswer: 0,
            options: {
                A: '',
                B: '',
                C: '',
                D: '',
            },
        });
    };

    const handleRemoveQuestion = (index: number) => {
        remove(index);
    };

    return (
        <div className="">
            <div className="bg-surface rounded-xl border border-default p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-8 bg-green-500 rounded"></div>
                        <h2 className="text-lg font-bold text-primary">Question Builder</h2>
                    </div>
                    <span className="text-xs uppercase font-semibold text-secondary">
                        QUESTIONS: {fields.length.toString().padStart(2, '0')}
                    </span>
                </div>

                {/* Questions List */}
                <QuestionList fields={fields} handleRemoveQuestion={handleRemoveQuestion} />

                {/* Add Question Button */}
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="w-full mt-4 py-3 flex items-center justify-center gap-2 border-2 border-dashed border-secondary-btn/30 rounded-lg text-brand hover:border-secondary-btn/60 hover:text-secondary-btn transition-colors"
                >
                    <Plus size={18} />
                    Add New Question
                </button>
            </div>
        </div>
    );
};
