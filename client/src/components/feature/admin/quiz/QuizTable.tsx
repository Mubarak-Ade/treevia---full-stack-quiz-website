import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Table } from 'lucide-react';

interface TableProps<T> {
	columns: ColumnDef<T>[];
	data: T[];
}

export const ReusableTable = <T,>({ columns, data }: TableProps<T>) => {
	const tableColumns: ColumnDef<T>[] = [...columns];
	const table = useReactTable<T>({
		data: data ?? [],
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});


	return (
		<div className="w-full  space-y-4">
			<div className="bg-card rounded-xl shadow-lg overflow-hidden border border-secondary-btn/20">
				<Table className="max-w-5xl w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								className="bg-background border-b border-secondary-btn/30 hover:bg-secondary-btn/30"
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
	)
}
