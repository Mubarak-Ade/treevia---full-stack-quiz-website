import { QuizFormData } from '@/schema/quiz.schema';
import { Trash2 } from 'lucide-react';
import { FieldArrayWithId } from 'react-hook-form';
import { InputField } from '../Form/InputField';
import { AnswerOption } from './AnswerOption';

interface QuestionBoxProps {
    fields: FieldArrayWithId<QuizFormData>[];
    handleRemoveQuestion: (index: number) => void;
}

export const QuestionList = ({ fields, handleRemoveQuestion }: QuestionBoxProps) => {
    return (
        <div className="space-y-4 max-h-96 overflow-y-auto">
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="bg-background/50 border border-default rounded-lg p-4 hover:border-secondary-btn/40 transition-colors"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500/20 text-green-400 rounded text-xs font-bold">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <label className="text-sm font-semibold text-primary">
                                QUESTION TEXT
                            </label>
                        </div>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveQuestion(index)}
                                className="text-secondary-btn hover:text-red-400 transition-colors"
                                aria-label="Delete question"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    <InputField<QuizFormData>
                        label=""
                        name={`questions.${index}.questionText`}
                        placeholder="Enter your question here..."
                    />


                    {/* Answer Options */}
                    <AnswerOption index={index} />
                </div>
            ))}
        </div>
    );
};
