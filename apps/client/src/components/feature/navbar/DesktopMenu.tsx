import { Link } from "@/types";
import { LinkVariant } from "@/utils/Animation/variant/IntroAnimationVariant";
import { motion } from "motion/react";
import { NavLink } from "react-router";

export const DesktopMenu = ({ links }: { links: Link[] }) => {
	return (
		<ul className="flex items-center justify-center gap-2 text-sm">
				{links.map((item, index) => (
					<motion.span
						key={index}
						className="text-brand font-medium  px-1 py-1 w-full rounded-full cursor-pointer"
						variants={LinkVariant}
						whileHover="hover"
						whileTap="tap"
					>
						<NavLink
							className={({ isActive }) =>
								isActive
									? "bg-brand-active text-on-brand px-5 py-2 rounded-full inline-flex"
									: "px-5 py-2 inline-flex "
							}
							to={`${item.link.toLowerCase()}`}
						>
							{item.name}
						</NavLink>
					</motion.span>
				))}
		</ul>
	);
};
