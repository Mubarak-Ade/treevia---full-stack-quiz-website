import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./utils/Animation/loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";

function App() {
	// const { loading } = useSelector((state) => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		const user = JSON.parse(localStorage.getItem('user'))

		if (token && user) {
			dispatch(setUser({token, user}))
		}
	}, []);
	return (
		<BrowserRouter>
			<AppRoutes/>
		</BrowserRouter>
	);
}
export default App;
