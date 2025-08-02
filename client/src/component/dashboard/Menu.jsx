import { SlOptions } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { BsEyeFill } from "react-icons/bs";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizById } from "../../features/auth/reduxThunk";
import { deleteQuiz, getSingleQuiz } from "../../features/quiz/quizThunk";
import { closeMenu, openMenu } from "../../features/quiz/quizSlice";
import { useNavigate } from "react-router";
import { show } from "../../features/uiSlice";
import SvgLoader from "../../utils/Animation/SvgLoader";
import { motion } from "framer-motion"

const Menu = ({ data, View, Delete , Edit, id }) => {
    const dispatch = useDispatch();
    const { openFor, loading } = useSelector((state) => state.quiz);

    const isOpen = openFor === id;
    const menuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                dispatch(closeMenu());
            }
        };

        document.addEventListener("mousedown", handleClickOutSide);
        return () =>
            document.removeEventListener("mousedown", handleClickOutSide);
    }, []);

    const handleView = (id) => {
        dispatch(View(id));
        navigate(`/quiz/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(Delete(id));
        if (loading) return <SvgLoader text="Deleting Quiz...." />
    };
    
    const handleEdit = (id) => {
        
        dispatch(show());
    };

    const buttonVariant = {
        initial : {
            rotate: 0
        },
        tap : {
            scale: .8
        },
        hover : {
            scale: 1.1,
            rotate: [0, 5, -5, 0]
        }
    }
    
    

    return (
        <div ref={menuRef} className="flex justify-center">
            <div
                className={`lg:flex hidden items-center justify-center gap-2 text-xl`}
            >
                <motion.span
                    onClick={() => handleView(id)}
                    className="cursor-pointer text-blue-600"
                >
                    <BsEyeFill />
                </motion.span>
                <motion.span className="cursor-pointer text-treevia-success"
                    onClick={() => handleEdit(id)}
                >
                    <MdEdit />
                </motion.span>
                <motion.span
                    initial="initial"
                    whileTap="tap"
                    whileHover="hover"
                    variants={buttonVariant}
                    onClick={() => handleDelete(id)}
                    className="cursor-pointer text-treevia-error"
                >
                    <MdDelete />
                </motion.span>
            </div>
            <span
                className="lg:hidden cursor-pointer"
                onClick={() => dispatch(openMenu(id))}
            >
                <SlOptions />
            </span>
            {isOpen && (
                <div className=" bg-white fixed right-0 w-40 ml-10 mr-4 rounded-2xl">
                    <li
                        onClick={handleView}
                        className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:text-white cursor-pointer hover:bg-teal-700"
                    >
                        <span>
                            <BsEyeFill />
                        </span>
                        View
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:text-white cursor-pointer hover:bg-teal-700">
                        <span>
                            <MdEdit />
                        </span>
                        Edit
                    </li>
                    <button
                        className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:text-white cursor-pointer hover:bg-teal-700"
                        onClick={handleDelete(id)}
                    >
                        <span>
                            <MdDelete />
                        </span>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
