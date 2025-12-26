import Logo from "@/assets/logos.png";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Grid2X2Icon } from "lucide-react";
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
						to={link}
						className="flex gap-2 text-lg font-poppins items-center"
					>
						{icon} {label}
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</motion.div>
	);
};

export const SideBar = () => {
	return (
		<>
			<Sidebar>
				<SidebarHeader className="flex flex-row gap-3 p-5 items-center border-b border-muted">
					<div className="size-14 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-custom">
						<img
							src={Logo}
							alt="Treevia Logo"
							className=""
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-3xl text-white font-bold tracking-tight">
							Treevia
						</h1>
						<h6 className="text-sm text-custom font-medium">
							Grow Your Knowledge
						</h6>
					</div>
				</SidebarHeader>
				<SidebarContent className="px-3 py-4">
					<SidebarMenu className="space-y-2">
						<SideBarBtn
							label="Dashboard"
							icon={<Grid2X2Icon />}
							link="/dashboard"
						/>
					</SidebarMenu>
				</SidebarContent>
			</Sidebar>
		</>
	);
};
