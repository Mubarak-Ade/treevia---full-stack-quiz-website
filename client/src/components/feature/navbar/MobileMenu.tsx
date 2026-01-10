import { User } from "@/features/auth/type";
import { SetStateAction } from "react";
import { motion } from 'motion/react';
import { NavLink } from "react-router";
import { ChevronRight } from "lucide-react";
import { ProfileAvatar } from "../share/ProfileAvatar";
import { Link } from "@/types";

export const MobileMenu = ({
    links,
    user,
    setDisplay,
}: {
    links: Link[];
    user: User | null;
    setDisplay: React.Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <>
            <ul className="flex flex-col gap-4 text-white text-2xl">
                {links.map((item, index) => (
                    <motion.button
                        key={index}
                        className="p-5 flex items-center justify-between border border-custom rounded-xl"
                        whileHover={{
                            color: "var(--color-custom)",
                        }}
                        whileTap={{
                            scale: 0.9,
                            color: "var(--color-custom)",
                        }}
                    >
                        <NavLink
                            className={({ isActive }) =>
                                `${isActive
                                    ? "text-custom p-5 rounded-full"
                                    : ""
                                } flex items-center gap-4`
                            }
                            to={`${item.link.toLowerCase()}`}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                        <ChevronRight />
                    </motion.button>
                ))}
                <motion.button
                    whileHover={{
                        color: "var(--color-custom)",
                    }}
                    whileTap={{
                        scale: 0.9,
                        color: "var(--color-custom)",
                    }}
                    onClick={() => setDisplay((prev) => !prev)}
                    className="flex p-4 rounded-xl items-center border border-custom gap-4"
                >
                    <ProfileAvatar
                        username={user?.username}
                        profile={user?.profile}
                        className="size-15"
                    />
                    <div className="flex-1 flex flex-col">
                        <h6 className="text-lg text-start text-custom capitalize">
                            {user?.username}
                        </h6>
                        <span className="text-xs text-start text-secondary">
                            View Details
                        </span>
                    </div>
                    <ChevronRight className="" />
                </motion.button>
            </ul>
        </>
    );
};