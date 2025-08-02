// Path: client\src\component\dashboard\AdminDashboardLayout.jsx
import React from "react";
import { Outlet, Route, Routes } from "react-router";
import QuizPage from "../../pages/Quiz/QuizPage";
import SideBar from "./SideBar";
import BreadCrumbs from "../BreadCrumbs";

const AdminDashboardLayout = () => {
    return (
        <div className="flex w-full h-screen">
            <SideBar/>
            <main className="w-full overflow-y-scroll bg-treevia-light">
                <BreadCrumbs />
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboardLayout;
