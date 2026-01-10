import { motion } from "framer-motion";
import { z } from "zod";
import {
	focusVariant,
	submitVariant,
} from "../../../utils/Animation/variant/authVariant";

import { useNotification } from "@/context/NotificationProvider";
import { useLogin } from "@/features/auth/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginProps {
	activeTab: string;
	setTabTo: Dispatch<SetStateAction<string>>;
}

const schema = z.object({
	email: z.string().email("invalid email address"),
	password: z.string().min(6, "password must be 6 char long"),
});

type FormData = z.infer<typeof schema>;

const Login = ({ activeTab, setTabTo }: LoginProps) => {
	const { showNotification } = useNotification();
	const [showPassword, setShowPassword] = useState(false)

	const login = useLogin();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		login.mutate(data, {
			onSuccess: () => {
				setTabTo("success");
				showNotification(
					"success",
					"Successfully login, redirecting to your dashboard..."
				);
			},
			onError: (error) => {
				showNotification("error", error.message)
				setError("root", {
					type: "manual",
					message: error.message
				});
				console.log(error.message);
			},
		});
	};

	return (
		<motion.form
			onSubmit={handleSubmit(onSubmit)}
			initial={{
				x: -20,
				opacity: 0,
			}}
			whileInView={{
				x: 0,
				opacity: 1,
			}}
			transition={{
				duration: 0.8,
			}}
			layout
			className={` ${activeTab === "login" ? "block" : "hidden"}`}
		>
			<h2 className="font-poppins font-semibold mb-2.5 text-3xl text-white">
				Welcome Back
			</h2>
			<h4 className="font-poppins mb-10 text-[15px] text-secondary">
				Sign in to continue your learning journey
			</h4>

			{/* Email Field */}
			<motion.div className="mb-5.5 font-poppins">
				<label
					htmlFor="email"
					className="block text-white font-bold mb-4 text-sm"
				>
					Email Address
				</label>
				<motion.input
					variants={focusVariant}
					whileFocus="animate"
					type="email"
					id="email"
					{...register("email")}
					placeholder="Enter Your Email"
					className="w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl"
				/>
				{errors.email && (
					<p className="text-red-500">{errors.email.message}</p>
				)}
			</motion.div>

			{/* Password Field */}
			<div className="mb-5.5 font-poppins">
				<label
					htmlFor="email"
					className="block text-white font-bold mb-4 text-sm"
				>
					Password
				</label>
				<div className="relative">
					<motion.input
						variants={focusVariant}
						whileFocus="animate"
						type={showPassword ? "text" : "password"}
						id="password"
						{...register("password")}
						placeholder="Enter Your Password"
						className="w-full placeholder:text-slate-400 bg-white outline-none text-sm px-5 py-2 border-2 border-green-900/20 rounded-2xl"
					/>
					<button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl cursor-pointer p-1.5">
						👁
					</button>
				</div>
				{errors.password && (
					<p className="text-red-500">{errors.password.message}</p>
				)}
			</div>

			{/* option field */}

			<div className="flex justify-between text-base mb-7.5 items-center">
				<div className="flex gap-2 items-center">
					<input
						type="checkbox"
						name=""
						id=""
						className="size-4.5 custom-[#52b788]"
					/>
					<label
						htmlFor=""
						className="text-[#666] cursor-pointer"
					>
						Remember me
					</label>
				</div>
				<a
					href=""
					className="text-[#52b788]"
				>
					Forgotten Password
				</a>
			</div>

			{/* Submit Button */}
			<motion.button
				variants={submitVariant}
				whileHover="animate"
				disabled={login.isPending}
				type="submit"
				className="w-full p-3 text-secondary-bg relative overflow-hidden bg-custom rounded-2xl text-base font-semibold cursor-pointer mb-6.5"
			>
				{login.isPending ? "Submiting" : "Submit"}
				{login.isPending && (
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

		</motion.form>
	);
};

export default Login;
