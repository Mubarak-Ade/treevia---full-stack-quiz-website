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
		<div className="bg-surface-alt border border-default rounded-3xl p-5 w-full max-w-50">
			<div
				className={`${color.text} ${color.gradient} text-4xl size-15 flex items-center justify-center rounded-full`}
			>
				{icon}
			</div>

			<div className="mt-15">
				<h6 className="text-secondary font-display font-semibold">{title}</h6>
				<span className="text-primary text-3xl font-bold">{value}</span>
			</div>
		</div>
	);
};
