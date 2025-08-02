import React, { useEffect } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { getAllQuiz, getQuizById } from "../../features/auth/reduxThunk";
import { useDispatch, useSelector } from "react-redux";
import SvgLoader from "../../utils/Animation/SvgLoader";
import Menu from "./Menu";
import { deleteQuiz } from "../../features/quiz/quizThunk";

const QuizTable = () => {

    const { quizzes, loading, currentQuiz } = useSelector((state) => state.quiz);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuiz());
    }, [dispatch]);

    if (loading) return <SvgLoader text="Getting Quizzes" />;


    return (
        <div className="mt-10 overflow-hidden border border-slate-300 rounded-xl min-w-full  h-full ">
            <table className=" bg-white table-auto rounded-xl w-full">
                <thead className="border-b border-slate-300 ">
                    <tr className="text-start">
                        <th className="px-6 py-3 text-start">Name</th>
                        <th className="px-6 py-3 text-start">Email</th>
                        <th className="px-6 py-3 text-start">Role</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y rounded-xl divide-slate-300">
                    {quizzes &&
                        quizzes?.map((quiz, index) => (
                            <tr className="" key={quiz._id}>
                                <td className="px-6 py-3">{quiz.title}</td>
                                <td className="px-6 py-3">{quiz.category}</td>
                                <td className="px-6 py-3">
                                    {quiz.questions.length}
                                </td>
                                <td className="text-center">
                                    <button className="bg-teal-700 px-3 py-1 text-white rounded-2xl">
                                        {!quiz.isOnline ? "Active" : "Offline"}
                                    </button>
                                </td>
                                <td><Menu quiz={quiz} Delete={deleteQuiz} View={getQuizById} id={quiz._id} /></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuizTable;
