import { Link } from "@/types";
import { LinkVariant } from "@/utils/Animation/variant/IntroAnimationVariant";
import { motion } from "motion/react";
import { NavLink } from "react-router";

export const DesktopMenu = ({ links }: { links: Link[] }) => {
	return (
		<>
			<ul className="flex items-center justify-center gap-2 text-sm">
				{links.map((item, index) => (
					<motion.span
						key={index}
						className="text-white hover:text-primary px-4 py-3 transition-colors w-full rounded-full cursor-pointer"
						variants={LinkVariant}
						whileHover="hover"
						whileTap="tap"
					>
						<NavLink
							className={({ isActive }) =>
								`${
									isActive
										? "text-custom px-5 py-3 rounded-full"
										: ""
								}`
							}
							to={`${item.link.toLowerCase()}`}
						>
							{item.name}
						</NavLink>
					</motion.span>
				))}
			</ul>
		</>
	);
};
