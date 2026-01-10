import { ReusableTable as CategoryTable } from "@/components/feature/admin/quiz/QuizTable";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { DashboardHeader } from "@/components/feature/share/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/features/admin/category/hooks";
import { useFetchCategories } from '@/features/quiz/hooks';
import { useQuizStore } from '@/features/quiz/store';
import { Category } from '@/features/quiz/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, PenBox, Plus, Trash2 } from 'lucide-react';

const columns: ColumnDef<Category>[] = [
	{
		header: "Category Name",
		accessorFn: (row) => row.name || "N/A"
	},
	{
		header: "Description",
		accessorFn: (row) => row.description || "N/A"
	},
	{
		header: "Last Updated",
		accessorFn: (row) => {
			if (!row.updatedAt) return "N/A"
			const date = new Date(row.updatedAt)
			return isNaN(date.getTime()) ? "N/A" : format(date, "PPpp") 
		}
	},
	{
		header: "Quiz Count",
		accessorFn: (row) => `${row?.quizCount} Quizzes` || "N/A"
	},
	{
		id: "action",
		header: "Action",
		cell: ({ row }) => {
			const id = row.original._id
			console.log(id)
			const {showCategoryModal, setEdit} = useQuizStore()
			const deleteCategory = useDeleteCategory()

			const handleEdit = () => {
				showCategoryModal()
				setEdit(row.original)
			}
			return (
				<div className="">
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-red-500"
						onClick={() => deleteCategory.mutate(id!)}
					>
						<Trash2 />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-blue-500"
						onClick={handleEdit}
					>
						<PenBox />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-green-500"
					// onClick={handleClick}
					>
						<Eye />
					</Button>
				</div>
			);
		},
	},
];

export const CategoryManagement = () => {
	const { data, isLoading } = useFetchCategories()
	const showModal = useQuizStore(s => s.showCategoryModal)
	if (isLoading || !data) {
		return <QuizLoader loading={isLoading} />
	}

	console.log(data)
	return (
		<div className="p-5">
			<DashboardHeader title='Category Management' subtitle='Manage, organize, and update your quiz categories' buttonName='Add New Category' buttonIcon={<Plus />} onClick={showModal} />
			<div className="p-5">
				<CategoryTable columns={columns} data={data} />
			</div>
		</div>
	)
}
