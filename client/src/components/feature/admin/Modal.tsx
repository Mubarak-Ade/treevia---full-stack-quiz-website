import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useQuizStore } from '@/features/quiz/store'
import { X } from 'lucide-react'
import { CategoryForm } from './category/CategoryForm'
import { QuizForm } from './quiz/QuizForm'

export const Modal = () => {
	const { hideModal, type } = useQuizStore()

	if (!type) return null

	return (
		<div className="fixed w-full blur-in-3xl flex items-center justify-center bg-background/50 h-screen top-0 z-100">
			<Card className='max-w-xl w-full overflow-hidden rounded-xl bg-card border border-muted'>
				<CardHeader className="text-white text-xl border-b border-muted font-bold flex justify-between items-center">
					<h2>{type === "quiz" ? "Add New Quiz" : "Add New Category"}</h2>
					<Button onClick={hideModal} size={"icon-sm"} className="cursor-pointer" variant={"ghost"}>
						<X />
					</Button>
				</CardHeader>
				<CardContent>
					{type === "quiz" ? <QuizForm /> : <CategoryForm />}
				</CardContent>
				<CardFooter className='flex flex-row-reverse gap-4'>
					<Button type='submit' form={type === "quiz" ? "quiz-form" : "category-form"} className='bg-custom cursor-pointer'>
						{type === "quiz" ? "Create Quiz" : "Create Category"}
					</Button>
					<Button type="button" onClick={hideModal} variant={"outline"} className='text-white border-muted cursor-pointer'>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
