import { ReusableTable as OverviewTable } from "@/components/feature/admin/quiz/QuizTable";
import { DashboardCard } from "@/components/feature/dashboard/DashboardCard";
import { DashboardProfileCard } from "@/components/feature/dashboard/DashboardProfileCard";
import { QuizCard } from "@/components/feature/quizlist/QuizCard";
import { QuizLoader } from "@/components/feature/QuizLoader";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/features/auth/store";
import { useFetchRandomQuiz } from "@/features/quiz/hooks";
import { GetResult, Stats } from "@/features/quiz/types";
import { useFetchResult, useFetchUserStats } from "@/features/result/hooks";
import { getColorFromString, getScoreColor } from "@/utils/colorFormat";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Droplet, History, Leaf, RefreshCcw, Shuffle, ThumbsUp, Trees } from "lucide-react";
import { useNavigate } from "react-router";

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
			const color = getScoreColor( row.original.score, row.original.correctAnswers.length );
			// log
			return (
				<span className={ `${ color } px-2 py-1 text-xs rounded-full` }>
					{ row.original.score } / { row.original.correctAnswers.length }
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
	const userStats = useFetchUserStats();
	const randomQuiz = useFetchRandomQuiz();
	const quiz = useFetchResult()

	if ( userStats.isLoading || randomQuiz.isLoading || quiz.isLoading )
	{
		return <QuizLoader loading />;
	}

	const stats = userStats.data as Stats;

	console.log( stats );


	const progressBar = ( stats?.totalXp / stats?.xpForNextLevel ) * 100;

	return (
		<div className="py-5 px-10">
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
						Welcome back, { user?.username }{ " " }
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
					progress={ progressBar }
					tag={ `Lvl ${ stats?.level }` }
					progressInfo={ `${ stats?.totalXp } / ${ stats.xpForNextLevel } XP` }
					extraInfo={ `${ stats.xpIntoLevel } XP to next level` }
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
					value={ Math.round(stats.accuracy) }
					id="accuracy"
				/>
			</div>
			<div className="">
				<h1 className="text-xl mt-4 p-4 text-white font-bold flex items-center gap-2">
					<ThumbsUp color="var(--color-custom)" /> Recommended For You
				</h1>
				<ul className="grid grid-cols-3 p-5 gap-10">
					{ randomQuiz.data.map( ( q ) => (
						<QuizCard
							updatedAt={q.updatedAt}
							_id={ q._id }
							title={ q.title }
							difficulty={ q.difficulty }
							timeLimit={ q.timeLimit }
							key={ q._id }
							questionCount={ q.questionCount } />
					) ) }
				</ul>
			</div>
			<div className="p-4">
				<h1 className="text-xl mb-4 text-white font-bold flex items-center gap-2">
					<History color="var(--color-custom)" /> Recent Harvest
				</h1>
				<OverviewTable columns={ columns } data={ quiz.data } />
			</div>
		</div>
	);
};
