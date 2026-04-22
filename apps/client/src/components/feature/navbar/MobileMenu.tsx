import { User } from '@/modules/auth/types/auth.types';
import { SetStateAction } from 'react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { MoonStar, SunMedium } from 'lucide-react';
import { ProfileAvatar } from '../share/ProfileAvatar';
import { Link } from '@/types';
import { LinkVariant } from '@/utils/Animation/variant/IntroAnimationVariant';
import type { ThemeMode } from '@/stores/useThemeStore';

export const MobileMenu = ({
    links,
    user,
    setDisplay,
    theme,
    toggleTheme,
}: {
    links: Link[];
    user: User | null;
    setDisplay: React.Dispatch<SetStateAction<boolean>>;
    theme: ThemeMode;
    toggleTheme: () => void;
}) => {
    return (
        <>
            <ul className="flex flex-col gap-4 text-foreground text-2xl">
                <motion.button
                    className="border border-primary cursor-pointer p-5 flex items-center justify-between rounded-4xl"
                    whileTap={{ scale: 0.97 }}
                    onClick={toggleTheme}
                >
                    <span className="flex dark:text-primary text-secondary items-center gap-4 text-lg font-semibold">
                        {theme === 'dark' ? <SunMedium /> : <MoonStar />}
                        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
                    </span>
                    <ChevronRight />
                </motion.button>
                {links.map((item, index) => (
                    <motion.button
                        key={index}
                        className="leaf-card p-5 flex items-center justify-between rounded-[2rem]"
                        whileHover={{
                            color: 'var(--color-custom)',
                        }}
                        whileTap={{
                            scale: 0.9,
                            color: 'var(--color-custom)',
                        }}
                    >
                        <NavLink
                            className={({ isActive }) =>
                                `${isActive ? 'text-custom' : ''} flex items-center gap-4`
                            }
                            to={`${item.link.toLowerCase()}`}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                        <ChevronRight />
                    </motion.button>
                ))}
                {user ? (
                    <motion.button
                        whileHover={{
                            color: 'var(--color-custom)',
                        }}
                        whileTap={{
                            scale: 0.9,
                            color: 'var(--color-custom)',
                        }}
                        onClick={() => setDisplay(prev => !prev)}
                        className="bg-transparent border border-primary flex p-4 rounded-[2rem] items-center gap-4"
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
                            <span className="text-xs text-start text-secondary dark:text-tertiary">View Details</span>
                        </div>
                        <ChevronRight className="" />
                    </motion.button>
                ) : (
                    <NavLink to="/login" className="w-full">
                        <motion.span
                            className="bg-brand text-on-brand w-full inline-block cursor-pointer px-8 py-4 md:py-2 text-center rounded-full font-semibold text-sm"
                            whileHover={{
                                backgroundColor: 'transparent',
                                border: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                            }}
                        >
                            Login
                        </motion.span>
                    </NavLink>
                )}
            </ul>
        </>
    );
};
