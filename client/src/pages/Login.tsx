import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import { motion } from 'framer-motion'
import { LoginButtonVariant } from '../utils/Animation/variant/HoverVariant'
import { LoginContainerVariant, TextScaleVariant } from '../utils/Animation/variant/IntroAnimationVariant'
import Loading from '../utils/Animation/loading'
import { useNavigate } from 'react-router'
import SvgLoader from '../utils/Animation/SvgLoader'

const Login = () => {

	return (
		<div className='flex flex-col items-center justify-center h-screen text-white bg-gradient-to-tr from-teal-900 to-green-900' >
			<motion.div 
			variants={TextScaleVariant}
			initial='initial'
			animate='animate'
			transition={{
				duration: 1
			}}
			className="flex items-center gap-5 mt-10 mb-5">
				<img src={Logo} alt={Logo} className='size-10' />
				<h2 className='text-3xl'>Login to your account</h2>
			</motion.div>
			<motion.div
				variants={LoginContainerVariant}
				initial='initial'
				animate='animate'
				transition={{
					duration: 1
				}}
				className="p-10 shadow-2xl bg-slate-500/20 rounded-2xl">
				<form className='flex flex-col gap-4'>
					<label className='' htmlFor="">Email:</label>
					<input className='p-2.5 w-100 bg-white rounded-xl text-green-900' type="email" name="" placeholder="Enter your email" id="" />
					<label className='' htmlFor="">Password: </label>
					<input className='p-2.5 w-100 bg-white rounded-xl text-green-900' type="password" placeholder='Enter a password' name="" id="" />
					<motion.button 
						variants={LoginButtonVariant}
						whileHover='hover'
						whileTap='tap'
					className='p-2 cursor-pointer bg-teal-950 rounded-xl' type="submit">
						Submit
					</motion.button>
					{/* {error && <span>{error}</span>} */}
				</form>
			</motion.div>
		</div>
	)
}

export default Login