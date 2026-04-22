import { DashboardHeader } from "@/components/feature/share/DashboardHeader";
import { User, UsersRoundIcon, CheckCircle, Clock, Ban } from "lucide-react";
import { Card } from "../../components/feature/admin/users/Card";
import { useFetchUsers, useDeleteUser } from "@/modules/admin/user/controllers/admin-user.controller";
import { ColumnDef } from "@tanstack/react-table";
import { AdminUser } from "@/modules/admin/user/services/admin-user.service";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { UsersTable } from "@/components/feature/admin/users/UsersTable";
import { useNotification } from "@/context/NotificationProvider";
import { ReusableTable } from "@/components/feature/admin/quiz/QuizTable";

const columns: ColumnDef<AdminUser>[] = [
	{
		header: "USER",
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className="flex items-center gap-3">
					{user.profilePic ? (
						<img src={user.profilePic} alt={user.username} className="w-8 h-8 rounded-full" />
					) : (
						<div className="w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
							{user.username.charAt(0).toUpperCase()}
						</div>
					)}
					<div>
						<p className="font-semibold text-white">{user.username}</p>
						<p className="text-xs text-secondary">{user.email}</p>
					</div>
				</div>
			);
		},
	},
	{
		header: "ROLE",
		cell: ({ row }) => {
			const role = row.original.role;
			const roleConfig: Record<string, { label: string; color: string }> = {
				admin: { label: "ADMIN", color: "bg-red-500/20 text-red-400" },
				moderator: { label: "MODERATOR", color: "bg-blue-500/20 text-blue-400" },
				user: { label: "USER", color: "bg-purple-500/20 text-purple-400" },
			};
			const config = roleConfig[role] || { label: role.toUpperCase(), color: "bg-gray-500/20 text-gray-400" };
			return (
				<span className={`px-3 py-1 rounded text-xs font-semibold ${config.color}`}>
					{config.label}
				</span>
			);
		},
	},
	{
		header: "STATUS",
		cell: ({ row }) => {
			const isOnline = row.original.isOnline;
			return (
				<div className="flex items-center gap-2">
					<span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-yellow-500"}`}></span>
					<span className="text-xs text-secondary">{isOnline ? "Active" : "Pending"}</span>
				</div>
			);
		},
	},
	{
		header: "JOINED DATE",
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return <span className="text-sm text-secondary">{format(date, "MMM dd, yyyy")}</span>;
		},
	},
	{
		id: "action",
		header: "ACTIONS",
		cell: ({ row }) => {
			const deleteUserMutation = useDeleteUser();
			const { showNotification } = useNotification();

			const handleDelete = () => {
				deleteUserMutation.mutate(row.original._id, {
					onSuccess: () => {
						showNotification("success", "User deleted successfully");
					},
					onError: (error: any) => {
						showNotification("error", error.message);
					},
				});
			};

			return (
				<div className="flex gap-2">
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-blue-500 hover:bg-blue-500/20"
					>
						<Edit2 size={16} />
					</Button>
					<Button
						size={"icon"}
						variant={"ghost"}
						className="cursor-pointer text-red-500 hover:bg-red-500/20"
						onClick={handleDelete}
						disabled={deleteUserMutation.isPending}
					>
						<Trash2 size={16} />
					</Button>
				</div>
			);
		},
	},
];

export const UserManagement = () => {
	const { data, isLoading } = useFetchUsers();

	const stats = [
		{
			title: "TOTAL USERS",
			value: data?.total || 0,
			icon: <UsersRoundIcon size={30} />,
		},
		{
			title: "ACTIVE ROLES",
			value: 42,
			icon: <CheckCircle size={30} />,
		},
		{
			title: "PENDING APPROVAL",
			value: 14,
			icon: <Clock size={30} />,
		},
		{
			title: "BANNED ENTITIES",
			value: 3,
			icon: <Ban size={30} />,
		},
	];

	return (
		<div className="p-5">
			<DashboardHeader
				title="User Management"
				subtitle="View, edit, or manage roles and permissions for the Forest Matrix platform. Monitor global activity across the digital arboretum."
				buttonName="Add New User"
				buttonIcon={<User />}
			/>

			{/* Stats Cards */}
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat, index) => (
					<Card key={index} title={stat.title} value={stat.value} icon={stat.icon} />
				))}
			</div>

			{/* Users Table */}
			<div className="mt-8">
				{isLoading ? (
					<div className="flex items-center justify-center py-10">
						<p className="text-secondary">Loading users...</p>
					</div>
				) : (
					<ReusableTable columns={columns} data={data?.users || []} />
				)}
			</div>
		</div>
	);
};
