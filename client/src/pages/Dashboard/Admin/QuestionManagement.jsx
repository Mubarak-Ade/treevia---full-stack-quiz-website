import React, { useEffect } from "react";
import Table from "../../../component/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestions } from "../../../features/auth/reduxThunk";
import Menu from "../../../component/dashboard/Menu";
import { Link } from "react-router";
import QuestionForm from "../../../component/dashboard/QuestionForm";
import { show } from "../../../features/uiSlice";
import { AnimatePresence } from "framer-motion";
import { deleteQuestion, editQuestion } from "../../../features/quiz/quizThunk";
import SvgLoader from "../../../utils/Animation/SvgLoader";

const QuestionManagement = () => {
    const {questions, loading} = useSelector((state) => state.quiz);
    const modal = useSelector((state) => state.ui.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllQuestions());
    }, []);

    console.log(questions)


    return (
        <div className="h-screen px-4 py-6">
            <div className="flex justify-between ">
                <h1 className="text-3xl font-opensans font-bold">
                    Question Management
                </h1>
                <button
                    type="button"
                    onClick={() => dispatch(show())}
                    className="px-4 py-2 bg-teal-700 text-white rounded-xl cursor-pointer"
                >
                    Add Question
                </button>
            </div>
            <div className="mt-5 overflow-hidden border flex justify-self-center-safe border-slate-300 rounded-xl w-full">
                <table className="bg-white table-auto rounded-xl w-full">
                    <thead className="border-b border-slate-300 bg-teal-600 text-white">
                        <tr className="text-start">
                            <th className="px-6 py-3 text-start">Questions</th>
                            <th className="px-6 py-3 text-start">Options</th>
                            <th className="px-6 py-3 text-start">Answers</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y rounded-xl divide-slate-300">
                        {questions &&
                            questions.map((quest, index) => (
                                <tr className="" key={quest._id}>
                                    <td className="px-6 py-3">
                                        {quest.questionText}
                                    </td>
                                    <td className="px-6 py-3 flex">
                                        {Object.entries(quest?.options)
                                            .slice(0, 1)
                                            .map(([key, value]) => (
                                                <div className="">
                                                    <p key={key}>{value}</p>
                                                </div>
                                            ))}
                                        <span>...</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        {quest.correctAnswer}
                                    </td>
                                    <td><Menu Delete={deleteQuestion} View={null} Edit={editQuestion} id={quest._id} /></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <AnimatePresence>{modal && <QuestionForm />}</AnimatePresence>
        </div>
    );
};

export default QuestionManagement;
