import { QuizHeader } from "@/components/feature/quiztaking/Header";
import useAuthStore from "@/features/auth/store";
import { Result as ResultModel } from "@/features/quiz/types";
import {
	Check,
	CircleCheck,
	CircleX,
	Grid2X2,
	Trophy,
	Undo2,
	X,
} from "lucide-react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";

const Result = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const result = location.state.data;

	const { totalQuestions, score, accuracy, attempts } =
		result as ResultModel;


	const user = useAuthStore((state) => state.user);

	return (
		<div className="h-full bg-background w-full top-0 left-0">
			<QuizHeader
				onClick={() => navigate("/quizzes")}
				label="Back To Categories"
				icon={<Grid2X2 size={20} />}
			/>

			{user === null && (
				<div className="p-5">
					<div className="flex flex-col gap-2 md:flex-row px-2 shadow-[0_0_15px] shadow-card/20 max-w-xl m-auto items-center py-6 md:py-2 text-white mt-5 rounded-full bg-card justify-between">
						<p className="text-base mx-4 font-bold">
							Sign up to save your progress
						</p>
						<motion.button
							whileHover={{
								scale: 1.1,
							}}
							whileTap={{
								scale: 0.8,
							}}
							onClick={() => navigate("/register")}
							className="bg-custom px-6 cursor-pointer shadow-[0_0_15px] shadow-custom py-2 text-background font-semibold rounded-full"
						>
							Sign Up
						</motion.button>
					</div>
				</div>
			)}

			<div className="max-w-3xl overflow-hidden h-full w-full m-auto p-5">
				<div className="bg-card h-full overflow-hidden font-ubuntu p-10 rounded-4xl flex gap-4 items-center flex-col justify-center">
					<div className="p-4 rounded-full inline-block bg-custom/80 shadow-[0_0_25px] shadow-custom">
						<Trophy
							size={40}
							color="var(--color-background)"
						/>
					</div>
					<h1 className="text-4xl font-bold text-white">
						Tree-mendous Work!
					</h1>
					<p className="text-lg text-secondary">
						You have completed your quiz
					</p>
					<h2 className="text-5xl font-bold text-white">
						{accuracy}%
					</h2>
					<span className="py-2 px-3 bg-muted rounded-full text-xs text-white font-poppins font-semibold">
						{score} out of {totalQuestions} is correct
					</span>
					<div className="flex flex-col md:flex-row gap-10 my-6">
						<div className="bg-muted/50 text-custom rounded-xl w-50 h-25 flex items-center justify-center flex-col">
							<h6 className="text-xl">{score}</h6>
							<p className="flex font-poppins text-sm items-center gap-1">
								<CircleCheck
									size={15}
									color="var(--color-custom)"
								/>{" "}
								Correct
							</p>
						</div>
						<div className="bg-muted/50 text-red-500 rounded-xl w-50 h-25 flex items-center justify-center flex-col">
							<h6 className="text-xl">{totalQuestions - score}</h6>
							<p className="flex font-poppins text-sm items-center gap-1">
								<CircleX
									size={15}
									color="var(--color-red-500)"
								/>{" "}
								Incorrect
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center lg:flex-row gap-4">
						<button
							onClick={() => navigate(-1)}
							className="flex cursor-pointer bg-custom text-muted px-6 gap-2 py-2 rounded-full"
						>
							<Undo2 /> Retake Quiz
						</button>
						<button
							onClick={() => navigate("/dashboard/overview")}
							className="flex cursor-pointer bg-muted text-white gap-2 px-6 py-2 rounded-full"
						>
							<Grid2X2 /> Go To Dashboard
						</button>
					</div>
				</div>
				<div className="mt-5">
					<h1 className="text-xl mb-5 text-white font-bold">
						Answer Breakdown
					</h1>

					<ul className="space-y-4">
						{attempts?.map((quiz, index) => (
							<li
								key={index}
								className="p-6 relative bg-secondary/5 rounded-2xl border border-secondary/20"
							>
								<h6 className="text-base w-[90%] flex font-poppins gap-3 mb-5 text-white ">
									<span>{index + 1}. </span>
									{quiz.question}
								</h6>
								{quiz.isCorrect ? (
									<p className="text-sm text-secondary">
										Your Answer:{" "}
										<span className="text-custom font-bold">
											{quiz.selected}
										</span>
									</p>
								) : (
									<div className="flex flex-col md:flex-row gap-3 md:gap-10">
										<p className="text-sm text-secondary">
											Your Answer:{" "}
											<span className="text-custom font-bold">
												{quiz.selected}
											</span>
										</p>
										<p className="text-sm text-secondary">
											Correct Answer:{" "}
											<span className="text-red-500 font-bold">
												{quiz.correct}
											</span>
										</p>
									</div>
								)}
								<div
									className={`p-2 absolute top-0 right-0 m-4 rounded-full ${quiz.isCorrect
										? "bg-custom/20"
										: "bg-red-500/20"
										}`}
								>
									{quiz.isCorrect ? (
										<Check color="var(--color-custom)" />
									) : (
										<X color="var(--color-red-500)" />
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Result;
