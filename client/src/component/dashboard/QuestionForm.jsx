import React, { useEffect, useState } from "react";
import Input from "../Input";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../features/uiSlice";
import useInput from '../../hooks/useInput'
import { getAllQuiz } from "../../features/auth/reduxThunk";
import { createQuestion } from "../../features/quiz/quizThunk";

const QuestionForm = () => {
    // const modal = useSelector((state) => state.ui.modal);
    const dispatch = useDispatch();
    const { quizzes, loading, error } = useSelector((state) => state.quiz);
    const [title, setTitle] = useState()

    const [ question, setQuestion ] = useState( "" );
    const [ options, setOptions ] = useState( [ "", "", "", "" ] );
    const [ correctAnswer, setCorrectAnswer ] = useState( "" );
    const questionData = {
        questionText: question,
        options,
        correctAnswer
    };

    const [questions, setQuestions] = useState(questionData)
    // const [question, handleQuestionChange] = useInput('') 

    useEffect(() => {
        dispatch(getAllQuiz());
    }, [dispatch])
    

    const handleOptionsChange = (index, value) => {
        const updated = [...options]
        updated[index] = value
        setOptions(updated)
    }

    console.log(quizzes)
    

    const hoverVariant = {
        borderHover: {
            backgroundColor: "var(--color-teal-700)",
            color: "#fff",
        },
        bgHover: {
            backgroundColor: "transparent",
            border: "1px solid var(--color-teal-700)",
            color: "#000",
        },
        tap: {
            scale: 0.8,
        },
    };

    console.log(questions.questionText)

    const handleSubmit = (e) => {
        e.preventDefault()
        // const { questionText, options, correctAnswer } = question
        dispatch( createQuestion( { quizId: title, questionData } ) );
        console.log({title, question});
    }
    
    return (
        <motion.form
            initial={{
                opacity: 0,
                scale: 0,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0,
            }}
            onSubmit={handleSubmit}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-5 px-10 w-130 h-150 rounded-2xl"
        >
            <h2 className="text-3xl font-opensans font-bold mb-3">
                Add Question
            </h2>

            {/* <input type="text" placeholder="Title" name="title" value={quiz.title} onChange={handleQuizChange} className='bg-white border border-slate-400 p-3 rounded-xl w-full' /> */}

             <label className="">
                Choose quiz to add question
                <select value={title} onChange={(e) => setTitle(e.target.value)}  className="w-full p-2 mb-1 mt-4 border border-slate-400 rounded-xl">
                    <option value="">Select Quiz</option>
                    {quizzes.map((quiz) => (
                        <option key={quiz._id} className="" value={quiz._id}>
                            {quiz.title}
                        </option>
                    ))}
                </select>
                <br />
            </label>

            <Input type="text" name="title" label="Question Text" value={question} handleChange={(e) => setQuestion(e.target.value)} />

            <div className="my-2 flex flex-col space-y-1">
                <label htmlFor="">Options</label>
                {options.map((opt, index) => (
                    <Input type="text" value={opt} name={`Option ${index + 1}`} handleChange={(e) => handleOptionsChange(index, e.target.value)} />
                ))}
            </div>
            <label className="">
                Correct Answer
                <select value={correctAnswer} onChange={ (e) => setCorrectAnswer(e.target.value)}  className="w-full p-2 mt-2 border border-slate-400 rounded-xl">
                    <option value="">Select Answer</option>
                    {options.map((opt, index) => (
                        <option className="" value={opt}>
                            {opt || `Option ${index + 1}`}
                        </option>
                    ))}
                </select>
                <br />
            </label>
            <div className="m-4 flex justify-end gap-5">
                <motion.button
                    variants={hoverVariant}
                    whileHover="borderHover"
                    whileTap="tap"
                    type="button"
                    className="px-6 rounded-xl py-2 border border-teal-700 cursor-pointer"
                    onClick={() => dispatch(hide())}
                >
                    Cancel
                </motion.button>
                <motion.button
                    variants={hoverVariant}
                    whileTap="tap"
                    whileHover="bgHover"
                    className="px-14 py-3 text-white rounded-xl bg-teal-700 cursor-pointer"
                >
                    Save
                </motion.button>
            </div>
        </motion.form>
    );
};

export default QuestionForm;
