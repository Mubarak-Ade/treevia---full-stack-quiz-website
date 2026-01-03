import { Loader } from "@/component/Loader";
import { ProfileCard } from "@/component/profile/ProfileCard";
import { ProfileHeader } from "@/component/profile/ProfileHeader";
import { useFetchResult, useFetchUserStats } from "@/features/queries/useResult";
import { useFetchUser } from "@/features/queries/useUser";
import { User } from "@/models/Auth";
import { Stats } from "@/models/Quiz";
import { AlertTriangleIcon, ChartColumn, Globe, ThumbsUp, Trophy } from "lucide-react";
import { Link } from "react-router";

export const Profile = () => {
	const userStats = useFetchUserStats()
	const result = useFetchResult();
	
	const user = useFetchUser()

	const isLoading = userStats.isLoading || user.isLoading || result.isLoading
	const exist = userStats.data || user.data || result.data

	if (isLoading || !exist) {
		<Loader loading={isLoading} />
	}

	const {stats, progress} = userStats?.data as Stats
	const {username, profilePic: profile} = user?.data as User

	const {totalXp, quizzesTaken, totalCorrect, totalFailed} = stats ?? {}
	
	console.log(stats);
	
	const accuracy = Math.round(
		(totalCorrect / quizzesTaken) * 10
	);


	return (
		<div className="max-w-4xl w-full m-auto p-6">
			<ProfileHeader username={username} profile={profile} level={progress?.level} nextXp={progress?.nextTotalXp} totalXp={totalXp} />
			<div className="mt-5 flex gap-4 justify-between">
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
					value={accuracy}
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
					{result?.data?.slice(0, 5)?.map((result) => (
						<li key={result._id} className="flex gap-4 bg-card p-4 rounded-xl items-center">
							<span className="bg-background text-primary rounded-xl border p-2">
								<Globe size={30} />
							</span>
							<div className="flex-1">
								<h2 className="text-white text-xl font-bold">World Capital Challenge</h2>
								<h4 className="text-primary text-sm font-semibold">{result.quiz}</h4>
							</div>
							<div className="">
								<h4 className="text-xl font-bold text-white">{result.score * result.xpEarned}</h4>
								<h6 className="text-custom font-bold">+{result.xpEarned}</h6>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
