import React from "react";
import * as Fa from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

const QuizCard = ({ id, title, category, questions, timelimit, difficulty, description, tags, attempts, rating }) => {

    // const questionId = questions[0]._id

    const navigate  = useNavigate()

    const handleStartButton = () => {
        navigate(`/quiz/${id}/start`)
    }

    return (
        <div className="bg-white text-custom-700 overflow-hidden p-6.25 text-start rounded-xl">
            <div className="flex mb-4 text-start justify-between items-start">
                <span className="font-montserrat py-1.5 px-3 rounded-2xl text-xs bg-custom-500/30 text-custom-500">
                    {category}
                </span>
                <span className="font-montserrat text-xs rounded-2xl px-3 bg-custom-500/20 text-custom-700 py-1.5 font-semibold capitalize">
                    {difficulty}
                </span>
            </div>
            <h2 className="text-xl font-semibold mb-2.5">{title}</h2>
            <p className="text-sm text-gray-500 mb-2.5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aspernatur?</p>
            <div className="flex justify-between text-sm text-gray-500/80 mb-2.5">
                <p className=""> {attempts} attempts</p>
                <p> {rating}</p>
                <p>{timelimit} min</p>
            </div>
            <div className="">
                <motion.button
                    whileHover={{
                        backgroundColor: "transparent",
                        border: "2px solid var(--color-treevia-custom)",
                        color: "var(--color-white)",
                    }}
                    whileTap={{
                        scale: 0.8,
                    }}
                    className="w-full"
                    onClick={handleStartButton}
                >
                    Start Quiz
                </motion.button>
                <motion.button
                    whileHover={{
                        backgroundColor: "transparent",
                        border: "2px solid var(--color-treevia-custom)",
                        color: "var(--color-white)",
                    }}
                    whileTap={{
                        scale: 0.8,
                    }}
                    className="w-full"
                    onClick={handleStartButton}
                >
                    Preview
                </motion.button>
            </div>
        </div>
    );
};

export default QuizCard;
