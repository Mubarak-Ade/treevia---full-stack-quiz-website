import { AiFillCheckCircle } from "react-icons/ai"; 
import React, { useContext, useState } from 'react'
import Panel from './Panel'
import Login from './Login'
import Register from './Register'
import { useRef } from 'react'
import SuccessPage from "./SuccessPage";
import { MyContext } from "../../context/AppContext";
import { useNotification } from "../../context/NotificationProvider";

const AuthFrame = () => {
	const [ activeTab, setActiveTab ] = useState( "register" )


	// const handleClick = () => {
	// 	setIsLoading( true )
		
	// 	setTimeout( () => {
	// 		setIsLoading( false )
	// 		// body
	// 	}, 5000 );
	// 	setActiveTab("success")
	// 	showNotification("success", "Successfully login, redirecting to your dashboard...")
	// }

	return (
		<div className='max-w-250 overflow-hidden w-full min-h-150 flex rounded-3xl border-custom border'>
			<Panel />
			<div className="bg-linear-to-tr from-background to-secondary-bg flex-1 rounded-r-3xl px-15 py-10 flex flex-col justify-center relative">
				<div className='relative'>
					<div className='p-1 mb-5 rounded-4xl font-montserrat flex justify-between bg-secondary-bg border border-muted'>
						<button onClick={ () => setActiveTab( "register" ) } className={ `flex-1 px-5 py-3 border-none rounded-3xl font-semibold cursor-pointer text-base ${ activeTab === "register" ? "bg-background shadow-[0_4px_15px] shadow-custom  text-custom" : "bg-transparent text-white" }` }>Sign Up</button>
						<button onClick={ () => setActiveTab( "login" ) } className={ `flex-1 px-5 py-3 border-none rounded-3xl font-semibold cursor-pointer text-base bg-transparent ${ activeTab === "login" ? "bg-background shadow-[0_4px_15px] shadow-custom  text-custom" : "bg-transparent text-white" }` }>Login</button>
					</div>
					<Login activeTab={ activeTab } setToSuccess={setActiveTab} />
					<Register activeTab={ activeTab } setToSuccess={setActiveTab}/>
					<SuccessPage activeTab={activeTab} />
				</div>
			</div>
		</div>
	)
}

export default AuthFrame
