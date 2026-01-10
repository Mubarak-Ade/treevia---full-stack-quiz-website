import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/context/NotificationProvider';
import { useCreateCategory, useEditCategory } from '@/features/admin/category/hooks';
import { useQuizStore } from '@/features/quiz/store';
import { Category } from '@/features/quiz/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { QuizLoader } from '../../QuizLoader';

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

    const { showNotification } = useNotification()


    const [inputValue, setInputValue] = useState("")

    const category = useCreateCategory()
    const updateCategory = useEditCategory()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const edit = useQuizStore(s => s.edit) as Category
    useEffect(() => {
        if (edit) {
            reset({
                name: edit.name,
                description: edit.description,
                tags: edit?.tags.map((t: any) => t.name)
            })
        }
}, [])
    const [tags, setTags] = useState<string[]>(edit ? edit?.tags.map((t: any) => t.name) : [])

    const hideModal = useQuizStore(s => s.hideModal)


    console.log(edit)

    if (category.isPending) {
        return <QuizLoader loading />
    }

    const onSubmit = (data: FormData) => {
        if (edit) {
            updateCategory.mutate({ id: edit._id, data }, {
                onSuccess: () => {
                    showNotification("success", "category created successfully")
                },
                onError: (error: any) => {
                    showNotification("error", error.message || errors.root?.message)
                }
            })
        } else {
            category.mutate(data, {
                onSuccess: () => {
                    showNotification("success", "category created successfully")
                },
                onError: (error: any) => {
                    showNotification("error", error.message || errors.root?.message)
                }
            })
        }

        hideModal()
        reset()
    }

    console.log(errors);

    const addTags = () => {
        const value = inputValue.trim()
        if (!value) return
        if (tags.includes(value)) return

        const newTag = [...tags, inputValue]
        setTags(newTag)

        if (setValue) {
            setValue("tags", newTag, {
                shouldValidate: true,
                shouldDirty: true
            })
        }
    }

    const removeTags = (tag: string) => {
        const update = tags.filter(t => t !== tag)
        setTags(update)
        setValue("tags", update, { shouldValidate: true })
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTags()
            setInputValue("")
        }
    }
    return (

        <form id='category-form' onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-2">
            <Field className='text-white'>
                <FieldLabel className='font-bold'>Category Name</FieldLabel>
                <Input {...register("name")} placeholder='e.g Science' className='bg-background p-5 rounded-lg border border-muted focus:ring-muted focus:ring outline-none' />
            </Field>
            <Field className="text-white">
                <FieldLabel className="font-bold">Description</FieldLabel>
                <Textarea {...register("description")} placeholder='Briefly describe this category' className='bg-background p-5 rounded-lg border focus:ring-muted border-muted' />
            </Field>
            <Field className='text-white overflow-hidden'>
                <FieldLabel>Tags</FieldLabel>
                <div className='flex gap-2 overflow-auto bg-background items-center p-2 rounded-lg border border-muted focus:ring-muted focus:ring outline-none'>
                    {tags.map((tag) => (
                        <Button type='button' onClick={() => removeTags(tag)} className='bg-card text-xs'>
                            {tag}
                            <X />
                        </Button>
                    ))}
                    <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} onKeyDown={handleKeyDown} placeholder='Add tags...' className='p-5 w-full overflow-auto outline-none focus-visible:ring-0 border-0' />
                </div>
            </Field>
        </form>

    )
}
