import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface QuizNavBtnProps {
	disable: boolean;
	onClick: () => void;
	label: string;
	direction?: "next" | "prev";
	icon?: React.ReactNode;
}

export const QuizNavBtn = ({
	disable,
	onClick,
	label,
	direction,
}: QuizNavBtnProps) => {
	const nextButtonState = disable
		? {
				bg: "transparent",
				color: "#fff",
				cursor: "default",
				opacity: 0.5,
		  }
		: {
				bg: "var(--color-secondary-btn)",
				color: "var(--color-primary-btn)",
				cursor: "pointer",
				opacity: 1,
		  };

	return (
		<motion.button
			style={{
				background: nextButtonState.bg,
				color: nextButtonState.color,
				cursor: nextButtonState.cursor,
				opacity: nextButtonState.opacity,
			}}
			whileHover={
				!disable
					? {
							scale: 1.1,
							background: "var(--color-primary-btn)",
							color: "var(--color-secondary-btn)",
					  }
					: undefined
			}
			whileTap={
				!disable
					? {
							scale: 0.8,
							background: "var(--color-primary-btn)",
							color: "var(--color-secondary-btn)",
					  }
					: undefined
			}
			transition={{
				duration: 0.5,
			}}
			onClick={onClick}
			className={`flex rounded-full cursor-pointer text-sm  items-center gap-1 px-4 py-2`}
		>
			{direction === "prev" ? (
				<>
					<ArrowLeft size={20} />
					{label}
				</>
			) : (
				<>
					{label}
					<ArrowRight size={20} />
				</>
			)}
		</motion.button>
	);
};
