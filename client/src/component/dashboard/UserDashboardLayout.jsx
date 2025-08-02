import React from "react";
import { Outlet, Route, Routes } from "react-router";
import QuizPage from "../../pages/Quiz/QuizPage";
import SideBar from "./SideBar";
import BreadCrumbs from "../BreadCrumbs";

const UserDashboardLayout = () => {
    return (
        <div className="flex w-full">
            <SideBar/>
            <main>
                <BreadCrumbs />
                <Outlet />
            </main>
        </div>
    );
};

export default UserDashboardLayout;
