// Path: client\src\component\Navbar.jsx
import useAuthStore from "@/stores/useAuthStore";
import { motion } from "framer-motion";
import {
	ChartNoAxesColumnIncreasingIcon,
	Folder,
	Info,
	Menu,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../assets/logos.png";
import {
	HeaderVariant
} from "../utils/Animation/variant/IntroAnimationVariant";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { ProfileMenu } from "./navbar/ProfileMenu";
import { ProfileTrigger } from "./navbar/ProfileTrigger";

const links = [
	{
		link: "/quizzes",
		icon: <Folder />,
		name: "Categories",
	},
	{
		link: "/leaderboard",
		icon: <ChartNoAxesColumnIncreasingIcon />,
		name: "Leaderboard",
	},
	{
		link: "/result",
		icon: <Info />,
		name: "About",
	},
	// {
	// 	link: "",
	// 	name: "About",
	// },
];

const Navbar = () => {
	const [display, setDisplay] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const isHome = useRef(null);

	const location = useLocation();

	useEffect(() => {
		setDisplay(false);
		setShowNav(false);
	}, [location]);

	// const trigger 

	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logOut);

	return (
		<motion.div
			variants={HeaderVariant}
			initial="initial"
			animate="animate"
			ref={isHome}
			transition={{ duration: 1 }}
			className={`flex md:flex-row flex-row-reverse items-center w-full sticky z-50 top-0 bg-background justify-between md:justify-around p-4 border-b border-muted`}
		>
			<button
				onClick={() => setShowNav(!showNav)}
				className="cursor-pointer block md:hidden"
			>
				{showNav ? <X color="#fff" /> : <Menu color="#fff" />}
			</button>
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
				<ProfileTrigger
					user={user}
					display={display}
					setDisplay={setDisplay}
				/>
			</nav>
			{showNav && (
				<>
					<nav
						className={`md:hidden gap-5 flex-col z-50 h-screen w-full absolute bg-background top-15 left-0 font-semibold text-sm text-secondary p-10 font-poppins`}
					>
						<MobileMenu
							user={user}
							setDisplay={setDisplay}
							links={links}
						/>
					</nav>
				</>
			)}
			<ProfileMenu user={user} logout={logout} display={display} />
		</motion.div>
	);
};

export default Navbar;
