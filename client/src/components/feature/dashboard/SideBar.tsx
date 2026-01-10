import Logo from "@/assets/logos.png";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Links } from "@/models/Dashboard";
import useAuthStore from "@/features/auth/store";
import { LogOut } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const SideBarBtn = ({
	label,
	icon,
	link,
}: {
	label: string;
	icon: React.ReactNode;
	link: string;
}) => {
	const user = useAuthStore(s => s.user)
	return (
		<motion.div
			whileHover={{
				backgroundColor: "#00ff6d33",
				color: "#00ff6d",
			}}
			whileTap={{
				scale: 0.8,
			}}
			className="rounded-full text-secondary"
		>
			<SidebarMenuItem className="px-4 py-2">
				<SidebarMenuButton>
					<Link
						to={`${user?.role === "admin" ? "admin" : "dashboard"}/${link}`}
						className="flex gap-2 text-sm font-poppins items-center"
					>
						{icon} {label}
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</motion.div>
	);
};

export const SideBar = ({ links }: { links: Links[] }) => {
	const logout = useAuthStore((s) => s.logOut);

	return (
		<>
			<Sidebar>
				<SidebarHeader className="flex flex-row gap-3 p-5 items-center border-b border-muted">
					<div className="size-14 rounded-full flex items-center justify-center shadow-lg ring-2 ring-custom">
						<img
							src={Logo}
							alt="Treevia Logo"
							className=""
						/>
					</div>
					<Link
						to="/"
						className="flex flex-col"
					>
						<h1 className="text-3xl text-white font-bold tracking-tight">
							Treevia
						</h1>
						<h6 className="text-sm text-custom font-medium">
							Grow Your Knowledge
						</h6>
					</Link>
				</SidebarHeader>
				<SidebarContent className="px-3 py-4">
					<SidebarMenu className="space-y-2">
						{links.map((link) => (
							<SideBarBtn
								label={link.label}
								icon={link.icon}
								link={link.link}
							/>
						))}
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter>
					<motion.button
						whileHover={{
							backgroundColor: "#00ff6d33",
							color: "#00ff6d",
						}}
						whileTap={{
							scale: 0.8,
						}}
						onClick={logout}
						className="flex items-center gap-4 px-5 py-2.5 rounded-md text-secondary font-medium cursor-pointer"
					>
						<LogOut />
						Logout
					</motion.button>
				</SidebarFooter>
			</Sidebar>
		</>
	);
};
