import { Quiz } from "@/modules/quiz/types/quiz.types";
import { useStartQuiz } from "@/modules/quiz/controllers/quiz-api.controller";
import { getColorFromString } from "@/utils/colorFormat";
import { Clock, ListOrdered, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { MotionWrap, Reveal, hoverLift, tapPress } from "../Motion";
import { useNotification } from "@/context/NotificationProvider";
// import { Quiz } from "@/types";

interface QuizCardProps extends Quiz { }

export const QuizCard = ({
	title,
	timeLimit,
	timeLimitPerQuestion,
	difficulty,
	_id,
	questionCount,
}: QuizCardProps) => {
	const navigate = useNavigate()
	const { showNotification } = useNotification();
	const color = getColorFromString(title);
	const displayDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
	const displayTime = timeLimitPerQuestion ?? timeLimit ?? 60;
	const startQuiz = useStartQuiz(_id)

	const handleStartButton = () => {
		if (startQuiz.isPending) return;

		startQuiz.mutate(undefined, {
			onSuccess: () => {
				navigate(`/quizzes/${_id}/questions`, {
					state: {
						timeLimit: displayTime,
						quizTitle: title,
					},
				})
			},
			onError: () => {
				showNotification("error", "Unable to start this quiz. Please try again.");
			},
		})
	}

	return (
		<div className="w-full max-w-xs">
			<Reveal
				whileHover={hoverLift}
				className=" border-default border w-full cursor-pointer shadow-[0_-10px_-25px] p-5 shadow-light-surface dark:shadow-secondary rounded-4xl overflow-hidden bg-surface-alt"
			>
				<div className={`h-40 relative ${color.gradient} rounded-4xl`}>
					<span className="text-xs bg-brand-subtle  px-2 py-1 absolute right-0 m-3 text-primary rounded-full">
						{displayDifficulty}
					</span>
					<span
						className={`bg-background ${color.text} absolute bottom-0 border m-4 rounded-full  size-10 flex items-center justify-center font-bold text-xl text-center`}
					>
						{title.charAt(0)}
					</span>
				</div>
				<div className="mt-4">
					<h4 className="font-bold text-xl line-clamp-1 text-primary">
						{title}
					</h4>
					<div className="flex items-center gap-5 mt-10 text-secondary font-semibold">
						<div className="flex items-center gap-1">
							<ListOrdered size={15} />
							<span className="text-xs">
								{questionCount} Questions
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock size={15} />
							<span className="text-xs">{displayTime}s</span>
						</div>
					</div>
					<MotionWrap
						whileHover={hoverLift}
						whileTap={tapPress}
						onClick={handleStartButton}
						aria-disabled={startQuiz.isPending}
						className={`flex items-center w-full hover:text-white px-4 py-2 ${color.bg} rounded-full mt-5 text-sm text-center text-white justify-center gap-2 ${
							startQuiz.isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
						}`}
					>
						{startQuiz.isPending ? "Starting..." : "Start Quiz"} <Play size={15} />
					</MotionWrap>
				</div>
				{/* <div className="p-4 border-t flex items-center gap-2 text-secondary/50 border-muted">
				<h6 className="font-bold text-sm">Popular: </h6>
				<ul className="flex items-center gap-2">
					{tags.map((tag, index) => (
						<li className="bg-muted px-3 py-0.5 rounded-md text-xs">
							{tag}
						</li>
					))}
				</ul>
			</div> */}
			</Reveal>
		</div>
	);
};
