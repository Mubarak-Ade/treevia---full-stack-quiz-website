import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getQuizById } from "../../features/auth/reduxThunk";
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'

const QuizTaking = memo(() => {
    const { currentQuiz, error, loading } = useSelector((state) => state.quiz);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});


    useEffect(() => {
        dispatch(getQuizById(id));
    }, [dispatch, id]);

    let {question, } = currentQuiz || {}

    question = currentQuiz?.questions[currentQuestion];

    const handleChecked = (key) => {
        setAnswers({ ...answers, [currentQuestion]: key });
    };
    console.log(currentQuiz);

    const handleNext = () => {
        const questions = currentQuiz?.questions;
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        const questions = currentQuiz?.questions;
        if (currentQuestion >= 1) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    console.log(answers);

    const className = "appearance-none bg-white h-1 fill-red-500"

    // const currentQuestion = currentQuiz.questions[parseInt(id)]

    return (
        <div className="h-full px-8 py-4 p-4 flex flex-col justify-center items-center text-center w-full bg-teal-900 text-white">
            <div className="mb-8">
                <h1 className="text-4xl font-alata">{currentQuiz?.title}</h1>
                <h2>{`Question ${currentQuestion + 1} of ${
                    currentQuiz?.questions.length
                }`}</h2>
            </div>
            <div className="w-150">
                <div className="">
                    <input type="range" className={clsx(className)} value={currentQuestion + 1} min={1} max={currentQuiz?.questions.length} name="" id="" />
                </div>
                <div className="bg-white text-teal-900 h-30 flex items-center justify-center m-2 rounded-4xl w-full">
                    <h2 className="text-2xl mb-4 font-ubuntu">
                        {question.question}
                    </h2>
                </div>
                <AnimatePresence>
                    <motion.ul className="flex flex-col w-full"  layout>
                        {Object.entries(question.options).map(([key, value]) => (
                            <motion.li 
                            whileTap={{
                                scale: 0.8
                            }}
                            key={key}>
                                <input
                                    className="hidden peer"
                                    id={key}
                                    onChange={() => handleChecked(key)}
                                    type="radio"
                                    value={key}
                                    checked={answers[currentQuestion] === key}
                                    name={`question-${currentQuestion}`}
                                />
                                <label
                                    for={key}
                                    className="w-full inline-flex p-4 border m-2 rounded-xl border-teal-800 shadow-teal-700 shadow-[0px_0px_15px_0px] peer-checked:border-white peer-checked:shadow-teal-200 cursor-pointer"
                                >
                                    <span>{value}</span>
                                </label>
                            </motion.li>
                        ))}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrev}
                                className="bg-teal-600 cursor-pointer text-white m-2 px-8 py-2 rounded-xl"
                            >
                                Prev
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-teal-600 cursor-pointer text-white m-2 px-8 py-2 rounded-xl"
                            >
                                Next
                            </button>

                        </div>
                    </motion.ul>
                </AnimatePresence>
            </div>
        </div>
    )
})

export default QuizTaking;
