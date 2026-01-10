import { Chart } from "@/components/feature/leaderboard/Chart";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { ProfileAvatar } from "@/components/feature/share/ProfileAvatar";
import { useFetchLeaderboard } from "@/features/result/hooks";
import { useMemo } from "react";
import { Navigate } from "react-router";

export const Leaderboard = () =>
{
	const { data, isLoading } = useFetchLeaderboard();

	const maxValue = useMemo( () =>
	{
		if ( !data.leaderboard?.length ) return 0
		return data?.leaderboard.reduce( ( m, d ) => Math.max( m, d.totalXp ), 0 )
	}, [ data ] )
	
	if ( isLoading )
	{
		return <QuizLoader loading />;
	}
	if ( !data || data.leaderboard.length === 0 ) return <Navigate to="/empty/board" replace />

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
				{ data.leaderboard.slice( 0, 3 ).map( ( rank, index ) =>
				{
					const heightPercentage = maxValue ? ( rank.totalXp / maxValue ) * 100 : 0;

					return (
						<Chart
							profile={ rank.profile }
							key={ rank._id }
							username={ rank.user }
							totalXp={ rank.totalXp }
							accuracy={ Math.floor( heightPercentage ) }
							rank={ index + 1 }
						/>
					);
				} ) }
			</div>

			<div className=" mt-10 text-secondary">
				<div className="flex items-center gap-8 p-2 m-2 justify-center text-xs font-semibold">
					<h4>RANK</h4>
					<h4 className="flex-1">PLAYER</h4>
					<h4>XP</h4>
				</div>
				<ul className="w-full space-y-2">
					{ data.leaderboard.map( ( rank, index ) =>
					{

						return (
							<li key={ index } className="flex rounded-xl text-white font-bold items-center gap-10 px-5 py-5 bg-card">
								<span className="">{ index + 1 }</span>
								<div className="flex-1 flex items-center gap-4">
									<ProfileAvatar username={ rank.user } profile={ rank.profile } className="size-10" />
									<p className="capitalize">{ rank.user }</p>
								</div>
								<p className="text-custom">{ rank.totalXp }</p>
							</li>
						);
					} ) }
				</ul>
			</div>
			{ data.userRank.name && (
				<div className="bg-background border-t z-20 flex items-center justify-center border-muted fixed bottom-0 w-full left-0 px-4 py-5">
					<div className="max-w-4xl w-full flex items-center gap-10 justify-between">
						<span className="font-ubuntu text-white text-xl">
							#{ data.userRank.rank }
						</span>
						<div className="flex-1 flex items-center gap-4">
							<ProfileAvatar username={ data.userRank.name } profile={ data.userRank.profile } className="size-12" />
							<p className="capitalize text-secondary font-bold">{ data.userRank.name }</p>
						</div>

						<p className="text-custom text-sm">
							Total XP: { data.userRank.totalXp }
						</p>
					</div>
				</div>
			) }
		</div>
	);
};
