import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import api from "../../../utils/axios";
import SvgLoader from "../../../utils/Animation/SvgLoader";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await api.get('/user');
                setUsers(response.data);
            } catch (err: any) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <SvgLoader text="Fetching data" />;

    return (
        <div className="w-full h-screen p-8 bg-teal-50">
            <h1 className="text-5xl font-ubuntu">Users</h1>
            <div className="flex flex-col items-center justify-center">
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
                <div className="mt-10 overflow-hidden border border-slate-300 rounded-xl">
                    <table className="p-4 bg-white table-auto min-w-150 h-80 rounded-xl ">
                        <thead className="border-b border-slate-300 ">
                            <tr className="text-start">
                                <th className="px-6 py-3 text-start">Name</th>
                                <th className="px-6 py-3 text-start">Email</th>
                                <th className="px-6 py-3 text-start">Role</th>
                                <th className="px-6 py-3 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y rounded-xl divide-slate-300">
                            {users &&
                                users.map((user) => (
                                    <tr className="" key={user._id}>
                                        <td className="px-6 py-3">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-3">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-3">
                                            {user.role}
                                        </td>
                                        <td
                                            className={`${
                                                user.isOnline
                                                    ? "bg-green-300"
                                                    : "bg-red-300"
                                            } px-6 py-3`}
                                        >
                                            {user.isOnline
                                                ? "Active"
                                                : "Offline"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
