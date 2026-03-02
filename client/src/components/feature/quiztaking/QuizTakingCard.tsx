import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { QuizNavBtn } from "./QuizNavBtn";

interface QuizTakingCardProps
{
	goToNextQuestion: () => void;
	goToPrevQuestion: () => void;
	currentIndex: number;
	questionText: string,
	options: string[],

	isFirstQuestion: boolean,

	isLastQuestion: boolean,

	selectedIndex: number,

	hasAnsweredQuestion: boolean,

	handleSendResults: () => void,

	allIsAnswered: boolean
	handleSelectedOptions: ( index: number ) => void
}
export const QuizTakingCard = ( {
	questionText, options, currentIndex, handleSelectedOptions, selectedIndex, allIsAnswered, goToNextQuestion, goToPrevQuestion, handleSendResults, hasAnsweredQuestion, isFirstQuestion, isLastQuestion
}: QuizTakingCardProps ) =>
{
	// console.log(questionText);

	return (
		<AnimatePresence>
			<motion.div
				initial={ { opacity: 0, x: -40 } }
				animate={ { opacity: 1, x: 0 } }
				transition={ {
					duration: 1,
				} }
				key={ currentIndex }
				className="w-full overflow-hidden relative mt-4 rounded-4xl bg-card "
			>
				<div className="text-white text-center font-ubuntu bg-muted/50 text-base p-4 md:text-xl h-50 flex items-center justify-center rounded-b-[50%] ">
					<span></span>
					<h2>{ questionText }</h2>
				</div>
				<ul className="px-8 space-y-4">
					{ options.map( ( opt, index ) => (
						<motion.li
							onClick={ () => handleSelectedOptions( index ) }
							whileHover={ {
								scale: 1.05,
							} }
							whileTap={ {
								scale: 0.8,
							} }
							transition={ {
								duration: 0.2,
								type: "spring",
								stiffness: 100,
							} }
							className={ `px-6 py-3 cursor-pointer flex items-center justify-between font-ubuntu rounded-full ${ selectedIndex === index
								? "bg-custom text-muted"
								: "bg-muted text-white"
								}` }
						>
							<div className="flex items-center">
								<span className="mr-4 px-2 py-1 inline text-xs bg-secondary/20 font-bold rounded-full">
									{ String.fromCharCode( 65 + index ) }
								</span>
								{ opt }
							</div>
							{ selectedIndex === index && (
								<span className="p-1 rounded-full bg-background">
									<Check
										color="var(--color-custom)"
										size={ 12 }
									/>
								</span>
							) }
						</motion.li>
					) ) }
				</ul>
				<hr className="border-muted mt-8" />
				<div className="mt-4 flex px-6 mb-4 justify-between items-center">
					<QuizNavBtn
						disable={ isFirstQuestion }
						onClick={ goToPrevQuestion }
						direction="prev"
						label="Prev Quiz"
					/>
					{ !isLastQuestion ? (
						<QuizNavBtn
							disable={ !hasAnsweredQuestion }
							onClick={ goToNextQuestion }
							direction="next"
							label="Next Quiz"
						/>
					) : (
						<motion.button
							onClick={ handleSendResults }
							disabled={ !allIsAnswered }
							whileHover={
								allIsAnswered
									? {
										scale: 1.1,
									}
									: {}
							}
							whileTap={ {
								scale: 0.8,
							} }
							className={ `px-4  text-sm py-2 ${ allIsAnswered
								? "bg-red-700 cursor-pointer"
								: "bg-red-900/80 cursor-not-allowed"
								} text-white rounded-full` }
						>
							Submit Quiz
						</motion.button>
					) }
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
