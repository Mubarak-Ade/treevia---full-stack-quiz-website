import { ReusableTable as CategoryTable } from "@/components/feature/admin/quiz/QuizTable";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { DashboardHeader } from "@/components/feature/share/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/modules/admin/category/controllers/admin-category.controller";
import { useFetchCategories } from '@/modules/quiz/controllers/quiz-api.controller';
import { useQuizStore } from '@/modules/quiz/store/quiz.store';
import { Category } from '@/modules/quiz/types/quiz.types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, PenBox, Plus, Trash2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

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
	const showModal = useQuizStore(s => s.showCategoryModal)
	const [searchTerm, setSearchTerm] = useState("");
	const { data, isLoading } = useFetchCategories({ searchTerm })

	const filteredCategories = useMemo(() => data || [], [data]);

	if (isLoading || !data) {
		return <QuizLoader loading={isLoading} />
	}

	const openCreateModal = () => {
		showModal()
	}

	return (
		<div className="p-5 space-y-6">
			<DashboardHeader
				title='Category Management'
				subtitle='Manage, organize, and update your quiz categories'
				buttonName='Add New Category'
				buttonIcon={<Plus />}
				onClick={openCreateModal}
			/>

			{/* Search Input Bar */}
			<div className="relative w-full max-w-md">
				<Search className="absolute left-3 top-4 text-secondary-btn w-4 h-4" />
				<input
					type="text"
					placeholder="Search categories by name or description..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-10 pr-4 py-3 bg-surface-alt border border-default rounded-lg text-primary placeholder-secondary-btn focus:outline-none focus:border-secondary-btn/60 transition-colors"
				/>
			</div>

			<div className="p-5 bg-surface rounded-xl shadow-lg border border-default">
				<CategoryTable columns={columns} data={filteredCategories} />
			</div>
		</div>
	)
}
