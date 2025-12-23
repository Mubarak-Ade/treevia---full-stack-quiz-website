import { Category } from "@/models/Quiz";
import { useQuizStore } from "@/stores/useQuizStore";
import { getColorFromString } from "@/utils/colorFormat";
import { motion } from "motion/react";
import { useNavigate } from "react-router";



export const CategoriesCard: React.FC<Category> = ({slug, name, tags, description, quizCount }: Category) => {

	const navigate = useNavigate()

	const setFilter = useQuizStore(s => s.setFilter)


	const handleCategoryClick = () => {
		setFilter(slug)
		navigate(`/quizzes/${slug}`)
	}

	const color = getColorFromString(name)
	return (
		<motion.div
			whileTap={{
				scale: 0.8,
			}}
			whileHover={{
				scale: 1.1,
				boxShadow: "1px 0 10px 5px var(--color-secondary-bg)",
			}}
			onClick={handleCategoryClick}
			className="max-w-3xs border border-custom/50 w-full cursor-pointer rounded-4xl overflow-hidden bg-card"
		>
			<div className={`h-30 relative ${color.bg}`}>
				<span className="text-xs bg-secondary-btn/20  px-2 py-1 absolute right-0 m-3 text-secondary rounded-full">
					{quizCount} quizzes
				</span>
				<span
					className={`bg-background ${color.text} absolute bottom-0 border m-4 rounded-full  size-10 flex items-center justify-center font-bold text-xl text-center`}
				>
					{name.charAt(0)}
				</span>
			</div>
			<div className="p-4">
				<h4 className="font-bold text-lg line-clamp-1 text-white">{name}</h4>
				<p className="text-sm line-clamp-2 text-secondary-btn">{description}</p>
			</div>
			<div className="p-4 border-t flex items-center gap-2 text-secondary/50 border-muted">
				<h6 className="font-bold text-sm">Popular: </h6>
				<ul className="flex flex-wrap items-center gap-2">
					{tags.slice(0,2).map((tag, index) => (
						<li key={index} className="bg-muted px-3 py-0.5 rounded-md text-[10px]">
							{tag.name}
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	);
};
