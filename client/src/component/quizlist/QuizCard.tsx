import React from "react";
import { motion } from "motion/react";
import { getColorFromString } from "@/utils/colorFormat";
import { Clock, ListOrdered, Play } from "lucide-react";
import { Quiz, QuizWithCategory } from "@/models/Quiz";
import { Link } from "react-router";
// import { Quiz } from "@/types";

export const QuizCard = ({
	title,
	description,
	timeLimit,
	difficulty,
	id,
	questionCount,
}: Quiz) => {
	const color = getColorFromString(title);

	return (
		<Link to={`/quizzes/${id}/questions`}>

		<motion.div className=" border border-custom/50 w-full cursor-pointer rounded-4xl overflow-hidden bg-card">
			<div className={`h-30 relative ${color.bg}`}>
				<span className="text-xs bg-secondary-btn/20  px-2 py-1 absolute right-0 m-3 text-secondary rounded-full">
					{difficulty}
				</span>
				<span
					className={`bg-background ${color.text} absolute bottom-0 border m-4 rounded-full  size-10 flex items-center justify-center font-bold text-xl text-center`}
				>
					{title.charAt(0)}
				</span>
			</div>
			<div className="p-5">
				<h4 className="font-bold text-lg line-clamp-1 text-white">
					{title}
				</h4>
				<p className="text-sm mt-4 text-secondary line-clamp-2">
					{description}
				</p>
				<div className="flex items-center gap-5 mt-10 text-secondary font-semibold">
					<div className="flex items-center gap-1">
						<ListOrdered size={15} />
						<span className="text-xs">
							{questionCount} Questions
						</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock size={15} />
						<span className="text-xs">{timeLimit}s</span>
					</div>
				</div>
				<motion.button
					whileTap={{
						scale: 0.8,
					}}
					whileHover={{
						scale: 1.1,
						background: "var(--color-custom)",
						color: "var(--color-background)",
					}}
					className="flex items-center w-full px-4 cursor-pointer py-2 bg-secondary-btn rounded-full mt-5 text-sm text-center text-white justify-center gap-2"
				>
					Start Quiz <Play size={15} />
				</motion.button>
			</div>
			{/* <div className="p-4 border-t flex items-center gap-2 text-secondary/50 border-muted">
				<h6 className="font-bold text-sm">Popular: </h6>
				<ul className="flex items-center gap-2">
					{tags.map((tag, index) => (
						<li className="bg-muted px-3 py-0.5 rounded-md text-xs">
							{tag}
						</li>
					))}
				</ul>
			</div> */}
		</motion.div>
		</Link>
	);
};
