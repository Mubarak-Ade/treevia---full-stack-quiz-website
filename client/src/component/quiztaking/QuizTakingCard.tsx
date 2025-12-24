import { Question } from "@/models/Quiz";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { QuizNavBtn } from "./QuizNavBtn";
import { useSubmitAnswers } from "@/features/queries/useQuiz";

interface QuizTakingCardProps {
	quiz: Question[];
	goToNextQuestion: () => void;
	goToPrevQuestion: () => void;
	currentIndex: number;
	selectedOption: number[];
	setSelectedOption: React.Dispatch<React.SetStateAction<number[]>>;
}
export const QuizTakingCard = ({
	quiz,
	goToNextQuestion,
	goToPrevQuestion,
	currentIndex,
	selectedOption,
	setSelectedOption,
}: QuizTakingCardProps) => {
	// console.log(questionText);

	const navigate = useNavigate();
	const { id } = useParams();

	const submit = useSubmitAnswers();

	const { questionText, options } = quiz[currentIndex];

	const isFirstQuestion = currentIndex === 0;
	const isLastQuestion = currentIndex === quiz.length - 1;

	const selectedIndex = selectedOption[currentIndex];

	const hasAnsweredQuestion = selectedIndex !== -1;

	const allIsAnswered = selectedOption.every((opt) => opt !== -1);

	const handleSelectedOption = (index: number) => {
		const updateSelection = [...selectedOption];
		updateSelection[currentIndex] = index;
		setSelectedOption(updateSelection);
	};

	const handleNext = () => {
		if (!hasAnsweredQuestion) return;
		if (!isLastQuestion) goToNextQuestion();
	};

	const handlePrev = () => {
		if (isFirstQuestion) return;
		goToPrevQuestion();
	};

	const handleSendResults = () => {
		// Implementation for sending results to server can be added here
		if (!allIsAnswered) return;
		submit.mutate(
			{
				quizId: id as string,
				selectedOption: selectedOption,
			},
			{
				onSuccess: (data) => {
					navigate("/result", {
						state: { data, quiz: {...quiz, questionText, options} },
					});
				},
			}
		);
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, x: -40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					duration: 1,
				}}
				key={currentIndex}
				className="w-full overflow-hidden relative mt-4 rounded-4xl bg-card "
			>
				<div className="text-white text-center font-ubuntu bg-muted/50 text-base p-4 md:text-xl h-50 flex items-center justify-center rounded-b-[50%] ">
					<span></span>
					<h2>{questionText}</h2>
				</div>
				<ul className="px-8 space-y-4">
					{options.map((opt, index) => (
						<motion.li
							onClick={() => handleSelectedOption(index)}
							whileHover={{
								scale: 1.05,
							}}
							whileTap={{
								scale: 0.8,
							}}
							transition={{
								duration: 0.2,
								type: "spring",
								stiffness: 100,
							}}
							className={`px-6 py-3 cursor-pointer flex items-center justify-between font-ubuntu rounded-full ${
								selectedIndex === index
									? "bg-custom text-muted"
									: "bg-muted text-white"
							}`}
						>
							<div className="flex items-center">
								<span className="mr-4 px-2 py-1 inline text-xs bg-secondary/20 font-bold rounded-full">
									{String.fromCharCode(65 + index)}
								</span>
								{opt}
							</div>
							{selectedIndex === index && (
								<span className="p-1 rounded-full bg-background">
									<Check
										color="var(--color-custom)"
										size={12}
									/>
								</span>
							)}
						</motion.li>
					))}
				</ul>
				<hr className="border-muted mt-8" />
				<div className="mt-4 flex px-6 mb-4 justify-between items-center">
					<QuizNavBtn
						disable={isFirstQuestion}
						onClick={handlePrev}
						direction="prev"
						label="Prev Quiz"
					/>
					{!isLastQuestion ? (
						<QuizNavBtn
							disable={!hasAnsweredQuestion}
							onClick={handleNext}
							direction="next"
							label="Next Quiz"
						/>
					) : (
						<motion.button
							onClick={handleSendResults}
							disabled={!allIsAnswered}
							whileHover={
								allIsAnswered
									? {
											scale: 1.1,
									  }
									: {}
							}
							whileTap={{
								scale: 0.8,
							}}
							className={`px-4  text-sm py-2 ${
								allIsAnswered
									? "bg-red-700 cursor-pointer"
									: "bg-red-900/80 cursor-not-allowed"
							} text-white rounded-full`}
						>
							Submit Quiz
						</motion.button>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
