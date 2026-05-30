import { ReusableTable as OverviewTable } from "@/components/feature/admin/quiz/QuizTable";
import { DashboardCard } from "@/components/feature/dashboard/DashboardCard";
import { DashboardProfileCard } from "@/components/feature/dashboard/DashboardProfileCard";
import { QuizCard } from "@/components/feature/quizlist/QuizCard";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/modules/auth/store/auth.store";
import { useFetchRandomQuiz } from "@/modules/quiz/controllers/quiz-api.controller";
import { GetResult, Stats } from "@/modules/quiz/types/quiz.types";
import { useFetchResult, useFetchUserStats } from "@/modules/result/controllers/result.controller";
import { getColorFromString, getScoreColor } from "@/utils/colorFormat";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Droplet, History, Leaf, RefreshCcw, Shuffle, ThumbsUp, Trees, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useMemo } from "react";

const columns: ColumnDef<GetResult>[] = [
	{
		header: "Quiz Name",
		cell: ( { row } ) =>
		{
			const color = getColorFromString( row.original.quiz );
			return (
				<div className="flex items-center gap-4">
					<span
						className={ `${ color.text } ${ color.gradient } px-4 py-3 rounded-full` }
					>
						{ row.original.quiz?.charAt( 0 ) }
					</span>
					<p>{ row.original.quiz || "N/A" }</p>
				</div>
			);
		},
	},
	{
		accessorFn: ( row ) => row.quiz || "N/A",
		header: "Category",
	},
	{
		accessorFn: ( row ) => format( row.createdAt, "PP" ) || "N/A",
		header: "Date",
	},
	{
		accessorKey: "score",
		header: "Score",
		cell: ( { row } ) =>
		{
			const color = getScoreColor( row.original.score, row.original.answers.length );
			// log
			return (
				<span className={ `${ color } px-2 py-1 text-xs rounded-full` }>
					{ row.original.score } / { row.original.answers.length }
				</span>
			);
		},
	},
	{
		id: "action",
		header: "Action",
		cell: ( { row } ) =>
		{
			const navigate = useNavigate()
			const id = row.original.quiz
			const handleClick = () =>
			{
				// Implement refresh logic here
				navigate( `/quizzes/${ id }/questions` )

			}
			return (
				<Button
					size={ "icon" }
					variant={ "ghost" }
					className="cursor-pointer"
					onClick={ handleClick }
				>
					<RefreshCcw />
				</Button>
			);
		},
	},
];
export const Overview = () =>
{
	const user = useAuthStore( ( s ) => s.user );
	const {data: userStats, isLoading: statIsLoading} = useFetchUserStats();
	const randomQuiz = useFetchRandomQuiz();
	const [searchTerm, setSearchTerm] = useState("");
	const quiz = useFetchResult({ searchTerm });

	const attempts = useMemo(() => quiz.data?.data || [], [quiz.data]);

	const filteredAttempts = attempts;

	if ( statIsLoading || randomQuiz.isLoading || quiz.isLoading )
	{
		return <QuizLoader loading />;
	}

	const stats = userStats?.data as Stats;

	return (
		<div className="py-5 px-10">
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-primary flex gap-2 items-center">
						Welcome back, { user?.username }{ " " }
						<Leaf color="var(--color-custom)" />
					</h1>
					<p className="text-secondary p-1">
						Ready to plant some more trees today?
					</p>
				</div>
				<button className="flex gap-2 bg-brand px-4 py-3 rounded-full text-on-brand font-bold cursor-pointer items-center">
					<Shuffle /> Start Random Quiz
				</button>
			</div>
			<div className="mt-5 p-5 flex gap-5">
				<DashboardProfileCard
					progress={ stats.xp.progress }
					tag={ `Lvl ${ stats?.level }` }
					progressInfo={ `${ stats?.xp.levelStartXp } / ${ stats.xp.levelEndXp } XP` }
					extraInfo={ `${ stats.xp.total } XP to next level` }
					name={ user?.username }
					profile={ user?.profile }
					subtitle={ user?.email }
				/>
				<DashboardCard
					icon={ <Trees /> }
					title="Total Quiz Taken"
					value={ stats?.quizzesTaken }
					id="total"
				/>
				<DashboardCard
					icon={ <Droplet /> }
					title="Accuracy"
					value={ `${Math.round(stats.accuracy)}%` }
					id="accuracy"
				/>
				<DashboardCard
					icon={ <Droplet /> }
					title="Global Rank"
					value={ `#${Math.round(stats.rank)}` }
					id="accuracy"
				/>
			</div>
			<div className="">
				<h1 className="text-xl mt-4 p-4 text-primary font-bold flex items-center gap-2">
					<ThumbsUp color="var(--color-brand)" /> Recommended For You
				</h1>
				<ul className="grid grid-cols-3 p-5 gap-10">
					{ randomQuiz.data.map( ( q ) => (
						<QuizCard
							updatedAt={q.updatedAt}
							_id={ q._id }
							title={ q.title }
							difficulty={ q.difficulty }
							timeLimitPerQuestion={ q.timeLimitPerQuestion }
							key={ q._id }
							questionCount={ q.questionCount } />
					) ) }
				</ul>
			</div>
			<div className="p-4 space-y-4">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<h1 className="text-xl text-primary font-bold flex items-center gap-2">
						<History color="var(--color-brand)" /> Recent Harvest
					</h1>
					<div className="relative w-full md:max-w-xs">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-btn w-4 h-4" />
						<input
							type="text"
							placeholder="Search recent quizzes..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className="w-full pl-9 pr-4 py-2 bg-surface-alt border border-default rounded-lg text-primary placeholder-secondary-btn focus:outline-none focus:border-secondary-btn/60 transition-colors text-sm"
						/>
					</div>
				</div>
				<OverviewTable columns={ columns } data={ filteredAttempts } />
			</div>
		</div>
	);
};
