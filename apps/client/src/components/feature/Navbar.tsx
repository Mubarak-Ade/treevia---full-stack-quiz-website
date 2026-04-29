// Path: client\src\component\Navbar.jsx
import useAuthStore from "@/modules/auth/store/auth.store";
import { motion } from "framer-motion";
import {
	ChartNoAxesColumnIncreasingIcon,
	Folder,
	Info,
	Menu,
	MoonStar,
	SunMedium,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "../../assets/logos.png";
import {
	HeaderVariant
} from "../../utils/Animation/variant/IntroAnimationVariant";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { ProfileMenu } from "./navbar/ProfileMenu";
import { ProfileTrigger } from "./navbar/ProfileTrigger";
import useThemeStore from "@/stores/useThemeStore";
import { useLogout } from "@/modules/auth/controllers/auth.controller";

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
		link: "*",
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
	const theme = useThemeStore((s) => s.theme);
	const toggleTheme = useThemeStore((s) => s.toggleTheme);

	useEffect(() => {
		setDisplay(false);
		setShowNav(false);
	}, [location]);


	const user = useAuthStore((s) => s.user);
	const logoutMutation = useLogout();	

	const logout = () => logoutMutation.mutate()
	

	return (
		<motion.div
			variants={HeaderVariant}
			initial="initial"
			animate="animate"
			ref={isHome}
			transition={{ duration: 1 }}
			className="bg-surface backdrop-blur-md flex md:flex-row flex-row-reverse items-center w-full sticky z-50 top-0 justify-between gap-4 px-4 py-3 md:px-8"
		>
			<button
				onClick={() => setShowNav(!showNav)}
				className=" cursor-pointer block md:hidden p-3 text-primary"
			>
				{showNav ? <X /> : <Menu />}
			</button>
			<NavLink to="/">
				<div className="flex gap-4 items-center">
					<img
						className="size-11 rounded-2xl object-cover shadow-sm"
						src={Logo}
						alt="Logo"
					/>
					<div>
						<h1 className="text-3xl md:text-4xl font-pacifico text-primary">
						Treevia
						</h1>
					</div>
				</div>
			</NavLink>
			<nav
				className="md:flex hidden gap-4 font-semibold text-sm text-secondary rounded-full justify-center items-center font-poppins"
			>
				<DesktopMenu links={links} />
				<button
					type="button"
					onClick={toggleTheme}
					className=" flex size-12 items-center justify-center text-light-neutral transition-transform hover:-translate-y-0.5"
					aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
				>
					{theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
				</button>
				<ProfileTrigger
					user={user}
					display={display}
					setDisplay={setDisplay}
				/>
			</nav>
			{showNav && (
				<nav className="bg-surface backdrop-blur-md md:hidden gap-5 flex-col z-50 min-h-[calc(100vh-5.5rem)] w-full absolute top-full left-0 font-semibold text-sm text-secondary p-6 font-poppins">
					<MobileMenu
						user={user}
						setDisplay={setDisplay}
						links={links}
						theme={theme}
						toggleTheme={toggleTheme}
					/>
				</nav>
			)}
			<ProfileMenu user={user} logout={logout} display={display} setDisplay={setDisplay} />
		</motion.div>
	);
};

export default Navbar;
