// Path: client\src\pages\Dashboard\Admin\AdminDashboard.jsx
import Card from "../../../component/Card";
import CreateQuiz from "../../../component/dashboard/createQuiz/CreateQuiz";
import Header from "../../../component/dashboard/Header";
import SideBar from "../../../component/dashboard/SideBar";
import Image from "../../../assets/images/Screenshot from 2025-06-07 18-30-42.png";
import BreadCrumbs from "../../../component/BreadCrumbs";
import { useEffect, useState } from "react";
import api from "../../../utils/axios";
const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [quizzes, setQuizzes] = useState([]);
    const [users, setUsers] = useState([]);

    const activeUsers = users?.filter((act) => {
        return act.isOnline === true
    })

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await api.get('/quiz');
                setQuizzes(response.data);
            } catch (err: any) {
                console.error(err.message);
            }
        };
        fetchQuizzes();
    }, []);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/user');
                setUsers(response.data);
            } catch (err: any) {
                console.error(err.message);
            }
        };
        fetchUsers();
    }, []);

    console.log(activeUsers);

    

    const arrays = [
        {
            title: "History of Art",
            date: "April 23, 2025",
        },
        {
            title: "General Knowledge",
            date: "April 23, 2025",
        },
        {
            title: "Mathematics",
            date: "April 23, 2025",
        },
        {
            title: "English",
            date: "April 23, 2025",
        },
    ];

    return (
        <div className="h-full w-full bg-treevia-light px-8 bg- py-4">
            <h1 className="text-4xl font-lora font-bold">
                {user.username}
            </h1>
            <div className="grid grid-cols-2 gap-8">
                <div className="p-4 flex gap-5 items-center justify-center col-span-2">
                    <Card name="Total Quizzes" className="px-12 rounded-xl text-white bg-treevia-card py-8 shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins flex flex-col items-center justify-center" value={quizzes.length} />
                    <Card name="Total Users" className="px-12 rounded-xl text-white bg-treevia-card py-8 shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins flex flex-col items-center justify-center" value={users?.length}/>
                    <Card name="Total Questions" className="px-12 rounded-xl text-white bg-treevia-card py-8 shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins flex flex-col items-center justify-center" value="20" />
                    <Card name="Active users" className="px-12 rounded-xl text-white bg-treevia-card py-8 shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins flex flex-col items-center justify-center" value={activeUsers?.length} />
                </div>
                <div className="p-4 bg-yellow-600 text-treevia-primary shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins rounded-xl">
                    <h2 className="font-bold">Recent Quiz Activities</h2>
                    <ul className="flex flex-col gap-2 p-4">
                        {quizzes.slice(0,4).map((arr, index) => (
                            <li className="flex justify-between flex-wrap p-4 border-b-2 border-slate-500/40">
                                <p>{arr.title}</p>
                                <span>{Date.now()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 bg-white shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins rounded-xl">
                    <h2 className="font-bold">Quiz Attempts</h2>
                    <img src={Image} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
