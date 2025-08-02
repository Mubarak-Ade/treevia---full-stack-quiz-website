import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuiz } from "../../features/auth/reduxThunk";
import QuizCard from "../../component/QuizCard";
import { Link } from "react-router";

const Quiz = () => {
    const { quizzes, error, loading } = useSelector((state) => state.quiz);

    console.log(quizzes)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllQuiz())
    }, []);

    return (
        <div className="h-screen bg-treevia-light grid gap-5 lg:grid-cols-3 grid-cols-1 px-4 py-8">
            {quizzes && quizzes.map((quiz) => (
                <Link to={`/quiz/${quiz._id}`}>
                    <QuizCard id={quiz._id} title={quiz.title} key={quiz._id} category={quiz.category} questions={quiz.questions} timelimit={quiz.timeLimit} />
                </Link>
            ))}
        </div>
    );
};

export default Quiz;
