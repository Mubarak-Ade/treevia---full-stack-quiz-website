import { User } from "@/models/Auth";
import { DoorOpen, Grid2x2, User2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";

interface MenuProps {
    display: boolean
    user?: User | null,
    logout: () => void
}

export const ProfileMenu = ({display, user, logout} : MenuProps) => {
	return (
		<AnimatePresence>
			{display && (
				<motion.div
					// onMouseOut={() => }
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: -20 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					layout
					className="fixed bg-card shadow-2xl text-white w-60 m-2 p-5 top-20 z-100 right-0 rounded-xl"
				>
					<h4 className="capitalize text-sm text-custom">
						{user?.username}
					</h4>
					<h6 className="text-xs font-light text-secondary mt-1">
						{user?.email}
					</h6>
					<ul className="mt-4 space-y-2">
						<motion.li
							whileTap={{ scale: 0.9 }}
							whileHover={{
								backgroundColor: "var(--color-secondary-btn)",
							}}
							className="text-custom px-4 py-2 items-center rounded-xl cursor-pointer"
						>
							<Link
								to="/dashboard/me"
								className="flex gap-2 items-center"
							>
								<User2 /> Edit Profile
							</Link>
						</motion.li>
						<motion.li
							whileTap={{ scale: 0.9 }}
							whileHover={{
								backgroundColor: "var(--color-secondary-btn)",
							}}
							className="text-custom px-4 py-2 items-center rounded-xl cursor-pointer"
						>
							<Link
								to={
									user?.role === "admin"
										? "admin/overview"
										: "dashboard/overview"
								}
								className="flex gap-2 items-center"
							>
								<Grid2x2 /> Dashboard
							</Link>
						</motion.li>
					</ul>
					<hr className="mt-4 border-muted " />
					<motion.button
						whileTap={{ scale: 0.9 }}
						whileHover={{
							backgroundColor: "var(--color-secondary-btn)",
						}}
						className="text-custom flex items-center gap-2 font-semibold text-sm rounded-xl w-full px-4 py-2 mt-2 cursor-pointer"
						onClick={logout}
					>
						<DoorOpen />
						Logout
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
