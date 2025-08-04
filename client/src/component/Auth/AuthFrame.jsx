import React from 'react'
import Panel from './Panel'
import Login from './Login'

const AuthFrame = () =>
{
	return (
		<div className='max-w-250 overflow-hidden w-full min-h-150 flex rounded-3xl border-white border'>
			<Panel />
			<div className="bg-white flex-1 rounded-r-3xl px-15 py-10 flex flex-col justify-center relative">
				<div className='relative'>
					<div className='p-1 mb-10 rounded-4xl font-montserrat flex justify-between bg-green-900/20'>
						<button className="flex-1 px-5 py-3 border-none rounded-3xl text-white font-semibold cursor-pointer text-base bg-linear-45 from-custom-400 shadow-[0_4px_15px] shadow-custom-100/30 to-custom-200">Sign Up</button>
						<button className="flex-1 px-5 py-3 border-none rounded-3xl font-semibold cursor-pointer text-base bg-transparent text-slate-600">Login</button>
					</div>
					<Login />
					
				</div>
			</div>
		</div>
	)
}

export default AuthFrame
