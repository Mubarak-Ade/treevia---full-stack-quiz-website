import React, { MouseEventHandler } from 'react'
import { motion } from 'motion/react';

interface HeaderProps
{
	title: string,
	subtitle: string,
	icon?: React.ReactNode,
	buttonName: string,
	buttonIcon: React.ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
}
export const DashboardHeader = ( { title, subtitle, icon, buttonName, buttonIcon, onClick }: HeaderProps ) =>
{
	return (
		<div className="flex items-center justify-between">
			<div className="">
				<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
					{ title } { icon }
				</h1>
				<p className="text-secondary p-1">
					{ subtitle }
				</p>
			</div>
			<motion.button
				whileHover={ {
					boxShadow: "0 0 15px var(--color-custom)",
					scale: 1.1
				} }
				whileTap={ {
					scale: 0.8
				} }
				onClick={ onClick }
				className="flex gap-2 bg-custom px-4 py-3 rounded-full shadow-[0_0_10px] shadow-custom font-bold cursor-pointer items-center">
				{ buttonIcon } { buttonName }
			</motion.button>
		</div>
	)
}
