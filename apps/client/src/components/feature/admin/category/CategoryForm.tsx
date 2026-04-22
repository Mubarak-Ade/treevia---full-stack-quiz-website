import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/context/NotificationProvider';
import { useCreateCategory, useEditCategory } from '@/modules/admin/category/controllers/admin-category.controller';
import { useQuizStore } from '@/modules/quiz/store/quiz.store';
import { Category } from '@/modules/quiz/types/quiz.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
    name: z.string().min(3, "please enter quiz title"),
    description: z.string().min(6, "please enter a description"),
    tags: z.array(z.string())
        .min(1, 'At least one tag required')
        .refine(
            (tags) => tags.every(tag => tag.length >= 2),
            { message: 'Each tag must be at least 2 characters' }
        )
        .refine(
            (tags) => tags.every(tag => /^[a-zA-Z0-9\s-]+$/.test(tag)),
            { message: 'Tags can only contain letters, numbers, spaces, and hyphens' }
        )
});

type FormData = z.infer<typeof schema>;

export const CategoryForm = () => {
    const { showNotification } = useNotification();
    const [inputValue, setInputValue] = useState("");
    const createCategory = useCreateCategory();
    const updateCategory = useEditCategory();
    const hideModal = useQuizStore(s => s.hideModal);
    const edit = useQuizStore(s => s.edit) as Category | null;
    const defaultTags = useMemo(
        () => (edit?.tags ?? []).map((tag: any) => (typeof tag === 'string' ? tag : tag.name)),
        [edit]
    );
    const [tags, setTags] = useState<string[]>(defaultTags);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            tags: [],
        },
    });

    useEffect(() => {
        if (edit) {
            reset({
                name: edit.name,
                description: edit.description,
                tags: defaultTags,
            });
            setTags(defaultTags);
            return;
        }

        reset({
            name: '',
            description: '',
            tags: [],
        });
        setTags([]);
    }, [defaultTags, edit, reset]);

    const onSubmit = (data: FormData) => {
        if (edit) {
            updateCategory.mutate({ id: edit._id, data }, {
                onSuccess: () => {
                    showNotification("success", "Category updated successfully");
                    hideModal();
                    reset({ name: '', description: '', tags: [] });
                    setTags([]);
                },
                onError: (error: any) => {
                    showNotification("error", error.message || errors.root?.message)
                }
            })
        } else {
            createCategory.mutate(data as Category, {
                onSuccess: () => {
                    showNotification("success", "Category created successfully");
                    hideModal();
                    reset({ name: '', description: '', tags: [] });
                    setTags([]);
                },
                onError: (error: any) => {
                    showNotification("error", error.message || errors.root?.message)
                }
            })
        }
    };

    const addTags = () => {
        const value = inputValue.trim();
        if (!value || tags.includes(value)) return;

        const newTag = [...tags, value];
        setTags(newTag);
        setInputValue('');

        setValue("tags", newTag, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const removeTags = (tag: string) => {
        const update = tags.filter(t => t !== tag);
        setTags(update);
        setValue("tags", update, { shouldValidate: true, shouldDirty: true });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTags();
        }
    };
    return (
        <form id='category-form' onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-2">
            <Field className='text-white'>
                <FieldLabel className='font-bold'>Category Name</FieldLabel>
                <Input {...register("name")} placeholder='e.g Science' className='bg-background p-5 rounded-lg border border-muted focus:ring-muted focus:ring outline-none' />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field className="text-white">
                <FieldLabel className="font-bold">Description</FieldLabel>
                <Textarea {...register("description")} placeholder='Briefly describe this category' className='bg-background p-5 rounded-lg border focus:ring-muted border-muted' />
                {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>
            <Field className='text-white overflow-hidden'>
                <FieldLabel>Tags</FieldLabel>
                <div className='flex gap-2 overflow-auto bg-background items-center p-2 rounded-lg border border-muted focus:ring-muted focus:ring outline-none'>
                    {tags.map((tag) => (
                        <Button key={tag} type='button' onClick={() => removeTags(tag)} className='bg-card text-xs'>
                            {tag}
                            <X />
                        </Button>
                    ))}
                    <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleKeyDown} placeholder='Add tags...' className='p-5 w-full overflow-auto outline-none focus-visible:ring-0 border-0' />
                </div>
                {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
            </Field>
        </form>
    );
};
