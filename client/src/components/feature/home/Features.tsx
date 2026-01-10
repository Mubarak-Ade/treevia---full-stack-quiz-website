import { Link } from "react-router"

const Features = () =>
{
	return (
		<div className="p-5">
			<div className="my-10 space-y-4 flex flex-col items-center text-center">
				<h4 className='text-custom m-6 bg-secondary-bg border border-custom px-4 rounded-2xl'>Explore</h4>
				<h1 className='text-white  text-5xl font-extrabold font-alata'>Why Choose Treevia</h1>
				<p className='text-secondary text-base'>Choose from a wide variety of subjects to test your trivia skills and climb the global leaderboard</p>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 text-center">
				<div className="bg-card text-white border border-custom px-10 py-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🌱</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Organic Learning</h3>
					<p className='text-[1.1rem] leading-[1.6]'>Our adaptive system grows with you, nurturing your knowledge naturally through personalized quiz recommendations that bloom into expertise.</p>
				</div>
				<div className="bg-card text-white border border-custom px-10 py-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🌿</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Fresh Content</h3>
					<p className='text-[1.1rem] leading-[1.6]'>Like a thriving garden, our quiz library is constantly growing with new, engaging content across countless subjects and difficulty levels.</p>
				</div>
				<div className="bg-card text-white border border-custom py-10 px-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🏆</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Flourish Together</h3>
					<p className='text-[1.1rem] leading-[1.6]'>Connect with fellow knowledge seekers, compete in seasonal challenges, and watch your learning forest grow alongside a vibrant community.</p>
				</div>
			</div>
			<div className="max-w-5xl font-alata m-auto gap-4 flex md:flex-row flex-col overflow-hidden items-center justify-between text-white p-5 md:p-10 mt-10 rounded-4xl border border-custom w-full bg-card">
				<div className="">
					<h1 className='md:text-4xl text-3xl text-center md:text-start font-bold'>Ready to challenge your self</h1>
					<p className='mt-4 text-lg text-center md:text-start text-secondary md:w-120'>Create a free account today and start tracking your progress across all categories</p>
				</div>
				<Link to="/login"><button className='px-6 py-3 bg-custom shadow-custom shadow-[0_0_15px] rounded-full text-background font-semibold cursor-pointer'>Create Account</button></Link>
			</div>
		</div>
	)
}

export default Features