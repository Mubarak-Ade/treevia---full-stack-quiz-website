import BreadCrumbs from "@/component/BreadCrumbs";
import { QuizCard } from "@/component/quizlist/QuizCard";
import {
	useFetchQuizzes
} from "@/features/queries/useQuiz";
import { Leaf } from "lucide-react";
import { useParams } from "react-router";
import type { CategoryWithQuizzes } from "../../models/Quiz";

export const QuizList = () => {
	const { slug } = useParams();
	const { data, isLoading } = useFetchQuizzes(slug as string);

	if (isLoading || !data) {
		return <p>loading...</p>;
	}

	const {
		category,
		description,
		tags,
		quizzes,
	} = data as CategoryWithQuizzes;

	console.log(data);

	return (
		<div className="p-5 max-w-5xl w-full m-auto">
			<BreadCrumbs />
			<div className="flex items-center gap-2">
				<span className="text-custom p-2 bg-primary-btn/20 rounded-full">
					<Leaf />
				</span>
				<span className="text-xs font-bold text-custom">CATEGORY</span>
			</div>
			<div className="border-b pb-6 border-muted">
				<div className="mt-4 space-y-4">
					<h1 className="md:text-5xl text-3xl text-custom font-bold">
						{category}
					</h1>
					<p className="w-3/4 text-secondary">
						{description}
					</p>
					<ul className="flex flex-wrap gap-4">
						{tags.map((tag, index) => (
							<li key={index} className="px-4 py-2 first:bg-custom first:text-card bg-card font-montserrat rounded-full text-xs text-secondary capitalize font-semibold">
								{tag.name}
							</li>
						))}
					</ul>
				</div>
				<div className=""></div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-10">
				{quizzes?.map((q) => (
					<QuizCard
						_id={q._id}
						questionCount={q.questionCount}
						title={q.title}
						difficulty={q.difficulty}
						timeLimit={q.timeLimit}
						description={q.description}
					/>
				))}
			</div>
		</div>
	);
};
