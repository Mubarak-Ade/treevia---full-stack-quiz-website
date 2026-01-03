import { formatImage } from "@/utils/imageFormat";
import { ChevronUp, Crown } from "lucide-react";

interface color {
	gradient: string;
	bg: string;
	text: string;
	border: string;
}

interface Props {
	profile?: string;
	rank: number;
	totalXp: number;
	accuracy: number;
	username: string;
}

export const Chart = ({
	rank,
	totalXp,
	accuracy,
	username,
	profile,
}: Props) => {
	const barColor = (rank: number) => {
		switch (rank) {
			case 1:
				return {
					bg: "bg-yellow-400",
					gradient: "from-card to-yellow-400/40",
					text: "text-yellow-500/40",
					border: "border-yellow-300",
				};
			case 2:
				return {
					bg: "bg-slate-200",
					gradient: "from-card to-slate-200/20",
					text: "text-slate-200/40",
					border: "border-slate-200",
				};
			case 3:
				return {
					bg: "bg-orange-400",
					gradient: "from-card to-orange-400/40",
					text: "text-orange-500/40",
					border: "border-orange-500",
				};
			default:
				break;
		}
	};
	const color = barColor(rank) as color;
	return (
		<div className="flex items-end flex-col justify-end relative h-80">
			<div
				style={{ height: `${accuracy}%` }}
				className={`w-30 bg-linear-45 text-center flex items-center justify-center relative shadow-2xl mt-2 ${color?.gradient} rounded-t-2xl`}
			>
				<span style={{fontSize: `${Math.max(18, accuracy * 0.5)}px`}} className={`${color?.text}`}>{rank}</span>

				<div className=" flex flex-col absolute -top-45 left-1/2 -translate-x-1/2 items-center z-10">
					<span className="">
						{rank === 1 ? (
							<Crown
								size={30}
								color="var(--color-yellow-300)"
							/>
						) : (
							<ChevronUp
								color={
									rank === 2
										? "var(--color-slate-200)"
										: "var(--color-orange-600)"
								}
							/>
						)}
					</span>
					<div
						className={`${color?.gradient} bg-linear-60 size-25 border-3 relative ${color?.border} flex items-center justify-center rounded-full`}
					>
						{!profile ? (
							<span className={`text-6xl p-4 text-white`}>
								{username.charAt(0)}
							</span>
						) : (
							<div className="size-full overflow-hidden rounded-full">
								<img
									src={formatImage(profile)}
									alt={formatImage(profile)}
									className="w-full h-full object-cover"
								/>
							</div>
						)}
						<span
							className={`${color?.bg} absolute px-3 py-0.5 text-[10px] font-bold -bottom-2 rounded-full`}
						>
							#{rank}
						</span>
					</div>
					<div className="flex font-abeezee flex-col text-center mt-2">
						<h4 className="text-xs font-bold text-white">
							{username}
						</h4>
						<p className="text-sm text-custom font-bold">
							{totalXp}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
