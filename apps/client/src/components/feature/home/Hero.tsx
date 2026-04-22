import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import TreeImage from "../../../assets/images/transparent tree illustration.png";
import { Link } from "react-router";

const Hero = () => {
	return (
		<section className="grid items-center  justify-center w-full  gap-10 px-8 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-14 min-h-[72vh]">
			<div className="px-2 md:px-4 w-full">
				<div className="max-w-2xl w-full flex flex-col items-start justify-center">
					<p className="mb-8 inline-flex  items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand bg-brand-subtle">
						<Leaf size={12} />
						Grow your knowledge
					</p>
					<h1 className="lg:text-[5rem] text-5xl md:text-7xl lg:text-start text-center text-dark-surface dark:text-white font-display font-extrabold leading-[0.95]">
						Branch Out Your{" "}
						<span className="text-brand dark:text-shadow-[0_0_10px] ">Knowledge.</span>
					</h1>
					<p className="mt-8 max-w-xl text-primary text-lg text-center lg:text-start leading-8">
						Dive into an ethereal world of trivia where learning feels like a stroll through a digital grove. Test your skills and watch your intellectual sapling flourish.
					</p>

					<div className="flex flex-col md:flex-row justify-center lg:justify-normal mt-10 gap-4">
						<Link to="/login">
							<motion.button
								whileHover={{
									y: "-3px",
									boxShadow: "0 0 15px var(--color-brand)",
								}}
								whileTap={{
									scale: 0.96,
								}}
								className="bg-brand text-on-brand shadow-[0_0_10px] inline-flex items-center gap-3 rounded-full cursor-pointer font-bold px-7 py-4"
							>
								Start Quiz Now
								<ArrowRight size={18} />
							</motion.button>
						</Link>
						<Link to="/quizzes">
							<motion.button
								whileHover={{
									y: "-3px",
									backgroundColor: "var(--color-brand-subtle)",
									// color: "var(--color-dark-neutral)"
								}}
								whileTap={{
									scale: 0.96,
								}}
								className="border border-primary font-bold px-7 bg-brand-subtle text-brand py-4 rounded-full cursor-pointer"
							>
								Explore Categories
							</motion.button>
						</Link>
					</div>
				</div>
			</div>
			<div className="max-w-xl rounded-[0.25rem]  p-3 md:p-5 overflow-hidden shadow-[0_40px_80px_-45px_var(--shadow-brand)] w-full justify-self-center">
				<div className="shadow-[0_0_25px] shadow-brand rounded-4xl">
					<img
						src={TreeImage}
						className="h-full w-full object-cover"
						alt="Pastel tree illustration"
					/>
				</div>
			</div>
			
		</section>
	);
};

export default Hero;
