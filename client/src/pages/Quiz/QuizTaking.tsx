import React, { useState } from "react";

import { ProgressBar } from "@/component/quiztaking/ProgressBar";
import { QuizHeader } from "@/component/quiztaking/Header";
import { QuizTakingCard } from "@/component/quiztaking/QuizTakingCard";
import { useFetchQuestion } from "@/features/queries/useQuiz";
import { useNavigate, useParams } from "react-router";
import { X } from "lucide-react";

export const QuizTaking = () => {
	const { id } = useParams();
	const navigate = useNavigate()
	const { data, isLoading } = useFetchQuestion(id as string);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(
		Array(data?.length).fill(-1)
	);
	if (isLoading) {
		return <p>Loading...</p>;
	}

	const NextIndex = currentIndex < data.length - 1;
	const PrevIndex = currentIndex > 0;

	const handleNextQuestion = () => {
		if (NextIndex) {
			setCurrentIndex((next) => next + 1);
		}
	};

	const handlePrevQuestion = () => {
		if (PrevIndex) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	console.log(selectedOption);

	const progress = ((currentIndex + 1) / data.length) * 100;
	return (
		<div>
			<QuizHeader label="Quit Quiz" icon={<X size={20} />} onClick={() => navigate(-1)} />

			<div className="p-4 max-w-2xl flex flex-col items-center justify-center w-full m-auto">
				<div className="w-full">
					<div className="flex text-custom text-xs md:text-sm justify-between items-center mb-2">
						<h2 className="">
							Question {currentIndex + 1} of {data.length}
						</h2>
						<h4>{progress}% Completed</h4>
					</div>
					<ProgressBar progress={progress} />
				</div>
				<QuizTakingCard
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					quiz={data}
					prevIndex={PrevIndex}
					currentIndex={currentIndex}
					nextIndex={NextIndex}
					goToPrevQuestion={handlePrevQuestion}
					goToNextQuestion={handleNextQuestion}
				/>
			</div>
		</div>
	);
};
