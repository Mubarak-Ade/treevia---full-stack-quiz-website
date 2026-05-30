import { Chart } from "@/components/feature/leaderboard/Chart";
import { Reveal, Stagger } from "@/components/feature/Motion";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { ProfileAvatar } from "@/components/feature/share/ProfileAvatar";
import { useFetchLeaderboard } from "@/modules/result/controllers/result.controller";
import { useMemo, useState } from "react";
import { Navigate } from "react-router";
import { Search } from "lucide-react";

export const Leaderboard = () =>
{
	const [searchTerm, setSearchTerm] = useState("");
	const { data, isLoading } = useFetchLeaderboard({ searchTerm });

	const maxValue = useMemo( () =>
	{
		if ( !data?.leaderboard?.length ) return 0
		return data?.leaderboard.reduce( ( m, d ) => Math.max( m, d.totalXp ), 0 )
	}, [ data ] )

	const filteredLeaderboard = useMemo(() => {
		return data?.leaderboard || [];
	}, [data?.leaderboard]);
	
	if ( isLoading )
	{
		return <QuizLoader loading />;
	}
	if ( !data || data.leaderboard.length === 0 ) return <Navigate to="/empty/board" replace />

	return (
		<div className="max-w-4xl relative min-h-screen m-auto p-5">
			<Reveal className="">
				<h1 className="text-5xl text-primary font-ubuntu">
					Global Leaderboard
				</h1>
				<h6 className="text-secondary font-poppins m-1">
					Compete with the top minds in treevia
				</h6>
			</Reveal>
			<Stagger className="flex items-end justify-center gap-10 mt-10 h-125 overflow-hidden">
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
			</Stagger>

			<Reveal className=" mt-10 text-secondary">
				{/* Beautiful Search Input Bar */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
					<div className="relative flex-1 max-w-md group">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand w-4 h-4" />
						<input
							className="w-full rounded-full border border-default bg-surface px-11 py-3 text-sm text-primary outline-none focus:ring-2 focus:ring-brand transition-all placeholder-secondary-btn"
							placeholder="Search players..."
							type="text"
							value={searchTerm}
							onChange={event => setSearchTerm(event.target.value)}
						/>
					</div>
					{searchTerm && (
						<div className="text-sm font-semibold text-secondary-btn">
							Showing {filteredLeaderboard.length} of {data.leaderboard.length} players
						</div>
					)}
				</div>

				<div className="flex items-center gap-8 p-2 m-2 justify-center text-xs font-semibold">
					<h4>RANK</h4>
					<h4 className="flex-1">PLAYER</h4>
					<h4>XP</h4>
				</div>
				<ul className="w-full space-y-2">
					{ filteredLeaderboard.map( ( rank ) =>
					{
						const originalRank = data.leaderboard.findIndex((r) => r._id === rank._id) + 1;
						return (
							<li key={ rank._id || rank.user } className="flex rounded-xl text-primary font-bold items-center gap-10 px-5 py-5 bg-card">
								<span className="">{ originalRank }</span>
								<div className="flex-1 flex items-center gap-4">
									<ProfileAvatar username={ rank.user } profile={ rank.profile } className="size-10" />
									<p className="capitalize">{ rank.user }</p>
								</div>
								<p className="text-brand">{ rank.totalXp }</p>
							</li>
						);
					} ) }
					{ filteredLeaderboard.length === 0 && (
						<li className="text-center py-10 text-secondary font-medium bg-card rounded-xl">
							No players match your search criteria.
						</li>
					)}
				</ul>
			</Reveal>
			{ data.userRank.name && (
				<Reveal className="bg-surface border-t z-20 flex items-center justify-center border-default sticky top-0 w-full left-0 px-4 py-5">
					<div className="max-w-4xl w-full flex items-center gap-10 justify-between">
						<span className="font-ubuntu text-white text-xl">
							#{ data.userRank.rank }
						</span>
						<div className="flex-1 flex items-center gap-4">
							<ProfileAvatar username={ data.userRank.name } profile={ data.userRank.profile } className="size-12" />
							<p className="capitalize text-secondary font-bold">{ data.userRank.name }</p>
						</div>

						<p className="text-brand text-sm">
							Total XP: { data.userRank.totalXp }
						</p>
					</div>
				</Reveal>
			) }
		</div>
	);
};
