import { cn } from "@/lib/utils";
import { getColorFromString } from "@/utils/colorFormat";
import { formatImage } from "@/utils/imageFormat";

interface Props {
    profile?: string, 
    username?: string,
    className?: string
}

export const ProfileAvatar = ({profile, username, className} : Props) => {

	console.log(profile);
	
	return (
		<div
			className={cn(`${
				getColorFromString(username).gradient
			} bg-linear-60 relative flex items-center justify-center rounded-full`, className)}
		>
			{profile ? (
				<div className="size-full overflow-hidden rounded-full">
					<img
						src={formatImage(profile)}
						alt={formatImage(profile)}
						className="w-full h-full object-cover"
					/>
				</div>
			) : (
				<span className={`text-2xl capitalize text-white`}>
					{username?.charAt(0)}
				</span>
			)}
		</div>
	);
};
