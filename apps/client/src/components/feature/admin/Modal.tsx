import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useQuizStore } from '@/modules/quiz/store/quiz.store'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { CategoryForm } from './category/CategoryForm'

export const Modal = () => {
	const { hideModal, type, edit } = useQuizStore()
	const navigate = useNavigate()

	if (!type) return null

	const handlePrimaryAction = () => {
		if (type === "quiz") {
			hideModal()
			navigate("/admin/quizzes/create")
			return
		}
	}

	return (
		<div className="fixed w-full blur-in-3xl flex items-center justify-center bg-background/50 h-screen top-0 z-100">
			<Card className='max-w-xl w-full overflow-hidden rounded-xl bg-card border border-muted'>
				<CardHeader className="text-white text-xl border-b border-muted font-bold flex justify-between items-center">
					<h2>
						{type === "quiz"
							? "Add New Quiz"
							: edit
								? "Edit Category"
								: "Add New Category"}
					</h2>
					<Button onClick={hideModal} size={"icon-sm"} className="cursor-pointer" variant={"ghost"}>
						<X />
					</Button>
				</CardHeader>
				<CardContent>
					{type === "quiz" ? (
						<div className="py-6 text-sm text-secondary">
							Quiz creation now happens on the dedicated quiz editor page so the form can
							stay simpler and support question management properly.
						</div>
					) : (
						<CategoryForm />
					)}
				</CardContent>
				<CardFooter className='flex flex-row-reverse gap-4'>
					<Button
						type={type === "quiz" ? "button" : "submit"}
						form={type === "quiz" ? undefined : "category-form"}
						onClick={handlePrimaryAction}
						className='bg-custom cursor-pointer'
					>
						{type === "quiz" ? "Open Quiz Editor" : edit ? "Save Category" : "Create Category"}
					</Button>
					<Button type="button" onClick={hideModal} variant={"outline"} className='text-white border-muted cursor-pointer'>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
