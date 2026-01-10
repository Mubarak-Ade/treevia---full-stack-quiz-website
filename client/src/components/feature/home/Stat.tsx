import { motion } from 'framer-motion'
import { LucideIcon, LucideScanFace } from "lucide-react"
import { HoverVariant } from '../../../utils/Animation/variant/HoverVariant'

interface Props {
	title: string,
	numbers: number,
	Icon: LucideIcon
}

const Stat = ({ title = "Title", numbers = 500000, Icon = LucideScanFace }: Props) => {
	return (
		<motion.div
			whileHover="hover"
			variants={HoverVariant}
			transition={{
				duration: .2,
			}}
			className='border border-custom rounded-4xl text-center text-white py-5 bg-card max-w-sm w-full'>
			<Icon className='m-auto bg-custom text-background p-2 rounded-md mb-2' size={40} />
			<h1 className='text-5xl mb-2 font-bold font-alike'>{numbers}</h1>
			<h2 className='font-poppins text-base text-secondary'>{title}</h2>
		</motion.div>
	)
}

export default Stat