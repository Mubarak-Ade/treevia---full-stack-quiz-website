import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Category } from '@/modules/quiz/types/quiz.types';
import { QuizFormData } from '@/schema/quiz.schema';
import { Controller, useFormContext } from 'react-hook-form';

interface ClassificationProps {
    difficulty: readonly ['easy', 'medium', 'hard'];
    category: Category[];
}

export const Classification = ({ difficulty, category }: ClassificationProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<QuizFormData>();

    const CustomCheckbox = ({
        value,
        onChange,
    }: {
        value: string;
        onChange: (level: 'easy' | 'medium' | 'hard') => void;
    }) => {
        return (
            <div className="flex bg-bg-surface-alt p-1 rounded-full flex-wrap">
                {difficulty.map(level => (
                    <button
                        type="button"
                        key={level}
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChange(level);
                        }}
                        className={`px-4 py-2 rounded-full  transition-all ${value === level ? 'bg-surface text-secondary' : 'bg-transparent text-primary'}`}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-surface rounded-xl border border-default p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                <h2 className="text-lg font-bold text-primary">Classification</h2>
            </div>

            <div className="space-y-4">
                <Field>
                    <FieldLabel className="text-xs uppercase font-semibold text-secondary">
                        Category
                    </FieldLabel>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-surface-alt border border-default text-primary rounded-md focus:ring-brand">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-surface-alt text-primary border border-secondary-btn/30 rounded-lg">
                                    {category?.map(cat => (
                                        <SelectItem
                                            key={cat._id}
                                            className="px-4 py-2 rounded-lg hover:bg-secondary-btn/30 cursor-pointer"
                                            value={cat._id as string}
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && <FieldError>{errors.category.message}</FieldError>}
                </Field>

                <Field>
                    <FieldLabel className="text-xs uppercase font-semibold text-secondary">
                        Difficulty Level
                    </FieldLabel>
                    <Controller
                        name="difficulty"
                        control={control}
                        render={({ field }) => (
                            <CustomCheckbox value={field.value} onChange={field.onChange} />
                        )}
                    />
                    {errors.difficulty && <FieldError>{errors.difficulty.message}</FieldError>}
                </Field>
            </div>
        </div>
    );
};
