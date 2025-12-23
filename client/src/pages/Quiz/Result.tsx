import { QuizHeader } from "@/component/quiztaking/Header";
import { Check, CircleCheck, CircleX, Grid2X2, Trophy, Undo2, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Result = () => {
	const navigate = useNavigate();
	return (
		<div className="fixed h-screen bg-background w-full top-0 left-0">
			<QuizHeader
				onClick={() => navigate("/quizzes")}
				label="Back To Categories"
				icon={<Grid2X2 size={20} />}
			/>

			<div className="max-w-2xl  w-full m-auto p-5">
				<div className="bg-card font-ubuntu p-10 rounded-4xl flex gap-4 items-center flex-col justify-center">
					<div className="p-4 rounded-full inline-block bg-custom/80 shadow-[0_0_25px] shadow-custom">
						<Trophy
							size={40}
							color="var(--color-background)"
						/>
					</div>
					<h1 className="text-4xl font-bold text-white">Tree-mendous Work!</h1>
					<p className="text-lg text-secondary">You have completed your quiz</p>
					<h2 className="text-5xl font-bold text-white">80%</h2>
					<span className="py-2 px-3 bg-muted rounded-full text-xs text-white font-poppins font-semibold">10 out of 10 is correct</span>
					<div className="flex gap-10 my-6">
						<div className="bg-muted/50 text-custom rounded-xl w-50 h-25 flex items-center justify-center flex-col">
							<h6 className="text-xl">12</h6>
							<p className="flex font-poppins text-sm items-center gap-1">
								<CircleCheck size={15} color="var(--color-custom)" /> Correct
							</p>
						</div>
						<div className="bg-muted/50 text-red-500 rounded-xl w-50 h-25 flex items-center justify-center flex-col">
							<h6 className="text-xl">12</h6>
							<p className="flex font-poppins text-sm items-center gap-1">
								<CircleX size={15} color="var(--color-red-500)" /> Incorrect
							</p>
						</div>
					</div>
					<div className="flex gap-4">
						<button className="flex bg-custom text-muted px-6 gap-2 py-2 rounded-full">
							<Undo2 /> Retake Quiz
						</button>
						<button className="flex bg-muted text-white gap-2 px-6 py-2 rounded-full">
							<Grid2X2 /> Other Categories
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Result;
