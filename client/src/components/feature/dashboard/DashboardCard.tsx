import { getColorFromString } from "@/utils/colorFormat";

interface Props {
	icon: React.ReactNode;
	title: string;
	value: number;
	id: string;
}

export const DashboardCard = ({ icon, title, value, id }: Props) => {
	const color = getColorFromString(id);
	return (
		<div className="bg-card rounded-3xl p-5 max-w-3xs w-full">
			<div
				className={`${color.text} ${color.gradient} text-4xl size-15 flex items-center justify-center rounded-full`}
			>
				{icon}
			</div>

			<div className="mt-15">
				<h6 className="text-secondary font-semibold">{title}</h6>
				<span className="text-white text-3xl font-bold">{value}</span>
			</div>
		</div>
	);
};
