import { SidebarProvider } from "@/components/ui/sidebar";
import { Links } from "@/models/Dashboard";
import { Grid2X2, Settings, Trophy, User } from "lucide-react";
import type { CSSProperties } from "react";
import { Outlet } from "react-router";
import { SideBar } from "../feature/dashboard/SideBar";

export const DashboardLayout = () => {
	const links: Links[] = [
		{
			label: "Dashboard",
			link: "overview",
			icon: <Grid2X2 />
		},
		{
			label: "Profile",
			link: "me",
			icon: <User />
		},
		{
			label: "Leaderboard",
			link: "overview",
			icon: <Trophy />
		},
		{
			label: "Setting",
			link: "overview",
			icon: <Settings />
		}
	];

	return (
		<SidebarProvider
			style={{ ["--sidebar-width"]: "18rem" } as CSSProperties}
		>
			<SideBar links={links} />
			<main className="bg-surface overflow-hidden w-full min-h-screen">
				<Outlet />
			</main>
		</SidebarProvider>
	);
};
