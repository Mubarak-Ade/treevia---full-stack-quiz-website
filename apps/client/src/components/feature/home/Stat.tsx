import { motion } from "framer-motion";
import { LucideIcon, LucideScanFace } from "lucide-react";
import { HoverVariant } from "../../../utils/Animation/variant/HoverVariant";

interface Props {
	title: string;
	numbers: number;
	Icon: LucideIcon;
	suffix?: string;
	tone?: "mint" | "lavender" | "sun";
}

const toneMap = {
	mint: "bg-[#c9f0e4] text-primary",
	lavender: "bg-[#d9ddff] text-secondary",
	sun: "bg-[#f5e8b2] text-tertiary",
};

const Stat = ({
	title = "Title",
	numbers = 500000,
	suffix = "+",
}: Props) => {
	return (
		<motion.div
			whileHover="hover"
			variants={HoverVariant}
			transition={{
				duration: .2,
			}}
			className="bg-brand-subtle rounded-4xl px-5 py-10 shadow-[0_24px_55px_-38px_var(--shadow-color)] backdrop-blur-sm max-w-sm w-full"
		>
			<div className="flex justify-center items-center gap-4">
				<div className="text-left">
					<h1 className="text-4xl font-bold font-display text-brand">
						{numbers}
						{suffix}
					</h1>
					<h2 className="font-poppins mt-1 text-sm dark:text-tertiary text-primary">{title}</h2>
				</div>
			</div>
		</motion.div>
	);
};

export default Stat;
