import { DashboardHeader } from "@/components/feature/share/DashboardHeader";
import { User, UsersRoundIcon } from "lucide-react";
import { Card } from "../../components/feature/admin/users/Card";

export const UserManagement = () => {
	return (
		<div className="p-5">
			<DashboardHeader
				title="User Management"
				subtitle="Manage user accounts, roles, and platform access"
				buttonName="Add New User"
				buttonIcon={<User />}
			/>
			<div className="mt-5 flex items-center gap-5">
				<Card title="Total Users" value={2000} icon={<UsersRoundIcon size={30} />} />
				<Card title="Total Users" value={2000} icon={<UsersRoundIcon size={30} />} />
				<Card title="Total Users" value={2000} icon={<UsersRoundIcon size={30} />} />
				<Card title="Total Users" value={2000} icon={<UsersRoundIcon size={30} />} />
			</div>
		</div>
	);
};
