import Logo from '@/assets/logos.png';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Links } from '@/models/Dashboard';
import { useLogout } from '@/modules/auth/controllers/auth.controller';
import useAuthStore from '@/modules/auth/store/auth.store';
import useThemeStore from '@/stores/useThemeStore';
import { LogOut, MoonStar, SunMedium } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const SideBarBtn = ({
    label,
    icon,
    link,
}: {
    label: string;
    icon: React.ReactNode;
    link: string;
}) => {
    const user = useAuthStore(s => s.user);
    return (
        <motion.div
            whileHover={{
                backgroundColor: 'var(--color-brand)',
                color: 'var(--color-on-brand)',
            }}
            whileTap={{
                scale: 0.8,
            }}
            className="rounded-full text-primary"
        >
            <SidebarMenuItem className="px-4 py-2">
                <SidebarMenuButton>
                    <Link
                        to={`${user?.role === 'admin' ? 'admin' : 'dashboard'}/${link}`}
                        className="flex gap-2 text-sm font-poppins items-center"
                    >
                        {icon} {label}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </motion.div>
    );
};

export const SideBar = ({ links }: { links: Links[] }) => {
    const logout = useLogout();
    const theme = useThemeStore(s => s.theme);
    const toggleTheme = useThemeStore(s => s.toggleTheme);

    return (
        <div className="bg-surface-alt">
            <Sidebar className="border-default">
                <SidebarHeader className="flex flex-row gap-3 p-5 items-center border-b border-default">
                    <div className="size-14 rounded-full flex items-center justify-center shadow-lg ring-2 ring-custom">
                        <img src={Logo} alt="Treevia Logo" className="" />
                    </div>
                    <Link to="/" className="flex flex-col">
                        <div className="flex justify-between">
                            <h1 className="text-3xl text-primary w-full font-bold tracking-tight">
                                Treevia
                            </h1>
                        </div>
                        <h6 className="text-sm text-secondary font-medium">Grow Your Knowledge</h6>
                    </Link>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className=" flex size-10 items-center justify-center text-on-brand rounded-full bg-brand cursor-pointer transition-transform hover:-translate-y-0.5"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <SunMedium size={20} /> : <MoonStar size={20} />}
                    </button>
                </SidebarHeader>
                <SidebarContent className="px-3 py-4">
                    <SidebarMenu className="space-y-2">
                        {links.map(link => (
                            <SideBarBtn label={link.label} icon={link.icon} link={link.link} />
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <motion.button
                        whileHover={{
                            backgroundColor: '#00ff6d33',
                            color: '#00ff6d',
                        }}
                        whileTap={{
                            scale: 0.8,
                        }}
                        onClick={() => logout.mutate()}
                        className="flex items-center gap-4 px-5 py-2.5 rounded-md text-secondary font-medium cursor-pointer"
                    >
                        <LogOut />
                        Logout
                    </motion.button>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};
