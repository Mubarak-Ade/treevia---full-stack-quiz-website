import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNotification } from '@/context/NotificationProvider';
import { useCreateQuiz, useUpdateQuiz } from '@/features/admin/quiz/hooks';
import { useFetchCategories } from '@/features/quiz/hooks';
import { useQuizStore } from '@/features/quiz/store';
import { Quiz } from '@/features/quiz/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectContent } from '@radix-ui/react-select';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { QuizLoader } from '../../QuizLoader';

export const schema = z.object({
	title: z.string().min(3, "please enter quiz title"),
	category: z.string().min(6, "select a category"),
	timeLimit: z.number().min(10, "Time must atleast 10min"),
	level: z.enum(["Easy", "Medium", "Hard"], {
		message: "Select a difficulty level"
	})
});

export type FormData = z.infer<typeof schema>;

export const QuizForm = () => {

	const { showNotification } = useNotification()

	const { data: category, isLoading } = useFetchCategories()
	const quiz = useCreateQuiz()
	const updateQuiz = useUpdateQuiz()

	if (isLoading || !category) {
		return <QuizLoader loading />
	}

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	// const category = 
	const hideModal = useQuizStore(s => s.hideModal)
	const edit = useQuizStore(s => s.edit) as Quiz

	useEffect(() => {
		if (edit) {
			reset({
				title: edit.title,
				category: edit.category?.name,
				timeLimit: edit.timeLimit,
				level: edit.difficulty
			})
		}
	}, [])

	console.log(errors);

	const difficulty = ["Easy", "Medium", "Hard"]

	// const handleSubmit = () => {

	// }

	const CustomCheckbox = ({ value, onChange }: { value: string, onChange: (level: string) => void }) => {
		return (
			<div className="flex gap-2">
				{difficulty.map((level) => (
					<button type="button" key={level} onClick={() => onChange(level)} className={`px-6 ${value === level ? "bg-custom text-secondary-bg font-semibold" : ""} py-2 border cursor-pointer border-muted rounded-full`}>
						{level}
					</button>
				))}
			</div>
		)
	}

	const onSubmit = (data: FormData) => {
		if (edit) {
			updateQuiz.mutate({ id: edit._id, data }, {
				onSuccess: () => {
					showNotification("success", "Quiz Created Successfully")
				},
				onError: (error) => {
					showNotification("error", error.message)
				}
			})
		} else {
			quiz.mutate(data, {
				onSuccess: () => {
					showNotification("success", "Quiz Created Successfully")
				},
				onError: (error) => {
					showNotification("error", error.message)
				}
			})
		}
		hideModal()
	}

	return (
		<form id="quiz-form" onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-2">
			<Field className='text-white'>
				<FieldLabel className='font-bold'>Quiz Title</FieldLabel>
				<Input {...register("title")} className='bg-background p-5 rounded-lg border border-muted focus:ring-muted focus:ring outline-none' />
				{errors.title && (
					<FieldError>{errors.title.message}</FieldError>
				)}
			</Field>
			<Field className="text-white">
				<FieldLabel className="font-bold">Description</FieldLabel>
				<Textarea className='bg-background p-5 rounded-lg border focus:ring-muted border-muted' name="" id="" />
			</Field>
			<div className="flex justify-between gap-4">
				<Field className="text-white">
					<FieldLabel className="font-bold">Category</FieldLabel>
					<Controller name='category' control={control} render={({ field }) => (

						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger className='className="border p-5 bg-background border-muted focus:ring-muted'>
								<SelectValue placeholder={edit.category ? field.value : "Select category"} />
							</SelectTrigger>
							<SelectContent className="bg-card w-50 border rounded-xl p-2 border-muted">
								{category?.map((cat: any) => (
									<SelectItem className='px-4 py-2 m-0.5 rounded-lg hover:bg-background cursor-pointer' value={cat._id}>
										{cat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)} />
					{errors.category && (
						<FieldError>{errors.category.message}</FieldError>
					)}
				</Field>
				<Field className='text-white'>
					<FieldLabel className='font-bold'>Time Limit</FieldLabel>
					<Input {...register("timeLimit", { valueAsNumber: true })} type='number' className='bg-background p-5 rounded-lg border border-muted focus:ring-muted focus:ring outline-none' />
					{errors.timeLimit && (
						<FieldError>{errors.timeLimit.message}</FieldError>
					)}
				</Field>
			</div>
			<Field className='text-white'>
				<FieldLabel className='font-bold'>
					Difficult Level
				</FieldLabel>
				<Controller name='level' control={control} render={({ field }) => (
					<CustomCheckbox value={field.value} onChange={field.onChange} />
				)} />
				{errors.level && (
					<FieldError>{errors.level.message}</FieldError>
				)}
			</Field>

		</form>
	)
}
