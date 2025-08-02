// Path: client\src\component\dashboard\createQuiz\CreateQuiz.jsx
import React, { useState } from "react";
import useInput from "../../../hooks/useInput";
import CreateQuestions from "./CreateQuestions";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz } from "../../../features/quiz/quizThunk";
import { Link, useNavigate } from "react-router";

const CreateQuiz = () => {
    const questionData = [
        {
            question: "",
            options: {
                A: "",
                B: "",
                C: "",
                D: "",
            },
            correctAnswer: "",
        },
    ];

    const { quizzes, loading, error } = useSelector((state) => state.quiz);

    const { quiz, message, quizTitle } = quizzes || {}

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const categories = ["Select Category", "Math", "English", "General Knowledge", "Programming"];

    const [title, handleTitleChange, resetTitle] = useInput("");
    const [timeLimit, handleTimeLimitChange, resetTimeLimit] = useInput(0);
    const [createdBy, handleCreatedByChange, resetCreatedBy] = useInput("");
    const [category, handleCategoryChange, resetCategory] = useInput("Select Category");
    const [description, handleDescriptionChange, resetDescription] = useInput("");
    const [questions, setQuestions] = useState(questionData);

    const handleQuestionsChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleAnswersChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionsChange = (index, optionKey, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options[optionKey] = value;
        setQuestions(updatedQuestions);
    };

    const quizData = { title, category, timeLimit, description }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        resetTitle();
        resetTimeLimit();
        resetCreatedBy();
        resetCategory();
        resetDescription();
        setQuestions(questionData);
        const res = await dispatch(createQuiz(quizData));
        const {quiz, message} = res.payload
        if (quiz) {    
            navigate(`${quiz}/add-question`)
            alert(message)
        } else {
            alert(error)
        }
        // navigate(`afkljii990i09i49/add-question`)
        // const quiz = {title, category, timeLimit, description}
        console.log(quiz)
    };



    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold m-4 font-montserrat text-treevia-text">Create a Quiz</h2>
            <div className="flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-150"
                >
                    <label className="p-2 flex flex-col font-poppins">
                        Quiz Title
                        <input
                            value={title}
                            onChange={handleTitleChange}
                            type="text"
                            className="bg-white px-4 py-2 rounded-lg outline-teal-700 border border-treevia-accent"
                        />
                    </label>
                    <label className="p-2 flex flex-col font-poppins">
                        Description
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter quiz description"
                            rows={4}
                            className="bg-white px-4 py-2 rounded-xl border border-treevia-accent"
                        ></textarea>
                    </label>
                    <label className="p-2 flex flex-col font-poppins">
                        Category
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            name="category"
                            className="bg-white px-4 py-3 rounded-xl border border-treevia-accent"
                        >
                            {categories.map((cat, index) => (
                                <option value={cat} className="font-poppins" key={index}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="p-2 flex flex-col font-poppins">
                        Time Limit
                        <input
                            value={timeLimit}
                            onChange={handleTimeLimitChange}
                            type="number"
                            className="bg-white px-4 py-2 rounded-xl border border-treevia-accent"
                            placeholder="Enter a quiz time limit"
                        />
                    </label>
                    <button className="bg-treevia-primary p-2 w-full text-white rounded-xl self-center font-poppins cursor-pointer" type="submit">
                        Create Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
