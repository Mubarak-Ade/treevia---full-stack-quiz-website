import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()

    console.log(user)
    
    return user?.role === "admin" ? <Outlet /> : navigate('/unauthorize');
};

export default AdminRoute;
