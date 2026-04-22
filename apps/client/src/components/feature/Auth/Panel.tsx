import Logo from "../../../assets/logo.png";


const Panel = () =>
{
	return (
		<div className=' text-white items-center flex-col text-center overflow-hidden hidden lg:flex justify-center py-15 px-10 flex-1 rounded-l-3xl'>
			<img src={Logo} alt="" className="size-20 mb-5 rounded-full" />
			<h3 className='text-5xl text-white mb-10 font-bold'>Welcome to Treevia </h3>
			<p className='text-xl mb-5'>Join our growing community and cultivate your knowledge across countless topics</p>
			<ul className='text-xl list-none text-left'>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>🌱 Personalized learning paths</li>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>🏆 Competitive leaderboards</li>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>📚 Thousands of quiz topics</li>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>🤝 Connect with fellow learners</li>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>📊 Track your progress</li>
				<li className='mb-3 flex items-center gap-3 before:content-["✓"] before:bg-white/20 before:size-6 before:flex before:justify-center before:items-center before:font-bold before:rounded-full before:text-base'>🎯 Earn achievements</li>
			</ul>
		</div>
	)
}

export default Panel
