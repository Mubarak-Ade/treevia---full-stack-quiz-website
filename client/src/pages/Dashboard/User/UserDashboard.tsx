import Card from "../../../component/Card";
import CreateQuiz from "../../../component/dashboard/createQuiz/CreateQuiz";
import Header from "../../../component/dashboard/Header";
import SideBar from "../../../component/dashboard/SideBar";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const arrays = [
        "Sample Quiz 1",
        "Sample Quiz 2",
        "Sample Quiz 3",
        "Sample Quiz 4",
    ];

    return (
        <div className="h-full w-full px-8 bg-teal-100/20 py-4">
            <h2 className="text-4xl font-lora font-bold m-4 capitalize">
                {user.username}
            </h2>
            <div className="flex flex-col items-center">
                <div className="p-4 flex gap-5 items-center justify-center col-span-2">
                    <Card name="Total Quizzes" value="20" />
                    <Card name="Total Quizzes" value="20" />
                    <Card name="Total Quizzes" value="20" />
                </div>
                <div className="p-4 bg-white shadow-[0px_0px_15px_0px] shadow-slate-300 font-poppins rounded-xl min-w-200">
                    <h2 className="font-bold">Available Quizzes</h2>
                    <ul className="flex flex-col gap-4 p-4">
                        {arrays.map((arr, index) => (
                            <li className="flex justify-between p-4 items-center rounded-xl">
                                <p>{arr}</p>
                                <button className="py-2.5 px-5 text-white bg-teal-700 rounded-xl">
                                    Start Quiz
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
