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
				bg: "var(--color-brand-subtle)",
				color: "var(--color-on-brand)",
				cursor: "default",
				opacity: 0.5,
				border: "none"
		  }
		: {
				bg: "var(--color-brand)",
				color: "var(--color-on-brand)",
				cursor: "pointer",
				opacity: 1,
				border: "1px solid var(--color-default)",
		  };

	return (
		<motion.button
			style={{
				background: nextButtonState.bg,
				color: nextButtonState.color,
				cursor: nextButtonState.cursor,
				opacity: nextButtonState.opacity,
				border: nextButtonState.border,
			}}
			whileHover={
				!disable
					? {
							scale: 1.1,
							background: "var(--color-brand-hover)",
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
