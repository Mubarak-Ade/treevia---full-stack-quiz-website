import { useNotification } from '@/context/NotificationProvider';
import { useLogout } from '@/modules/auth/controllers/auth.controller';
import { User } from '@/modules/auth/types/auth.types';
import { DoorOpen, Grid2x2, Settings, User2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Dispatch, memo, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router';
import { ProgressBar } from '../quiztaking/ProgressBar';

interface MenuProps {
    display: boolean;
    user?: User | null;
    logout: () => void;
    setDisplay: Dispatch<SetStateAction<boolean>>;
}

export const ProfileMenu = memo(({ display, user, logout, setDisplay }: MenuProps) => {
    const logoutMutation = useLogout();

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                showNotification('success', 'Log out successfull...');
                navigate('/login', { replace: true });
            },
        });
        logout;
    };
    return (
        <AnimatePresence>
            {display && (
                <motion.div
                    onMouseLeave={() => setDisplay(!display)}
                    // onMouseOut={() => }
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                    className="bg-surface fixed text-foreground w-70 mx-10 p-5 top-20 z-100 right-0 rounded-[2rem]"
                >
                    <div className="flex items-center flex-col gap-1">
                        <div className="size-15 relative rounded-full border-2 border-white bg-brand-subtle ring-2 ring-brand">
                            <span className="absolute bg-brand size-8 border-2 font-bold  p-2 text-sm text-on-brand rounded-full flex items-center justify-center -bottom-2 right-0">
                                42
                            </span>
                        </div>
                        <h4 className="capitalize font-display text-2xl font-bold text-primary">
                            {user?.username ?? 'John Doe'}
                        </h4>
                        <h6 className="text-lg font-extralight text-secondary">Level 42</h6>
                    </div>
                    <div className="mt-5 bg-surface-alt p-6 rounded-xl">
                        <div className="flex items-center mb-2 justify-between">
                            <h6 className="text-secondary font-semibold">XP Progress</h6>
                            <span className="text-primary text-xs font-bold">45</span>
                        </div>
                        <ProgressBar progress={50} />
                        {/* <p className="text-secondary/60 font-semibold text-sm mt-4">
                                {extraInfo}
                                </p> */}
                    </div>
                    <ul className="mt-4 space-y-1">
                        <motion.li
                            whileTap={{ scale: 0.9 }}
                            whileHover={{
                                backgroundColor: 'var(--color-brand)',
                                color: 'var(--color-on-brand)',
                            }}
                            className="text-secondary fill-secondary px-5 py-3 items-center rounded-full cursor-pointer"
                        >
                            <Link to="/dashboard/me" className="flex gap-2 items-center">
                                <User2 /> My Profile
                            </Link>
                        </motion.li>
                        <motion.li
                            whileTap={{ scale: 0.9 }}
                            whileHover={{
                                backgroundColor: 'var(--color-brand)',
                                color: 'var(--color-on-brand)',
                            }}
                            className="text-secondary fill-secondary px-5 py-3 items-center rounded-full cursor-pointer"
                        >
                            <Link
                                to={
                                    user?.role === 'admin' ? 'admin/overview' : 'dashboard/overview'
                                }
                                className="flex gap-2 items-center"
                            >
                                <Grid2x2 /> Achievements
                            </Link>
                        </motion.li>
                        <motion.li
                            whileTap={{ scale: 0.9 }}
                            whileHover={{
                                backgroundColor: 'var(--color-brand)',
                                color: 'var(--color-on-brand)',
                            }}
                            className="text-secondary fill-secondary px-5 py-3 items-center rounded-full cursor-pointer"
                        >
                            <Link to="" className="flex gap-2 items-center">
                                <Settings /> Settings
                            </Link>
                        </motion.li>
                    </ul>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{
                            backgroundColor: 'var(--color-red-800)',
                            color: 'var(--color-white)',
                        }}
                        className="text-red-500 flex items-center gap-2 font-semibold text-sm rounded-full w-full px-5 py-3 mt-4 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <DoorOpen />
                        Logout
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
