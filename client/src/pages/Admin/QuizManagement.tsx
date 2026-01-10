import { QuizLoader } from "@/components/feature/QuizLoader";
import { DashboardHeader } from "@/components/feature/share/DashboardHeader";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/context/NotificationProvider";
import { useDeleteQuiz, useFetchQuizzes } from "@/features/admin/quiz/hooks";
import { useFetchQuestion } from "@/features/quiz/hooks";
import { useQuizStore } from "@/features/quiz/store";
import { Quiz } from "@/features/quiz/types";
import { getColorFromString } from "@/utils/colorFormat";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistance } from "date-fns";
import { Eye, PenBox, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ReusableTable as QuizTable } from "../../components/feature/admin/quiz/QuizTable";

const columns: ColumnDef<Quiz>[] = [
	{
		header: "Quiz Name",
		accessorFn: (row) => row.title || "N/A"
	},
	{
		header: "Category",
		cell: ({ row }) => {
			const category = row.original?.category?.name as string
			const color = getColorFromString(category);
			return (
				<h4
					className={`${color.text} ${color.gradient} px-2 py-1 w-fit rounded-full`}
				>
					<p>{category || "N/A"}</p>
				</h4>
			);
		},
	},
	{
		header: "Last Modified",
		accessorFn: (row) => format(row.updatedAt, "PPpp") || "N/A"
	},
	{
		header: "Questions",
		accessorFn: (row) => row.questionCount || 0
	},
	{
		id: "action",
		header: "Action",
		cell: ({ row }) => {
			const navigate = useNavigate()
			const deleteQuiz = useDeleteQuiz()
			const { setEdit } = useQuizStore()
			const questions = useFetchQuestion(row.original._id)

			if (deleteQuiz.isPending || questions.isLoading) {
				<QuizLoader loading />
			}

			const { showNotification } = useNotification()

			const id = row.original._id

			const handleEdit = () => {
				setEdit({...row.original, questions: questions.data})
				navigate("create")
			}
				
			const handleDelete = () => {
				deleteQuiz.mutate(id, {
					onSuccess: () => {
						showNotification("success", "Quiz Deleted Successfully")
					},
					onError: (error) => {
						showNotification("error", error.message)
					}
				})
			}
			return (
				<div className="">
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-red-500"
						onClick={handleDelete}
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

export const QuizManagement = () => {
	const { data, isLoading } = useFetchQuizzes()

	const navigate = useNavigate()

	if (isLoading || !data) {
		return <QuizLoader loading={isLoading} />
	}
	return (
		<div className="p-5">
			<DashboardHeader
				title="Quiz Management"
				subtitle="Manage,create, edit trivia quizzes "
				buttonIcon={<Plus />}
				onClick={() => navigate("create")}
				buttonName="Add New Quiz"
			/>
			<div className="p-5">
				<QuizTable columns={columns} data={data.quizzes} />
			</div>
		</div>
	);
};
