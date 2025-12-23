import { CategoriesCard } from "@/component/categories/CategoriesCard";
import { useFetchCategories } from "@/features/queries/useQuiz";
import { Category } from "@/models/Quiz";
import { Search } from "lucide-react";
import { motion } from "motion/react";

export const CategoryPage = () => {
    const {data, isLoading, isError} = useFetchCategories()

    if (isLoading) {
        return <p>loading ...</p>
    }

	if (isError || !data) {
		return <p>error loading categories</p>;
	}    
    
	return (
		<div className="max-w-5xl w-full p-5 m-auto">
			<div className="space-y-4">
				<h1 className="text-5xl text-white font-bold font-alata">
					Explore <span className="text-custom">Categories</span>
				</h1>
				<p className="text-secondary w-3/4 text-base">
					Choose from our diverse collection of quiz topics. From
					science, art, to tech, challenge yourself and expand your
					knowledge tree
				</p>
				<div className="bg-card flex text-secondary items-center relative overflow-hidden max-w-lg rounded-full w-full">
					<Search className="ml-4" />
					<input
						placeholder="Search for a topic"
						type="text"
						className="w-full px-4 py-3 outline-none h-full"
					/>
					<motion.button
						whileHover={{
							boxShadow: " 0 0 15px var(--color-custom)",
						}}
						whileTap={{
							scale: 0.9,
						}}
						className="px-6 py-2 m-2 bg-primary-btn cursor-pointer text-sm font-semibold rounded-full text-secondary-btn"
					>
						Search
					</motion.button>
				</div>
			</div>
			<ul className="mt-10 gap-5 grid grid-cols-3">
				{data.map((category : Category, index : number) => (
					<CategoriesCard key={index} name={category.name} quizCount={category.quizCount} slug={category.slug} description={category.description} tags={category.tags} />
				))}
			</ul>
		</div>
	);
};
