import BreadCrumbs from '@/components/feature/BreadCrumbs'
import { QuizLoader } from '@/components/feature/QuizLoader'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNotification } from '@/context/NotificationProvider'
import { useCreateQuiz, useUpdateQuiz } from '@/features/admin/quiz/hooks'
import { useFetchCategories } from '@/features/quiz/hooks'
import { useQuizStore } from '@/features/quiz/store'
import { Quiz } from '@/features/quiz/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, PlusCircle, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, FieldError as FE, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'

const schema = z.object( {
	title: z.string().min( 3, "Please enter quiz title" ),
	category: z.string().min( 1, "Select a category" ),
	timeLimit: z.number().min( 10, "Time must be at least 10 minutes" ),
	difficulty: z.enum( [ "Easy", "Medium", "Hard" ], {
		message: "Select a difficulty level"
	} ),
	questions: z.array( z.object( {
		questionText: z.string().min( 1, "Question text is required" ),
		correctAnswer: z.number().int().min( 0 ).max( 3 ),
		options: z.object( {
			A: z.string().min( 1, "Option A is required" ),
			B: z.string().min( 1, "Option B is required" ),
			C: z.string().min( 1, "Option C is required" ),
			D: z.string().min( 1, "Option D is required" )
		} )
	} ) ).min( 1, "At least one question is required" )
} );

type FormData = z.infer<typeof schema>;

const ErrorField = ( { error }: { error: FE | undefined } ) =>
{
	return error && <FieldError>{ error.message }</FieldError>
}

const difficulty = [ "Easy", "Medium", "Hard" ] as const;

export const CreateQuiz = () =>
{
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>( {
		resolver: zodResolver( schema ),
		defaultValues: {
			questions: [ {
				questionText: "",
				correctAnswer: undefined as unknown as number,
				options: {
					A: "",
					B: "",
					C: "",
					D: ""
				}
			} ]
		}
	} );

	const { fields, append, remove } = useFieldArray( {
		control,
		name: "questions"
	} );

	const { showNotification } = useNotification()
	const edit = useQuizStore( s => s.edit ) as Quiz
	const { data: category, isLoading } = useFetchCategories()
	const quiz = useCreateQuiz()
	const updateQuiz = useUpdateQuiz()
	const navigate = useNavigate()

	useEffect( () =>
	{
		if ( edit )
		{
			// Transform questions from backend format to form format
			const formattedQuestions = edit?.questions?.map( q => ( {
				questionText: q.questionText,
				correctAnswer: q.correctAnswer,
				options: {
					A: q.options[ 0 ] || "",
					B: q.options[ 1 ] || "",
					C: q.options[ 2 ] || "",
					D: q.options[ 3 ] || ""
				}
			} ) ) || [ {
				questionText: "",
				correctAnswer: undefined as unknown as number,
				options: { A: "", B: "", C: "", D: "" }
			} ];

			reset( {
				title: edit.title,
				category: edit.category?._id,
				timeLimit: edit.timeLimit,
				difficulty: ( edit.difficulty.charAt( 0 ).toUpperCase() + edit.difficulty.slice( 1 ) ) as "Easy" | "Medium" | "Hard", // Capitalize first letter
				questions: formattedQuestions
			} )
		}
	}, [ edit, reset ] )

	if ( isLoading || !category )
	{
		return <QuizLoader loading />
	}

	const CustomCheckbox = ( { value, onChange }: { value: string, onChange: ( level: string ) => void } ) =>
	{
		return (
			<div className="flex gap-2">
				{ difficulty.map( ( level ) => (
					<button
						type="button"
						key={ level }
						onClick={ ( e ) =>
						{
							e.preventDefault();
							e.stopPropagation();
							onChange( level );
						} }
						className={ `px-6 ${ value === level ? "bg-custom text-secondary-bg font-semibold" : "" } py-2 border cursor-pointer border-muted rounded-full hover:bg-custom/20 transition-colors` }
					>
						{ level }
					</button>
				) ) }
			</div>
		)
	}

	const onSubmit = ( data: FormData ) =>
	{
		console.log( "Form data:", data );
		const transformedData = {
			title: data.title,
			category: data.category,
			timeLimit: data.timeLimit,
			difficulty: data.difficulty, // Convert to lowercase
			questions: data.questions.map( q => ( {
				questionText: q.questionText,
				options: [ q.options.A, q.options.B, q.options.C, q.options.D ], // Convert object to array
				correctAnswer: q.correctAnswer
			} ) )
		};
		if ( edit )
		{
			updateQuiz.mutate(
				{ id: edit._id, data: transformedData },
				{
					onSuccess: () =>
					{
						showNotification( "success", "Quiz updated successfully!" )
					},
					onError: ( ) =>
					{
						showNotification( "error", "Failed to update quiz", )
					}
				}
			)
		} else
		{
			quiz.mutate( transformedData, {
				onSuccess: () =>
				{
					showNotification( "success", "Quiz created successfully!" )
				},
				onError: ( ) =>
				{
					showNotification( "error", "Failed to create quiz", )
				}
			} )
		}
		reset()
		useQuizStore.setState({edit: null})
		navigate(-1)
	}

	const handleAddQuestion = ( e: React.MouseEvent ) =>
	{
		e.preventDefault();
		e.stopPropagation();
		append( {
			questionText: "",
			correctAnswer: undefined as unknown as number,
			options: {
				A: "",
				B: "",
				C: "",
				D: ""
			}
		} );
	}

	const handleRemoveQuestion = ( index: number ) => ( e: React.MouseEvent ) =>
	{
		e.preventDefault();
		e.stopPropagation();
		remove( index );
	}

	const handlePublish = ( e: React.MouseEvent ) =>
	{
		e.preventDefault();
		e.stopPropagation();
		handleSubmit( onSubmit )();
	}


	console.log( edit );


	return (
		<div className=''>
			<div className="flex p-5 justify-between">
				<div>
					<h2 className='text-4xl font-bold text-white'>
						{ edit ? "Edit Quiz" : "Create Quiz" }
					</h2>
					<h6 className='text-secondary mt-2'>Design your quiz content and questions below</h6>
				</div>
				<div className="flex items-center gap-4">
					<button
						onClick={ handlePublish }
						className='bg-custom cursor-pointer rounded-full font-bold px-4 py-2 hover:bg-custom/80 transition-colors'
					>
						{ edit ? "Update Quiz" : "Publish Quiz" }
					</button>
					<button
						onClick={ () => navigate( -1 ) }
						className='text-custom cursor-pointer px-4 py-2 font-bold border rounded-full border-muted hover:bg-muted/20 transition-colors'
					>
						Cancel
					</button>
				</div>
			</div>

			<BreadCrumbs />

			<div className="p-5">
				<div className="bg-card p-5 max-w-4xl w-full m-auto rounded-xl text-white">
					<div>
						<FieldSet className='border p-5 border-muted rounded-xl'>
							<FieldLegend variant='legend'>General Information</FieldLegend>
							<FieldGroup>
								<Field>
									<FieldLabel>Quiz Title</FieldLabel>
									<Input
										{ ...register( "title" ) }
										className='border-muted bg-background focus-visible:ring-muted'
										placeholder="Enter quiz title"
									/>
									<ErrorField error={ errors.title } />
								</Field>

								<div className="grid grid-cols-2 items-start gap-4">
									<Field>
										<FieldLabel>Category</FieldLabel>
										<Controller
											name='category'
											control={ control }
											render={ ( { field } ) => (
												<Select onValueChange={ field.onChange } value={ field.value }>
													<SelectTrigger className='border p-1.5 rounded-md bg-background border-muted focus:ring-muted'>
														<SelectValue placeholder={ edit?.category ? field.value : "Select category" } />
													</SelectTrigger>
													<SelectContent className="bg-card  text-white  border rounded-xl p-2 border-muted">
														{ category?.map( ( cat: any ) => (
															<SelectItem
																key={ cat._id }
																className='px-4 py-2 m-0.5 rounded-lg hover:bg-background cursor-pointer'
																value={ cat._id }
															>
																{ cat.name }
															</SelectItem>
														) ) }
													</SelectContent>
												</Select>
											) }
										/>
										<ErrorField error={ errors.category } />
									</Field>

									<Field>
										<FieldLabel>Time Limit (minutes)</FieldLabel>
										<Input
											{ ...register( "timeLimit", { valueAsNumber: true } ) }
											type="number"
											min="10"
											className='border-muted bg-background focus-visible:ring-muted'
											placeholder="e.g., 30"
										/>
										<ErrorField error={ errors.timeLimit } />
									</Field>
								</div>

								<Field className='text-white'>
									<FieldLabel className='font-bold'>
										Difficulty Level
									</FieldLabel>
									<Controller
										name='difficulty'
										control={ control }
										render={ ( { field } ) => (
											<CustomCheckbox value={ field.value } onChange={ field.onChange } />
										) }
									/>
									<ErrorField error={ errors.difficulty } />
								</Field>
							</FieldGroup>
						</FieldSet>

						<div className="flex items-center my-6 justify-between">
							<h6 className='text-custom text-xl font-bold'>Questions</h6>
							<button
								onClick={ handleAddQuestion }
								className='flex gap-2 items-center text-sm hover:text-custom transition-colors'
							>
								<PlusCircle size={ 20 } /> Add Question
							</button>
						</div>

						{ fields.map( ( field, index ) => (
							<FieldSet key={ field.id } className='border p-5 border-muted rounded-xl mb-4'>
								<div className="flex justify-between items-center mb-4">
									<FieldLegend variant='legend'>Question { index + 1 }</FieldLegend>
									{ fields.length > 1 && (
										<button
											onClick={ handleRemoveQuestion( index ) }
											className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
											aria-label="Delete question"
										>
											<Trash2 size={ 20 } /> Delete
										</button>
									) }
								</div>

								<FieldGroup>
									<Field>
										<FieldLabel>Question Text</FieldLabel>
										<Input
											{ ...register( `questions.${ index }.questionText` ) }
											className='border-muted bg-background focus-visible:ring-muted'
											placeholder="Enter your question"
										/>
										<ErrorField error={ errors.questions?.[ index ]?.questionText } />
									</Field>

									<FieldGroup>
										<FieldLabel className="mb-3">Answer Options (select the correct answer)</FieldLabel>
										<Controller
											name={ `questions.${ index }.correctAnswer` }
											control={ control }
											render={ ( { field: controllerField } ) => (
												<RadioGroup
													value={ controllerField.value !== undefined ? String( controllerField.value ) : undefined }
													onValueChange={ ( val ) => controllerField.onChange( Number( val ) ) }
													className='space-y-3'
												>
													{ ( [ "A", "B", "C", "D" ] as const ).map( ( option, optionIndex ) => (
														<div key={ option } className="flex items-center gap-3 p-2 rounded hover:bg-background/50">
															<RadioGroupItem
																value={ String( optionIndex ) }
																id={ `question-${ index }-option-${ optionIndex }` }
															/>
															<FieldLabel
																htmlFor={ `question-${ index }-option-${ optionIndex }` }
																className="font-semibold min-w-7.5 cursor-pointer"
															>
																{ option }.
															</FieldLabel>
															<Input
																{ ...register( `questions.${ index }.options.${ option }` ) }
																className='border-muted bg-background focus-visible:ring-muted flex-1'
																placeholder={ `Enter option ${ option }` }
															/>
														</div>
													) ) }
												</RadioGroup>
											) }
										/>
										<ErrorField error={ errors.questions?.[ index ]?.correctAnswer } />
									</FieldGroup>
								</FieldGroup>
							</FieldSet>
						) ) }
					</div>
				</div>

				<div
					onClick={ handleAddQuestion }
					className="p-5 max-w-4xl cursor-pointer gap-2 w-full m-auto rounded-xl bg-card flex items-center justify-center flex-col mt-5 hover:bg-card/80 transition-colors"
				>
					<Plus size={ 40 } color='var(--color-background)' className='bg-custom/50 rounded-full p-2' />
					<h2 className='text-custom font-bold text-xl'>Add Another Question</h2>
					<p className='text-secondary text-sm'>Create multiple choice question</p>
				</div>
			</div>
		</div>
	)
}