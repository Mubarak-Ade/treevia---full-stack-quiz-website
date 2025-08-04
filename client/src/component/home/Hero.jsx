import React from 'react'
import { motion } from 'framer-motion'
import Stat from './Stat'
import { HoverVariant } from '../../utils/Animation/variant/HoverVariant'

const Hero = () =>
{
	return (
		<div className="py-0 text-center px-25 bg-linear-230 flex flex-col gap-5 items-center justify-center from-purple-900/30 via-teal-400/10 to-yellow-500/10 via-80% from-20% to-90% h-screen w-full">
			<h1 className='text-[clamp(3rem,8vw,3rem)] mb-5 z-50 text-center text-white font-montserrat font-bold'>Grow Your Knowledge</h1>
			<h2 className='text-[clamp(1.2rem,3vw,1.8rem)] mb-10 z-50 text-center text-white font-lora font-semibold'>Branch out with treevia that helps your mind flourish across every topic</h2>
			<div className='flex gap-5 justify-center flex-wrap mb-15'>
				<motion.button
					whileHover={ {
						y: '-3px',
						boxShadow: '0 12px 35px rgba(82,183,136,0.6)'
					} }
					whileTap={ {
						scale: .9
					} }
					className="py-4.5 px-10 text-4.5, font-semibold border-none rounded-[50px] cursor-pointer decoration-0 inline-block relative overflow-hidden bg-linear-45 from-custom-400 to-custom-500 text-white shadow-[0_8px_25px_rgb(82,183,136,0.4)]">Start Quiz</motion.button>
				<motion.button
					whileHover="hover"
					whileTap="tap"
					variants={HoverVariant}
					className="py-4.5 px-10 text-4.5, font-semibold rounded-[50px] cursor-pointer inline-block relative overflow-hidden bg-white/15 text-white border border-white/50">Explore Categories</motion.button>
			</div>
			<div className="flex gap-10">
				<Stat title='Active User' numbers='50,000' />
				<Stat title='Quiz Category' numbers='5,000' />
				<Stat title='Questions' numbers='25,000' />
				<Stat title='Accurate' numbers='99%' />
			</div>
		</div>
	)
}

export default Hero
