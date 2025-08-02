// Path: client\src\component\Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import * as Fa from "react-icons/fa6";
import Logo from "../assets/logos.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { HeaderVariant, LinkVariant } from "../utils/Animation/variant/IntroAnimationVariant";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const Navbar = () =>
{
    const [ isFixed, setIsFixed ] = useState( false );
    const [ user, setUser ] = useState( null );
    const [ display, setDisplay ] = useState( false );
    const isHome = useRef( null )

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () =>
    {
        dispatch( logOut() );
        setDisplay( false );
        navigate( "/login" );
    };

    useEffect( () =>
    {
        setUser( JSON.parse( localStorage.getItem( "user" ) ) );
    }, [] );

    useEffect( () =>
    {
        window.addEventListener( "scroll", () =>
        {
            scrollY >= 50 ? setIsFixed( true ) : setIsFixed( false )
        } )

        if ( location.pathname === "/" )
        {
            isHome.current.style.position = "fixed"
            isHome.current.style.backgroundColor = "transparent"
        }
    }, [ location ] );

    const links = [
        {
            link: "/",
            name: "Home"
        },
        {
            link: "Quizzes",
            name: "Quizzes"
        },
        {
            link: "Result",
            name: "Result"
        }
    ]

    // document.getElementById(elementId).style


    return (
        <motion.div
            variants={ HeaderVariant }
            initial="initial"
            animate="animate"
            ref={ isHome }
            transition={ { duration: 1 } }
            className={ `z-999 w-full ${ isFixed ? "bg-treevia-primary fixed top-0" : "bg-treevia-light" } px-10 py-2 shadow-xs flex justify-between items-center` }
        >
            <NavLink to="/">
                <div className="flex gap-4 items-center">
                    <img
                        className="size-10 rounded-full"
                        src={ Logo }
                        alt="Logo"
                    />
                    <h1 className={ `${ isFixed || location.pathname === "/" ? "text-white" : "text-treevia-primary" } text-4xl font-pacifico` }>Treevia</h1>
                </div>
            </NavLink>
            <nav className={ `flex text-lg border ${ isFixed || location.pathname === "/" ? "text-white" : "text-treevia-primary" } rounded-full items-center gap-15 font-alata` }>
                <ul className="flex items-center justify-center gap-10 px-10 py-2">
                    {links.map( ( item, index ) => (
                        <motion.span
                            key={ index }
                            className=""
                            variants={ LinkVariant }
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <NavLink
                                className={ ( { isActive } ) =>
                                    isActive ? "border-b-2 text-treevia-accent border-treevia-accent" : ""
                                }
                                to={ `/${ item.link.toLowerCase() }` }
                            >
                                { item.name }
                            </NavLink>
                        </motion.span>
                    ) ) }
                    <motion.span
                        className=""
                        variants={ LinkVariant }
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <NavLink
                            className={ ( { isActive } ) =>
                                isActive ? "text-custom-100" : ""
                            }
                            to={
                                user?.role === "admin"
                                    ? `/admin/dashboard`
                                    : `/user/dashboard`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </motion.span>
                </ul>
            </nav>
            { user ? (
                <div className="relative flex flex-row-reverse">
                    <motion.span
                        whileTap={ { scale: 0.8 } }
                        className="flex justify-center text-2xl rounded-full cursor-pointer text-teal-100 items-center bg-teal-500 p-2"
                        onClick={ () => setDisplay( ( prev ) => !prev ) }
                    >
                        <Fa.FaUser />
                    </motion.span>
                    { display && (
                        <div className="fixed bg-teal-900 shadow-2xl text-white w-60 m-2 p-4 top-20 z-50 right-0 rounded-xl">
                            <h2>{ user.username }</h2>
                            <h4>{ user.email }</h4>
                            <button
                                className="bg-teal-700 w-full p-2 mt-4 cursor-pointer"
                                onClick={ handleLogout }
                            >
                                Logout
                            </button>
                        </div>
                    ) }
                </div>
            ) : (
                <div className="flex gap-4">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            ) }
        </motion.div>
    );
};

export default Navbar;
