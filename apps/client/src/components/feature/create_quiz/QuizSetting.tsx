import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { QUIZ_TIME_LIMITS, QuizFormData } from '@/schema/quiz.schema';
import { Settings } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

const ToggleRow = ({
    label,
    description,
    checked,
    onChange,
}: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) => (
    <Field className="mt-4 flex-row items-center justify-between">
        <FieldLabel className="flex-col gap-0 flex items-start">
            <h4 className="text-sm font-bold text-secondary">{label}</h4>
            <span className="text-primary">{description}</span>
        </FieldLabel>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className="flex items-center rounded-full border border-default p-1"
        >
            <div
                className={`flex h-7 w-14 items-center rounded-full transition-colors ${
                    checked ? 'bg-brand-subtle' : 'bg-surface-alt'
                }`}
            >
                <span
                    className={`size-5 rounded-full bg-brand shadow-lg transition-transform ${
                        checked ? 'translate-x-8' : 'translate-x-1'
                    }`}
                />
            </div>
        </button>
    </Field>
);

export const QuizSetting = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<QuizFormData>();

    return (
        <div className="bg-surface max-w-xs w-full rounded-xl p-5">
            <div className="flex text-2xl font-bold text-primary items-center gap-2">
                <Settings className="text-brand" />
                <h2>Settings</h2>
            </div>
            <div className="">
                <Field className="flex-row w-full mt-4">
                    <FieldLabel className="flex-col gap-0 flex items-start">
                        <h4 className="text-sm text-secondary font-bold">XP Reward</h4>
                        <span className="text-primary">Points earn on completion</span>
                    </FieldLabel>
                    <Input
                        type="number"
                        {...register('xpReward', { valueAsNumber: true })}
                        className="bg-surface-alt text-primary font-semibold p-0 max-w-20 outline-none focus-visible:ring-2 focus-visible:ring-brand text-center"
                    />
                </Field>
                {errors.xpReward && <FieldError>{errors.xpReward.message}</FieldError>}
                <Field className="flex-row w-full mt-4">
                    <FieldLabel className="flex-col gap-0 flex items-start">
                        <h4 className="text-sm text-secondary font-bold">Time Limit</h4>
                        <span className="text-primary">Seconds per question</span>
                    </FieldLabel>
                    <Controller
                        name="timeLimitPerQuestion"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={value => field.onChange(Number(value))}
                                value={String(field.value)}
                            >
                                <SelectTrigger className="bg-surface-alt max-w-20 border border-default text-primary rounded-md focus:ring-brand">
                                    <SelectValue placeholder="Select Time" />
                                </SelectTrigger>
                                <SelectContent className="bg-surface-alt text-primary border border-secondary-btn/30 rounded-lg">
                                    {QUIZ_TIME_LIMITS.map(time => (
                                        <SelectItem
                                            key={time}
                                            className="px-4 py-2 rounded-lg hover:bg-secondary-btn/30 cursor-pointer"
                                            value={String(time)}
                                        >
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </Field>
                {errors.timeLimitPerQuestion && (
                    <FieldError>{errors.timeLimitPerQuestion.message}</FieldError>
                )}
                <Controller
                    name="isPublic"
                    control={control}
                    render={({ field }) => (
                        <ToggleRow
                            label="Visible To Public"
                            description="Allow learners to see this quiz"
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="shuffleQuestions"
                    control={control}
                    render={({ field }) => (
                        <ToggleRow
                            label="Shuffle Questions"
                            description="Randomize question order for each attempt"
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
};
