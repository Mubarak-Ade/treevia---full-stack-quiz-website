import { Field, FieldLabel } from '@/components/ui/field';
import { UploadCloud } from 'lucide-react';
import React from 'react';

export const ImageUpload = () => {
    return (
        <div className="max-w-xs bg-surface p-5 w-full rounded-xl">
            <h2 className="font-bold mb-4 text-xl text-primary">Cover Image</h2>
            <Field>
                <div className="border-dashed border-default bg-base relative text-primary rounded-xl text-center justify-center flex flex-col h-50 items-center p-5 border">
                    <UploadCloud className="" size={50} />
                    <FieldLabel className="">Click to upload or drag && drop</FieldLabel>
                </div>
            </Field>
        </div>
    );
};
