import React from "react";

interface Props {
	icon: React.ReactNode;
	title: string;
	value: number;
}

export const ProfileCard = ({ icon, title, value }: Props) => {
	return (
		<div className="bg-card rounded-3xl flex gap-4 items-center flex-col justify-center p-5 max-w-3xs w-full">
			<div className="bg-muted/60 px-4 py-4 rounded-full">
				{icon}
			</div>

			<span className="text-white text-5xl font-bold">{value}</span>
			<h6 className="text-secondary font-semibold">{title}</h6>
		</div>
	);
};
