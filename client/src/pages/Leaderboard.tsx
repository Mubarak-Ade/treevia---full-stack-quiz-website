import { Chart } from "@/component/leaderboard/Chart";
import { Loader } from "@/component/Loader";
import { ProfileAvatar } from "@/component/share/ProfileAvatar";
import { useFetchLeaderboard } from "@/features/queries/useResult";

export const Leaderboard = () => {
	const { data, isLoading } = useFetchLeaderboard();
	if (isLoading) {
		return <Loader loading={isLoading} />;
	}

	const maxValue = Math.max(...data?.leaderboard.map((d: any) => d.totalXp));

	console.log(maxValue);

	return (
		<div className="max-w-4xl m-auto p-5">
			<div className="">
				<h1 className="text-5xl text-white font-ubuntu">
					Global Leaderboard
				</h1>
				<h6 className="text-custom font-poppins m-1">
					Compete with the top minds in treevia
				</h6>
			</div>
			<div className="flex items-end justify-center gap-10 mt-10 h-125 overflow-hidden">
				{data.leaderboard.slice(0, 3).map((rank, index) => {
					const heightPercentage = (rank.totalXp / maxValue) * 100;

					return (
						<Chart
							profile={rank.profile}
							key={rank._id}
							username={rank.user}
							totalXp={rank.totalXp}
							accuracy={Math.floor(heightPercentage)}
							rank={index + 1}
						/>
					);
				})}
			</div>

			<div className=" mt-10 text-secondary">
				<div className="flex items-center gap-8 p-2 m-2 justify-center text-xs font-semibold">
					<h4>RANK</h4>
					<h4 className="flex-1">PLAYER</h4>
					<h4>XP</h4>
				</div>
				<ul className="w-full space-y-2">
					{data.leaderboard.map((rank, index) => {

						return (
							<li className="flex rounded-xl text-white font-bold items-center gap-10 px-5 py-5 bg-card">
								<span className="">{index + 1}</span>
								<div className="flex-1 flex items-center gap-4">
									<ProfileAvatar username={rank.user} profile={rank.profile} className="size-10" />
									<p className="capitalize">{rank.user}</p>
								</div>
								<p className="text-custom">{rank.totalXp}</p>
							</li>
						);
					})}
				</ul>
			</div>
			{data.userRank.name && (
				<div className="bg-background border-t z-20 flex items-center justify-center border-muted fixed bottom-0 w-full left-0 px-4 py-5">
					<div className="max-w-4xl w-full flex items-center gap-10 justify-between">
						<span className="font-ubuntu text-white text-xl">
							#{data.userRank.rank}
						</span>
						<div className="flex-1 flex items-center gap-4">
							<ProfileAvatar username={data.userRank.name} profile={data.userRank.profile} className="size-12" />
							<p className="capitalize text-secondary font-bold">{data.userRank.name}</p>
						</div>

						<p className="text-custom text-sm">
							Total XP: {data.userRank.totalXp}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
