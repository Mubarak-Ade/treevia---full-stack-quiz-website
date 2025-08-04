import React from 'react'
import {motion} from 'framer-motion'
import { HoverVariant } from '../../utils/Animation/variant/HoverVariant'

const Stat = ({title= "Title", numbers = "500,000"}) =>
{
	return (
		<motion.div 
		whileHover="hover"
		variants={HoverVariant}
		transition={{
			duration: .2,
		}}
		className='px-10 border border-white/25 rounded-2xl text-center text-green-200 py-8 bg-white/15'>
			<h1 className='text-6xl mb-5 font-bold font-alike'>{numbers}</h1>
			<h2 className='font-poppins text-base text-white'>{title}</h2>
		</motion.div>
	)
}

export default Stat