// Path: client\src\pages\Dashboard\Admin\QuizManagement.jsx
import { useEffect, useRef, useState } from "react";
import api from "../../../utils/axios";
import { AiOutlineSearch } from "react-icons/ai";
import SvgLoader from "../../../utils/Animation/SvgLoader";
import { Link } from "react-router";
import QuizTable from "../../../component/dashboard/QuizTable";

const QuizManagement = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [showMenu, setShowMenu] = useState(null);
    const menuRef = useRef();
    const [openFor, setOpenFor] = useState(null);

    const openMenu = (id) => {
        setOpenFor(id);
        console.log(id);
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                const response = await api.get('/quiz');
                setQuizzes(response.data);
            } catch (err: any) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    console.log(quizzes);

    
    const handleDelete = async () => {
        try {
            await api.delete(`/quiz/${openFor}`);
            setQuizzes(quizzes.filter(q => q._id !== openFor));
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const viewQuiz = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/quiz/${openFor}`);
            setCurrentQuiz(response.data);
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(currentQuiz);


    return (
        <div className="h-screen bg-treevia-light w-full container">
            <div className="flex justify-between px-8 py-4 items-center">
                <h1 className="text-4xl font-ubuntu">Quizzes</h1>
                <Link
                    to="create"
                    className="bg-teal-600 px-8 py-2 rounded-xl text-white"
                >
                    New Quiz
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center py-4 px-8">
                <div className="mt-10 h-12 flex bg-white items-center w-120 gap-4 00 rounded-xl p-0.5">
                    <label htmlFor="" className="ml-2 text-2xl">
                        <AiOutlineSearch />
                    </label>
                    <input
                        className="w-full h-full rounded-current custom-transparent rounded-r-xl"
                        type="text"
                        placeholder="Search users"
                    />
                </div>
                <QuizTable handleDelete={handleDelete} menuRef={menuRef} quizzes={quizzes || {}} />
            </div>
        </div>
    );
};

export default QuizManagement;
