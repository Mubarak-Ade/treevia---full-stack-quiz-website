import { Pen, Settings, Share2 } from "lucide-react";
import { ProgressBar } from "../quiztaking/ProgressBar";
import { ProfileAvatar } from "../share/ProfileAvatar";

interface Props {
    username: string,
    bio?: string,
    profile?: string,
    totalXp: number,
    nextXp: number,
    level: number
}
export const ProfileHeader = ({username, bio, profile, level, nextXp, totalXp} : Props) => { 
    
    const progress = (totalXp / nextXp) * 100

	return (
		<div className="p-5 bg-card rounded-xl grid grid-cols-[150px_1fr] border border-muted shadow-[0_5px_12px] shadow-background">
			<div className="relative size-30 row-span-2">
				<ProfileAvatar
					username={username}
                    profile={profile}
					className="border-2 size-full absolute border-custom text-6xl"
				/>
				<button className="absolute cursor-pointer text-custom bottom-0 bg-muted rounded-full p-2 right-0">
					<Pen size={20} />
				</button>
			</div>
			<div className="flex justify-between capitalize w-full items-center">
				<div className="">
					<h1 className="text-4xl font-bold text-white">
						{username}
					</h1>
					<h6 className="text-sm text-secondary">
						{bio ? bio : "Hello Nice to meet you"}
					</h6>
				</div>
				<div className="flex gap-2">
					<button className="flex gap-2 text-white rounded-md bg-secondary-btn px-4 py-2">
						<Settings /> Settings
					</button>
					<button className="flex gap-2 bg-primary-btn p-2 rounded-md text-secondary-btn">
						<Share2 /> Share Profile
					</button>
				</div>
			</div>
			<div className="col-start-2">
				<div className="flex items-center justify-between">
					<h6 className="text-secondary font-semibold">
						Level {level}
					</h6>
					<span className="text-custom text-xs font-bold">XP: {totalXp} / {nextXp}</span>
				</div>
				<ProgressBar progress={progress} />
			</div>
		</div>
	);
};
