import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Controller, useFormContext } from 'react-hook-form';
import { InputField } from '../Form/InputField';
import { QuizFormData } from '@/schema/quiz.schema';

export const AnswerOption = ({ index }: { index: number }) => {
    const { control } = useFormContext<QuizFormData>();

    return (
        <div className="mt-3 space-y-2">
            <Controller
                name={`questions.${index}.correctAnswer`}
                control={control}
                render={({ field: controllerField }) => (
                    <RadioGroup
                        value={
                            controllerField.value !== undefined
                                ? String(controllerField.value)
                                : undefined
                        }
                        onValueChange={val => controllerField.onChange(Number(val))}
                        className="space-y-2"
                    >
                        {(['A', 'B', 'C', 'D'] as const).map((option, optionIndex) => (
                            <div key={option} className="flex items-center gap-2 text-xs">
                                <RadioGroupItem
                                    value={String(optionIndex)}
                                    id={`question-${index}-option-${optionIndex}`}
                                    className="w-4 h-4"
                                />
                                <InputField<QuizFormData>
                                    name={`questions.${index}.options.${option}`}
                                    htmlFor={`question-${index}-option-${optionIndex}`}
                                    label={`Option ${option}`}
                                    placeholder={`Option ${option}`}
                                />
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
        </div>
    );
};
