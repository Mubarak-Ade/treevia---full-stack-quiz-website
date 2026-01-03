import { ProgressBar } from "../quiztaking/ProgressBar";
import { ProfileAvatar } from "../share/ProfileAvatar";

interface Props {
	name?: string;
	subtitle?: string;
	progress: number;
	progressInfo: string;
	tag: string;
	extraInfo: string;
	profile?: string;
}

export const DashboardProfileCard = ({
	name,
	profile,
	subtitle,
	progress,
	progressInfo,
	tag,
	extraInfo,
}: Props) => {
	// const color = getColorFromString(name) as string
	return (
		<div className="bg-card rounded-3xl p-5 max-w-xs w-full">
			<div className="flex items-center gap-5">
				<div className="relative">
                    <ProfileAvatar username={name} profile={profile} className="size-20" />
					<span
						className={` absolute -bottom-1 -right-2 font-bold text-xs bg-custom border border-custom rounded-full px-2 py-0.5`}
					>
						{tag}
					</span>
				</div>
				<div className="">
					<h2 className="text-2xl text-white font-ubuntu capitalize">
						{name}
					</h2>
					<h6 className="text-custom font-montserrat font-semibold text-sm">
						{subtitle}
					</h6>
				</div>
			</div>
			<div className="mt-10">
				<div className="flex items-center justify-between">
					<h6 className="text-secondary font-semibold">
						XP Progress
					</h6>
					<span className="text-custom text-xs font-bold">
						{progressInfo}
					</span>
				</div>
				<ProgressBar progress={progress} />
				<p className="text-secondary/60 font-semibold text-sm mt-4">
					{extraInfo}
				</p>
			</div>
		</div>
	);
};
