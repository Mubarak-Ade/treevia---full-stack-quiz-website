import React from 'react'

interface HeaderProps {
    title: string,
    subtitle: string, 
    icon?: React.ReactNode,
    buttonName: string,
    buttonIcon: React.ReactNode
}
export const DashboardHeader = ({title, subtitle, icon, buttonName, buttonIcon} : HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
						{title} {icon}
					</h1>
					<p className="text-secondary p-1">
						{subtitle}
					</p>
				</div>
				<button className="flex gap-2 bg-custom px-4 py-3 rounded-full shadow-[0_0_10px] shadow-custom font-bold cursor-pointer items-center">
					{buttonIcon} {buttonName}
				</button>
			</div>
  )
}
