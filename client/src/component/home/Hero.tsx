import { motion } from "framer-motion";
import TreeImage from "../../assets/images/transparent tree illustration.png";

const Hero = () => {
	return (
		<div className="flex bg-primary-bg items-center gap-10 justify-center h-screen">
			<div className="max-w-xl w-full">
				<div className="">
					<h1 className="text-6xl text-white font-montserrat font-bold">
						Branch Out Your <span className="text-custom">Knowledge.</span>
					</h1>
					<p className="mt-4 text-secondary text-xl">Join thousands of players in the ultimate trivia challenge.
						Test your skills accross 50+ categories and grow your mind daily
					</p>
				</div>

				<div className="flex mt-8 gap-4">
					<motion.button
						whileHover={{
							y: "-3px",
							boxShadow: "0 12px 35px var(--color-custom)",
						}}
						whileTap={{
							scale: 0.9,
						}}
						className="bg-custom rounded-full cursor-pointer text-primary-bg font-bold px-6 py-3"
					>
						Start Quiz Now
					</motion.button>
					<motion.button
						whileHover={{
							y: "-3px",
							background: "var(--color-secondary-bg)",
							color: "var(--color-primary-btn)"
						}}
						whileTap={{
							scale: 0.9,
						}}
						className="font-bold px-6 text-white py-3 rounded-full cursor-pointer bg-secondary-btn border border-custom"
					>
						Explore Categories
					</motion.button>
				</div>
			</div>
			<div className="max-w-md rounded-4xl bg-linear-to-r from-background to-secondary-bg overflow-hidden shadow-[0_0_20px] shadow-secondary-bg w-full">
				<img
					src={TreeImage}
					className="h-full w-full"
					alt=""
				/>
			</div>
			
		</div>
	);
};

export default Hero;
