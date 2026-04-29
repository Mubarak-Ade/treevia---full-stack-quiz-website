import { Button } from "@/components/ui/button";
import { MotionWrap, Reveal, hoverLift, tapPress } from "@/components/feature/Motion";
import { ArrowRight, Leaf } from "lucide-react";
import TreeImage from "../../../assets/images/transparent tree illustration.png";
import { Link } from "react-router";

const Hero = () => {
	return (
		<section className="grid items-center  justify-center w-full  gap-10 px-8 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-14 min-h-[72vh]">
			<Reveal className="px-2 md:px-4 w-full">
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

					<div className="flex flex-col w-full md:flex-row justify-center lg:justify-normal mt-10 gap-4">
						<Button asChild className="bg-brand text-on-brand shadow-[0_0_10px] px-8 py-4">
							<Link to="/login">
								Start Quiz Now
								<ArrowRight size={18} />
							</Link>
						</Button>
						<Button asChild variant="outline" className="border-primary  font-bold px-7 bg-brand-subtle text-brand py-4 rounded-full">
							<Link to="/quizzes">
								Explore Categories
							</Link>
						</Button>
					</div>
				</div>
			</Reveal>
			<MotionWrap
				whileHover={hoverLift}
				whileTap={tapPress}
				className="max-w-xl rounded-[0.25rem]  p-3 md:p-5 overflow-hidden shadow-[0_40px_80px_-45px_var(--shadow-brand)] w-full justify-self-center"
			>
				<div className="shadow-[0_0_25px] shadow-brand rounded-4xl">
					<img
						src={TreeImage}
						className="h-full w-full object-cover"
						alt="Pastel tree illustration"
					/>
				</div>
			</MotionWrap>
			
		</section>
	);
};

export default Hero;
