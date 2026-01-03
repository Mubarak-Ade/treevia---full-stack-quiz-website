import { User } from "@/models/Auth";
import { ProfileAvatar } from "../share/ProfileAvatar";
import { SetStateAction } from "react";
import { motion } from 'motion/react';
import { ChevronDown } from "lucide-react";
import { LinkVariant } from "@/utils/Animation/variant/IntroAnimationVariant";
import { NavLink } from "react-router";

interface ProfileProps {
	user: User | null;
	setDisplay: React.Dispatch<SetStateAction<boolean>>;
	display: boolean;
}

export const ProfileTrigger = ({ user, setDisplay, display }: ProfileProps) => {
    return (
        <>
            {user ? (
                <div className="relative lg:ml-40 flex flex-row-reverse">
                    <div className="flex items-center justify-center gap-3">
                        <ProfileAvatar
                            username={user.username}
                            profile={user.profile}
                            className="size-15"
                        />

                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setDisplay((prev) => !prev)}
                            animate={{ rotate: display ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="text-teal-100 cursor-pointer" />
                        </motion.button>
                    </div>
                </div>
            ) : (
                <motion.span
                    className="px-8 py-4 md:py-2 text-center text-background rounded-full font-semibold text-sm bg-custom"
                    variants={LinkVariant}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <NavLink to="/login">Login</NavLink>
                </motion.span>
            )}
        </>
    );
};