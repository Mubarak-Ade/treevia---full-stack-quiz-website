// Path: client\src\component\Navbar.jsx
import useAuthStore from "@/stores/useAuthStore";
import { motion } from "framer-motion";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import * as Fa from "react-icons/fa6";
import { NavLink, useLocation } from "react-router";
import Logo from "../assets/logos.png";
import {
	HeaderVariant,
	LinkVariant,
} from "../utils/Animation/variant/IntroAnimationVariant";
import { Menu, X } from "lucide-react";

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

interface ProfileProps {
	user: User | null;
	setDisplay: React.Dispatch<SetStateAction<boolean>>;
	display: boolean;
	logout: () => void;
}

const Profile = ({ user, setDisplay, display, logout }: ProfileProps) => {
	return (
		<>
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
							<h2 className="capitalize">
								Welcome {user.username}
							</h2>
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
					className="px-8 py-4 md:py-2 text-center text-background rounded-full font-semibold text-sm bg-custom"
					variants={LinkVariant}
					whileHover="hover"
					whileTap="tap"
				>
					<NavLink to="/login">Login</NavLink>
				</motion.span>
			)}
		</>
	);
};

interface Link {
	link: string,
	name: string
}

const DesktopMenu = ({links} : {links: Link[]}) => {
	return (
		<>
			<ul className="flex items-center justify-center gap-2 text-sm">
				{links.map((item, index) => (
					<motion.span
						key={index}
						className="text-white hover:text-primary px-4 py-3 transition-colors w-full "
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
		</>
	);
};

const MobileMenu = ({links} : {links: Link[]}) => {
	return (
		<>
			<ul className="flex flex-col text-white text-2xl items-center justify-center">
				{links.map((item, index) => (
					<motion.span
						key={index}
						className="p-5 rounded-full"
						whileHover={{
							color: "var(--color-custom)"
						}}
						whileTap="tap"
					>
						<NavLink
							className={({ isActive }) =>
								`${
									isActive
										? "text-custom p-5 rounded-full"
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
		</>
	);
};

const Navbar = () => {
	const [display, setDisplay] = useState(false);
	const [showNav, setShowNav] = useState(false)
	const isHome = useRef(null);

	const location = useLocation()

	useEffect(() => {
		setShowNav(false)
	}, [location])
	

	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logOut);

	return (
		<motion.div
			variants={HeaderVariant}
			initial="initial"
			animate="animate"
			ref={isHome}
			transition={{ duration: 1 }}
			className={`flex items-center sticky z-50 top-0 bg-background justify-between md:justify-around p-4 border-b border-muted`}
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
				className={`md:flex hidden gap-5 font-semibold text-sm text-secondary rounded-full justify-center items-center font-poppins`}
			>
				<DesktopMenu links={links} />
				<Profile
					user={user}
					display={display}
					setDisplay={setDisplay}
					logout={logout}
				/>
			</nav>
			{showNav && (
				<nav
					className={`flex md:hidden gap-5 flex-col z-50 h-screen w-full absolute bg-background top-15 left-0 font-semibold text-sm text-secondary p-10 font-poppins`}
				>
					<MobileMenu links={links} />
					<Profile
						user={user}
						display={display}
						setDisplay={setDisplay}
						logout={logout}
					/>
				</nav>
			)}
			<button onClick={() => setShowNav(!showNav)} className="cursor-pointer block md:hidden">
				{showNav ? <X color="#fff" /> : <Menu color="#fff" />}
			</button>
		</motion.div>
	);
};

export default Navbar;
