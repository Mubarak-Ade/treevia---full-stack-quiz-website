import React, { useState } from 'react'
import Panel from './Panel'
import Login from './Login'
import Register from './Register'
import { useRef } from 'react'

const AuthFrame = () =>
{
	const [activeTab, setActiveTab] = useState("login")

	const focusVariant = {
		initial : {
			scale: 1,
			border: "2px solid",
            boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.1)",
            background: "white",
		},
		animate : {
			scale: 1.02 ,
			border: "2px solid #52b788",
            boxShadow: "0 0 0 3px rgba(82, 183, 136, 0.1)",
            background: "white",
		},
		transparent : {
			type: "spring",
			stiffness: 300
		}
	}

	
	return (
		<div className='max-w-250 overflow-hidden w-full min-h-150 flex rounded-3xl border-white border'>
			<Panel />
			<div className="bg-white flex-1 rounded-r-3xl px-15 py-10 flex flex-col justify-center relative">
				<div className='relative'>
					<div className='p-1 mb-10 rounded-4xl font-montserrat flex justify-between bg-green-900/20'>
						<button onClick={() => setActiveTab("register")} className={`flex-1 px-5 py-3 border-none rounded-3xl font-semibold cursor-pointer text-base ${activeTab === "register" ? "bg-linear-45 from-custom-400 shadow-[0_4px_15px] shadow-custom-100/30 to-custom-200 text-white" : "bg-transparent text-slate-600"}`}>Sign Up</button>
						<button onClick={() => setActiveTab("login")} className={`flex-1 px-5 py-3 border-none rounded-3xl font-semibold cursor-pointer text-base bg-transparent ${activeTab === "login" ? "bg-linear-45 from-custom-400 shadow-[0_4px_15px] shadow-custom-100/30 to-custom-200 text-white" : "bg-transparent text-slate-600"}`}>Login</button>
					</div>
					<Login activeTab={activeTab} focusVariant={focusVariant} />
					<Register activeTab={activeTab} focusVariant={focusVariant} />
				</div>
			</div>
		</div>
	)
}

export default AuthFrame
