import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useFetchResult } from "@/features/queries/useResult";
import { GetResult } from "@/models/Quiz";
import { getColorFromString, getScoreColor } from "@/utils/colorFormat";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { Loader } from "../Loader";

const columns: ColumnDef<GetResult>[] = [
	{
		header: "Quiz Name",
		cell: ({ row }) => {
			const color = getColorFromString(row.original.quiz);
			return (
				<div className="flex items-center gap-4">
					<span
						className={`${color.text} ${color.gradient} px-4 py-3 rounded-full`}
					>
						{row.original.quiz.charAt(0)}
					</span>
					<p>{row.original.quiz || "N/A"}</p>
				</div>
			);
		},
	},
	{
		accessorFn: (row) => row.quiz || "N/A",
		header: "Category",
	},
	{
		accessorFn: (row) => format(row.createdAt, "PP") || "N/A",
		header: "Date",
	},
	{
		accessorKey: "score",
		header: "Score",
		cell: ({ row }) => {
			const color = getScoreColor(row.original.score);
			return (
				<span className={`${color} px-2 py-1 text-xs rounded-full`}>
					{row.original.score} / 10
				</span>
			);
		},
	},
	{
		id: "action",
		header: "Action",
		cell: ({ row }) => {
			const navigate = useNavigate()
			const handleClick = () => {
				// Implement refresh logic here
				navigate(`/quizzes/${row.original.quiz._id}/questions`)

			}
			return (
				<Button
					size={"icon"}
					variant={"ghost"}
					className="cursor-pointer"
					onClick={handleClick}
				>
					<RefreshCcw />
				</Button>
			);
		},
	},
];

export const DashboardTable = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useFetchResult();

	if (isLoading) {
		return <Loader loading={isLoading} />
	}

	const tableColumns: ColumnDef<GetResult>[] = [
		...columns.slice(0, -1),
		{
			id: "action",
			header: "Action",
			cell: ({ row }) => {
				const handleClick = () => {
					navigate(`/quizzes/${row.original.quiz._id}/questions`);
				};
				return (
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer"
						onClick={handleClick}
					>
						<RefreshCcw />
					</Button>
				);
			},
		},
	];

	const table = useReactTable({
		data: data ?? [],
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});
	
	if (isLoading || !data) {
		return <Loader loading={isLoading} />
	}

	console.log(data);

	return (
		<div className="w-full space-y-4">
			<div className="bg-card rounded-xl shadow-lg overflow-hidden border border-secondary-btn/20">
				<Table className="max-w-5xl w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								className="bg-secondary-btn/30 border-b border-secondary-btn/30 hover:bg-secondary-btn/30"
								key={headerGroup.id}
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="px-6 py-4 text-primary-btn font-semibold text-xs uppercase tracking-wide"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="border-b border-secondary-btn/10 hover:bg-secondary-btn/20 transition-colors duration-200"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-6 py-4 text-secondary"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="text-center py-10 text-secondary/60"
								>
									No results found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center justify-between px-4">
				<div className="text-sm text-secondary/80">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-btn/30 text-secondary hover:bg-secondary-btn/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<ChevronLeft size={16} />
						Previous
					</button>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-btn/30 text-secondary hover:bg-secondary-btn/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Next
						<ChevronRight size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};
