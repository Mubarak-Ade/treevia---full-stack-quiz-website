import { DashboardCard } from "@/component/dashboard/DashboardCard";
import { DashboardProfileCard } from "@/component/dashboard/DashboardProfileCard";
import { DashboardTable } from "@/component/dashboard/DashboardTable";
import { Loader } from "@/component/Loader";
import { QuizCard } from "@/component/quizlist/QuizCard";
import { useFetchRandomQuiz } from "@/features/queries/useQuiz";
import { useFetchUserStats } from "@/features/queries/useResult";
import { Stats } from "@/models/Quiz";
import useAuthStore from "@/stores/useAuthStore";
import { Droplet, History, Leaf, Shuffle, ThumbsUp, Trees } from "lucide-react";

export const Overview = () => {
	const user = useAuthStore((s) => s.user);
	const userStats = useFetchUserStats();
	const quiz = useFetchRandomQuiz();

	if (userStats.isLoading || quiz.isLoading) {
		return <Loader loading={userStats.isLoading} />;
	}

	const { stats, progress } = userStats.data as Stats;

	console.log(userStats.data);
	

	const accuracy = Math.round(
		(stats?.totalCorrect * stats?.totalFailed) / stats?.quizzesTaken
	);

	// const xpToNextLevel = progress?.nextXp + progress?.xpIntoLevel

	const progressBar = (stats?.totalXp / progress?.nextTotalXp) * 100;

	return (
		<div className="py-5 px-10">
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
						Welcome back, {user?.username}{" "}
						<Leaf color="var(--color-custom)" />
					</h1>
					<p className="text-secondary p-1">
						Ready to plant some more trees today?
					</p>
				</div>
				<button className="flex gap-2 bg-custom px-4 py-3 rounded-full shadow-[0_0_10px] shadow-custom font-bold cursor-pointer items-center">
					<Shuffle /> Start Random Quiz
				</button>
			</div>
			<div className="mt-5 p-5 flex gap-5">
				<DashboardProfileCard
					progress={progressBar}
					tag={`Lvl ${progress?.level}`}
					progressInfo={`${stats?.totalXp} / ${progress?.nextTotalXp} XP`}
					extraInfo={`${progress?.nextTotalXp - stats?.totalXp} XP to next level`}
					name={user?.username}
					profile={user?.profile}
					subtitle={user?.email}
				/>
				<DashboardCard
					icon={<Trees />}
					title="Total Quiz Taken"
					value={stats?.quizzesTaken}
					id="total"
				/>
				<DashboardCard
					icon={<Droplet />}
					title="Accuracy"
					value={accuracy}
					id="accuracy"
				/>
			</div>
			<div className="">
				<h1 className="text-xl mt-4 p-4 text-white font-bold flex items-center gap-2">
					<ThumbsUp color="var(--color-custom)" /> Recommended For You
				</h1>
				<ul className="grid grid-cols-3 p-5 gap-10">
					{quiz.data.map((q) => (
						<QuizCard
							_id={q._id}
							title={q.title}
							difficulty={q.difficulty}
							timeLimit={q.timeLimit}
							key={q._id}
							questionCount={q.questionCount}
						/>
					))}
				</ul>
			</div>
			<div className="p-4">
				<h1 className="text-xl mb-4 text-white font-bold flex items-center gap-2">
					<History color="var(--color-custom)" /> Recent Harvest
				</h1>
				<DashboardTable />
			</div>
		</div>
	);
};
