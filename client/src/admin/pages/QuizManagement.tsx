import { DashboardHeader } from "@/component/share/DashboardHeader";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export const QuizManagement = () => {
	const tableData = [
		{
			id: 1,
			title: "title",
			category: "",
			totalQuestion: 1,
			date: 4,
			action: "",
		},
		{
			id: 1,
			title: "title",
			category: "",
			totalQuestion: 1,
			date: 4,
			action: "",
		},
		{
			id: 1,
			title: "title",
			category: "",
			totalQuestion: 1,
			date: 4,
			action: "",
		},
	];

	// const thead = Object.keys(tableData?.at(0))

	// console.table(thead)
	return (
		<div className="p-5">
			<DashboardHeader
				title="Quiz Management"
				subtitle="Manage,create, edit trivia quizzes "
				buttonIcon={<Plus />}
				buttonName="Add New Quiz"
			/>
			<div className="p-5">
				<Table
					style={{
						padding: "120px",
					}}
					className="w-full max-w-4xl bg-card border border-muted rounded-xl overflow-hidden m-auto"
				>
					<TableHeader className="bg-background p-5">
						<TableRow className="">
							{/* {thead.map(head => (
								<TableHead>{head}</TableHead>
							))} */}
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableData.map((table) => (
							<TableRow>
								<TableCell>{table.id}</TableCell>
								<TableCell>{table.title}</TableCell>
								<TableCell>{table.category}</TableCell>
								<TableCell>{table.totalQuestion}</TableCell>
								<TableCell>{table.action}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
