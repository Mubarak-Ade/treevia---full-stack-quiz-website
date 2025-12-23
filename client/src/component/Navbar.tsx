// Path: client\src\component\Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import * as Fa from "react-icons/fa6";
import Logo from "../assets/logos.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
	HeaderVariant,
	LinkVariant,
} from "../utils/Animation/variant/IntroAnimationVariant";
import useAuthStore from "@/stores/useAuthStore";

const Navbar = () => {
	const [isFixed, setIsFixed] = useState(false);
	const [display, setDisplay] = useState(false);
	const isHome = useRef(null);

	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logOut);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			scrollY >= 50 ? setIsFixed(true) : setIsFixed(false);
		});
	}, [location]);

	const links = [
		{
			link: "/quizzes",
			name: "Categories",
		},
		{
			link: "/Quizzes",
			name: "Leaderboard",
		},
		{
			link: "/Result",
			name: "About",
		},
		// {
		// 	link: "",
		// 	name: "About",
		// },
	];

	// document.getElementById(elementId).style

	return (
		<motion.div
			variants={HeaderVariant}
			initial="initial"
			animate="animate"
			ref={isHome}
			transition={{ duration: 1 }}
			className={`flex items-center justify-around p-3 border-b border-muted`}
		>
			<NavLink to="/">
				<div className="flex gap-4 items-center">
					<img
						className="size-10 rounded-full"
						src={Logo}
						alt="Logo"
					/>
					<h1 className={`text-4xl font-pacifico text-white`}>
						Treevia
					</h1>
				</div>
			</NavLink>
			<nav
				className={`flex font-semibold text-sm text-secondary rounded-full justify-center items-center font-poppins`}
			>
				<ul className="flex items-center justify-center gap-2">
					{links.map((item, index) => (
						<motion.span
							key={index}
							className="px-5 py-2 rounded-full"
							variants={LinkVariant}
							whileHover="hover"
							whileTap="tap"
						>
							<NavLink
								className={({ isActive }) =>
									`${
										isActive
											? "text-custom px-5 py-3 rounded-full"
											: ""
									}`
								}
								to={`${item.link.toLowerCase()}`}
							>
								{item.name}
							</NavLink>
						</motion.span>
					))}
				</ul>
			</nav>
			{user ? (
				<div className="relative flex flex-row-reverse">
					<motion.span
						whileTap={{ scale: 0.8 }}
						className="flex justify-center text-2xl rounded-full cursor-pointer text-teal-100 items-center bg-card p-3"
						onClick={() => setDisplay((prev) => !prev)}
					>
						<Fa.FaUser />
					</motion.span>
					{display && (
						<div className="fixed bg-card shadow-2xl text-white w-60 m-2 p-5 top-20 z-50 right-0 rounded-xl">
							<h2 className="capitalize">Welcome {user.username}</h2>
							{/* <h4>{user.email}</h4> */}
							<button
								className="bg-primary-btn text-secondary-btn font-semibold rounded-xl w-full p-2 mt-4 cursor-pointer"
								onClick={logout}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			) : (
				<motion.span
					className="px-5 py-2 rounded-full font-semibold text-sm text-secondary bg-secondary-btn"
					variants={LinkVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<NavLink to="/login">Login</NavLink>
				</motion.span>
			)}
		</motion.div>
	);
};

export default Navbar;
