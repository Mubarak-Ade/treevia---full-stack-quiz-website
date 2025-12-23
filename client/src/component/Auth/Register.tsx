import React, { Dispatch, SetStateAction } from 'react'
import { motion } from "framer-motion"
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { focusVariant, submitVariant } from '../../utils/Animation/variant/authVariant'
import { useNotification } from '@/context/NotificationProvider'
import { useRegister } from '@/features/mutation/Auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

interface RegisterProps {
	activeTab: string;
	setToSuccess: Dispatch<SetStateAction<string>>;
}

const schema = z.object({
	username: z.string().min(3, "name must be atleast 3 char long"),
	email: z.string().email("invalid email address"),
	password: z.string().min(6, "password must be 6 char long"),
	confirmPassword: z.string().min(6, "confirm password")
});

type FormData = z.infer<typeof schema>;


const Register = ({ activeTab, setToSuccess }: RegisterProps) => {

	const { showNotification } = useNotification();
	
		const signup = useRegister();
	
		const {
			register,
			handleSubmit,
			setError,
			formState: { errors },
		} = useForm<FormData>({
			resolver: zodResolver(schema),
		});
	
		const onSubmit: SubmitHandler<FormData> = (data) => {
			signup.mutate(data, {
				onSuccess: () => {
					setToSuccess("success");
					showNotification(
						"success",
						"Successfully Sign up, redirecting to your dashboard..."
					);
				},
				onError: (error) => {
					showNotification("error", error.message)
					setError("root", {
						type: "manual",
						message: error.message
					});
					console.log(errors.root?.message);
				},
			});
		};

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			initial={ {
				x: 0,
				opacity: 0
			} }
			whileInView={ {
				x: -10,
				opacity: 1
			} }
			transition={ {
				duration: .6
			} }
			layout
			className={ activeTab === "register" ? "block" : "hidden" }>
			<h2 className="font-poppins font-semibold mb-2.5 text-3xl text-white">Plant Your Roots</h2>
			<h4 className='font-poppins mb-4 text-[15px] text-secondary'>Create an account to start growing your knowledge</h4>

			{/* Name Field */ }
			<div className="mb-4 font-poppins">
				<label htmlFor="name" className='block text-white font-bold mb-2 text-sm'>Full Name</label>
				<motion.input {...register("username")} variants={ focusVariant } whileFocus="animate" type="name" id='name' placeholder='Enter Your Full Name' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl' />
				{errors.username && (
					<p className="text-red-500">{errors.username.message}</p>
				)}
			</div>

			{/* Email Field */ }
			<div className="mb-4 font-poppins">
				<label htmlFor="email" className='block text-white font-bold mb-2 text-sm'>Email Address</label>
				<motion.input {...register("email")} variants={ focusVariant } whileFocus="animate" type="email" id='email' placeholder='Enter Your Email' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl' />
				{errors.email && (
					<p className="text-red-500">{errors.email.message}</p>
				)}
			</div>

			{/* Password Field */ }
			<div className="mb-4 font-poppins">
				<label htmlFor="email" className='block text-white font-bold mb-2 text-sm'>Password</label>
				<div className='relative'>
					<motion.input {...register("password")} variants={ focusVariant } whileFocus="animate" type="password" id='password' placeholder='Enter Your Password' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl' />
					<button type='button' className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5">👁</button>
				</div>
				{errors.password && (
					<p className="text-red-500">{errors.password.message}</p>
				)}
			</div>

			{/* Confirm Password Field */ }
			<div className="mb-4 font-poppins">
				<label htmlFor="password" className='block text-white font-bold mb-2 text-sm'>Confirm Password</label>
				<div className='relative'>
					<motion.input {...register("confirmPassword")} variants={ focusVariant } whileFocus="animate" type="password" id='password' placeholder='Confirm Your Password' className='w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl' />
					<button type='button' className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5">👁</button>
				</div>
				{errors.confirmPassword && (
					<p className="text-red-500">{errors.confirmPassword.message}</p>
				)}
			</div>

			{/* option field */ }

			<div className="flex justify-between text-base mb-7.5 items-center">
				<div className="flex gap-2 items-center">
					<motion.input variants={ focusVariant } whileFocus="animate" type="checkbox" name="" id="" className='size-4.5 custom-[#52b788]' />
					<label htmlFor="" className='text-[#666] cursor-pointer'>I agree to terms and condition </label>
				</div>
			</div>

			{/* Submit Button */ }
			<motion.button
				variants={submitVariant}
				whileHover="animate"
				disabled={signup.isPending}
				type="submit"
				className="w-full p-3 text-secondary-bg relative overflow-hidden bg-custom rounded-2xl text-base font-semibold cursor-pointer mb-6.5"
			>
				{signup.isPending ? "Submiting" : "Submit"}
				{signup.isPending && (
					<motion.div
						className="absolute top-0 -left-full z-50 w-full h-full"
						animate={{
							left: ["-100%", "100%"],
						}}
						transition={{
							duration: 1.2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
						}}
					/>
				)}
			</motion.button>

			{/* <div className="text-center mb-6.5 my-0 text-[#999] relative text-sm before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-35 before:h-0.25 before:bg-white/20 after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-35 after:h-0.25 after:bg-white/20">Continue with</div>

			<div className="flex gap-2 mb-6.25">
				<motion.button
					variants={ focusVariant }
					whileHover="animate"
				
					// initial="initial"	
					className="flex-1 cursor-pointer flex justify-center items-center gap-4 font-semibold p-3 border-2 border-gray-200 rounded-2xl text-gray-500">
					<FcGoogle className="text-xl" />
					Google
				</motion.button>
				<motion.button
					variants={ focusVariant }
					whileHover="animate"
				
					// initial="initial"	
					className="flex-1 cursor-pointer flex justify-center items-center gap-4 font-semibold p-3 border-2 border-gray-200 rounded-2xl text-gray-500">
					<FaFacebook className="text-blue-600 text-xl" />
					Facebook
				</motion.button>
			</div> */}


		</motion.form>
	)
}

export default Register
