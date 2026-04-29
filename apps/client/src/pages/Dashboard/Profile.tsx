import { ProfileCard } from "@/components/feature/profile/ProfileCard";
import { ProfileHeader } from "@/components/feature/profile/ProfileHeader";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { User } from "@/modules/auth/types/auth.types";
import { Stats } from "@/modules/quiz/types/quiz.types";
import { useFetchResult, useFetchUserStats } from "@/modules/result/controllers/result.controller";
import { useFetchUser } from "@/modules/user/controllers/user.controller";
import { AlertTriangleIcon, ChartColumn, Globe, ThumbsUp, Trophy } from "lucide-react";
import { Link } from "react-router";

export const Profile = () => {
	const userStats = useFetchUserStats()
	const result = useFetchResult();

	const {data: userData} = useFetchUser()

	const isLoading = userStats.isLoading || userData === undefined || result.isLoading
	const exist = userStats.data || userData || result.data

	if (isLoading || !exist) {
		<QuizLoader loading={isLoading} />
	}

	const stats = userStats?.data?.data as Stats
	const { username, profile: profilePic } = userData?.data as User ?? {}

	const { totalXp, quizzesTaken, totalCorrect, totalFailed, level, xp } = stats ?? {}

	const attempts = result.data?.data

	console.log(userData);


	return (
		<div className="max-w-4xl w-full m-auto p-6">
			<ProfileHeader username={username} profile={profilePic} level={level} nextXp={xp.total} totalXp={totalXp} />
			<div className="mt-5 grid grid-cols-4 gap-4 justify-between">
				<ProfileCard
					icon={
						<Trophy
							size={30}
							color="var(--color-green-600)"
						/>
					}
					title="Quizzes Taken"
					value={quizzesTaken}
				/>
				<ProfileCard
					icon={
						<ThumbsUp
							size={30}
							color="var(--color-blue-600)"
						/>
					}
					title="Total Correct "
					value={totalCorrect}
				/>
				<ProfileCard
					icon={
						<AlertTriangleIcon
							size={30}
							color="var(--color-red-600)"
						/>
					}
					title="Total Failed "
					value={totalFailed}
				/>
				<ProfileCard
					icon={
						<ChartColumn
							size={30}
							color="var(--color-yellow-600)"
						/>
					}
					title="Accuracy"
					value={`${Math.round(stats.accuracy)}%`}
				/>
			</div>
			<div className="mt-2 p-2">
				<div className="flex items-center justify-between">
					<h4 className="text-white text-xl font-bold">
						Recent Activity
					</h4>
					<Link
						className="text-sm text-custom "
						to="#"
					>
						View More
					</Link>
				</div>
				<ul className="space-y-4 py-2">
					{attempts?.slice(0, 5)?.map((result) => (
						<li key={result._id} className="flex gap-4 bg-surface-alt p-4 rounded-xl items-center">
							<span className="bg-surface text-primary rounded-xl border p-2">
								<Globe size={30} />
							</span>
							<div className="flex-1">
								<h2 className="text-white text-xl font-bold">{result.quiz}</h2>
								<h4 className="text-secondary text-sm font-semibold">{result.category}</h4>
							</div>
							<div className="">
								<h4 className="text-xl font-bold text-white">{result.xpEarned}</h4>
								<h6 className="text-brand font-bold">+{result.xpEarned}</h6>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
