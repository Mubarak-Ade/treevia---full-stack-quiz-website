import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { QuizNavBtn } from './QuizNavBtn';
import { Options } from '@/modules/quiz/types/quiz.types';

interface QuizTakingCardProps {
    questionId: string;
    goToNextQuestion: () => void;
    goToPrevQuestion: () => void;
    currentIndex: number;
    questionText: string;
    options: Options[];

    isFirstQuestion: boolean;

    isLastQuestion: boolean;

    selectedLabel?: Options['label'];

    hasAnsweredQuestion: boolean;

    handleSendResults: () => void;

    allIsAnswered: boolean;
    handleSelectedOptions: (option: { questionId: string; label: Options['label'] }) => void;
}
export const QuizTakingCard = ({
    questionId,
    questionText,
    options,
    currentIndex,
    handleSelectedOptions,
    selectedLabel,
    allIsAnswered,
    goToNextQuestion,
    goToPrevQuestion,
    handleSendResults,
    hasAnsweredQuestion,
    isFirstQuestion,
    isLastQuestion,
}: QuizTakingCardProps) => {
    // (questionText);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 1,
                }}
                key={currentIndex}
                className="w-full overflow-hidden relative mt-4 rounded-4xl bg-surface shadow-lg"
            >
                <div className="text-primary text-center font-ubuntu bg-surface-alt text-base p-4 md:text-xl h-50 flex items-center justify-center rounded-b-[50%] ">
                    <span></span>
                    <h2>{questionText}</h2>
                </div>
                <ul className="px-8 mt-6 space-y-4">
                    {options?.map((opt) => {

						const isSelected = selectedLabel === opt.label
                        return (
                            <motion.li
                                key={opt.label}
                                onClick={() =>
                                    handleSelectedOptions({ questionId, label: opt.label })
                                }
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.8,
                                }}
                                transition={{
                                    duration: 0.2,
                                    type: 'spring',
                                    stiffness: 100,
                                }}
                                className={`px-6 py-4 cursor-pointer flex items-center justify-between font-ubuntu rounded-full ${
                                    isSelected
                                        ? 'bg-brand text-on-brand'
                                        : 'bg-brand-subtle text-primary'
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-4 px-2 py-1 inline text-xs bg-secondary/20 font-bold rounded-full">
                                        {opt.label}
                                    </span>
                                    {opt.text}
                                </div>
                                {isSelected && (
                                    <span className="p-1 rounded-full bg-background">
                                        <Check color="var(--color-custom)" size={12} />
                                    </span>
                                )}
                            </motion.li>
                        );
                    })}
                </ul>
                <div className="flex p-5 mt-8 justify-between items-center">
                    <QuizNavBtn
                        disable={isFirstQuestion}
                        onClick={goToPrevQuestion}
                        direction="prev"
                        label="Prev Quiz"
                    />
                    {!isLastQuestion ? (
                        <QuizNavBtn
                            disable={!hasAnsweredQuestion}
                            onClick={goToNextQuestion}
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
                                    ? 'bg-red-700 cursor-pointer'
                                    : 'bg-red-900/80 cursor-not-allowed'
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
