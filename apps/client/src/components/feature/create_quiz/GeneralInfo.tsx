import { Field, FieldLabel } from '@/components/ui/field';
import { QuizFormData } from '@/schema/quiz.schema';
import { InputField } from '../Form/InputField';

export const GeneralInfo = () => {
    return (
        <div className="bg-surface rounded-xl border border-default p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-brand rounded"></div>
                <h2 className="text-lg font-bold text-primary">General Info</h2>
            </div>

            <div className="space-y-4">
                <InputField<QuizFormData>
                    label="Quiz Title"
                    placeholder="e.g. Rare Flora of the Amazon"
                    name="title"
                />

                <Field>
                    <FieldLabel className="text-xs uppercase font-semibold text-secondary">
                        Notes
                    </FieldLabel>
                    <p className="rounded-md border border-default bg-surface-alt p-3 text-sm text-secondary">
                        Keep the quiz title short and clear. Questions and quiz settings are handled
                        below.
                    </p>
                </Field>
            </div>
        </div>
    );
};
