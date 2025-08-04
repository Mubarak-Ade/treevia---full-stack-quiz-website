import React from 'react'
import { FaApple } from 'react-icons/fa6'

const Features = () =>
{
	return (
		<div className="h-screen bg-linear-135 text-center px-15 py-25 from-custom-500 via-custom-400 to-custom-600">
			<h1 className='text-white  text-5xl mb-20 font-[800] font-alata'>Why Choose Treevia</h1>
			<div className="grid grid-cols-3 gap-10 text-center">
				<div className="bg-white px-10 py-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🌱</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Organic Learning</h3>
					<p className='text-[1.1rem] [line-height:1.6]'>Our adaptive system grows with you, nurturing your knowledge naturally through personalized quiz recommendations that bloom into expertise.</p>
				</div>
				<div className="bg-white px-10 py-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🌿</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Fresh Content</h3>
					<p className='text-[1.1rem] [line-height:1.6]'>Like a thriving garden, our quiz library is constantly growing with new, engaging content across countless subjects and difficulty levels.</p>
				</div>
				<div className="bg-white py-10 px-7.5 rounded-3xl">
					<span className='text-5xl mb-5 block'>🏆</span>
					<h3 className='text-2xl mb-2.5 font-bold'>Flourish Together</h3>
					<p className='text-[1.1rem] [line-height:1.6]'>Connect with fellow knowledge seekers, compete in seasonal challenges, and watch your learning forest grow alongside a vibrant community.</p>
				</div>
			</div>
		</div>
	)
}

export default Features