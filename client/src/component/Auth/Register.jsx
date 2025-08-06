import React from 'react'
import { motion } from "framer-motion"


const Register = ( { activeTab, focusVariant } ) => {
	return (
		<motion.form
		initial={{
			x: 0,
			opacity: 0
		}} 
		whileInView={{
			x: -10,
			opacity: 1
		}}
		transition={{
			duration: .6
		}}
		layout
		className={ activeTab === "register" ? "block" : "hidden" }>
			<h2 className="font-poppins font-semibold mb-2.5 text-3xl text-custom-700">Plant Your Roots</h2>
			<h4 className='font-poppins mb-10 text-[15px] text-slate-600'>Create an account to start growing your knowledge</h4>

			{/* Name Field */ }
			<div className="mb-5.5 font-poppins">
				<label htmlFor="name" className='block text-custom-700 font-bold mb-4 text-sm'>Full Name</label>
				<motion.input variants={focusVariant} whileFocus="animate" transition="transition" type="name" id='name' placeholder='Enter Your Full Name' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-4 border-2 border-green-900/20 rounded-2xl' />
				<div className=""></div>
			</div>

			{/* Email Field */ }
			<div className="mb-5.5 font-poppins">
				<label htmlFor="email" className='block text-custom-700 font-bold mb-4 text-sm'>Email Address</label>
				<motion.input variants={focusVariant} whileFocus="animate" transition="transition" type="email" id='email' placeholder='Enter Your Email' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-4 border-2 border-green-900/20 rounded-2xl' />
				<div className=""></div>
			</div>

			{/* Password Field */ }
			<div className="mb-5.5 font-poppins">
				<label htmlFor="email" className='block text-custom-700 font-bold mb-4 text-sm'>Password</label>
				<div className='relative'>
					<motion.input variants={focusVariant} whileFocus="animate" transition="transition" type="password" id='password' placeholder='Enter Your Password' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-4 border-2 border-green-900/20 rounded-2xl' />
					<button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5">👁</button>
				</div>
				<div className=""></div>
			</div>

			{/* Confirm Password Field */ }
			<div className="mb-5.5 font-poppins">
				<label htmlFor="password" className='block text-custom-700 font-bold mb-4 text-sm'>Confirm Password</label>
				<div className='relative'>
					<motion.input variants={focusVariant} whileFocus="animate" transition="transition" type="password" id='password' placeholder='Confirm Your Password' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-4 border-2 border-green-900/20 rounded-2xl' />
					<button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5">👁</button>
				</div>
				<div className=""></div>
			</div>

			{/* option field */ }

			<div className="flex justify-between text-base mb-7.5 items-center">
				<div className="flex gap-2 items-center">
					<motion.input variants={focusVariant} whileFocus="animate" transition="transition" type="checkbox" name="" id="" className='size-4.5 accent-[#52b788]' />
					<label htmlFor="" className='text-[#666] cursor-pointer'>I agree to terms and condition </label>
				</div>
			</div>

			{/* Submit Button */ }
			<button type='submit' className="w-full p-4 bg-linear-45 from-custom-400 to-custom-500 text-white rounded-2xl text-base font-semibold cursor-pointer mb-6.5">Submit</button>

			<div className="text-center mb-6.5 my-0 text-[#999] relative text-sm before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-35 before:h-0.25 before:bg-custom-700/20 after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-35 after:h-0.25 after:bg-custom-700/20">Continue with</div>

			<div className="flex gap-2 mb-6.25">
				<button className="flex-1 font-semibold p-3 border-2 border-gray-200 rounded-2xl text-gray-500">Google</button>
				<button className="flex-1 font-semibold p-3 border-2 border-gray-200 rounded-2xl text-gray-500">Facebook</button>
			</div>


		</motion.form>
	)
}

export default Register
