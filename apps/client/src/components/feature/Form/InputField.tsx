import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    htmlFor?: string
    type?: React.HTMLInputTypeAttribute;
    placeholder: string;
}

export const InputField = <T extends FieldValues>({
    label,
    htmlFor,
    placeholder,
    type = 'text',
    name,
    ...props
}: InputProps<T>) => {

    const {
        register,
        formState: { errors },
    } = useFormContext<T>();
    const error = name.split('.').reduce((acc: any, key) => acc?.[key], errors);
    return (
        <Field>
            <FieldLabel htmlFor={htmlFor} className="text-xs uppercase font-semibold text-secondary">
                {label}
            </FieldLabel>
            <Input
                type={type}
                {...props}
                {...register(name)}
                className="bg-surface-alt border border-default text-primary focus-visible:ring-2 focus-visible:ring-brand rounded-md"
                placeholder={placeholder}
            />
            {error?.message && <FieldError>{error?.message}</FieldError>}
        </Field>
    );
};
