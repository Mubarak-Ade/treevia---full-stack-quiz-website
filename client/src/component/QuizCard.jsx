import React from "react";
import * as Fa from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

const QuizCard = ({ id, title, category, questions, timelimit }) => {

    // const questionId = questions[0]._id

    const navigate  = useNavigate()

    const handleStartButton = () => {
        navigate(`/quiz/${id}/start`)
    }

    return (
        <div className="bg-treevia-card text-white rounded-2xl shadow-2xl h-50 grid grid-cols-1 px-5 py-2.5 max-w-200 items-center center">
            <div>
                <h1 className="text-2xl py-1 px-2  font-bold font-sourgummy text-start">
                    {title}
                </h1>
                <h2 className="w-full font-montserrat flex justify-between px-2">
                    {category}
                </h2>
                <p className="p-2 h-23">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aspernatur?</p>
            </div>
            <motion.button
                whileHover={{
                    backgroundColor: "transparent",
                    border: "2px solid var(--color-treevia-accent)",
                    color: "var(--color-white)",
                }}
                whileTap={{
                    scale: 0.8,
                }}
                className="bg-treevia-hover text-white p-2 rounded-2xl cursor-pointer font-sourgummy col-start-2 col-end-3 h-10 w-40 mt-10"
                onClick={handleStartButton}
            >
                Start Quiz
            </motion.button>
            <div className="flex items-center justify-center w-40">
                <p className="w-full flex gap-2 p-2 items-center">
                    <Fa.FaClock />
                    {timelimit}
                    <span>mins</span>
                </p>
                <span className="w-full flex gap-2 p-2">
                    {questions?.length}
                    <span>questions</span>
                </span>
            </div>
        </div>
    );
};

export default QuizCard;
