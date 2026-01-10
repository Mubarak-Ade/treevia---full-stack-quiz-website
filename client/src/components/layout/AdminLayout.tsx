import { SidebarProvider } from '@/components/ui/sidebar'
import { Links } from '@/models/Dashboard'
import { ChartNoAxesColumn, CircleQuestionMark, Grid, Grid2X2, Settings, Users } from 'lucide-react'
import { CSSProperties } from 'react'
import { Outlet } from 'react-router'
import { Modal } from '../../components/feature/admin/Modal'
import { SideBar } from '../feature/dashboard/SideBar'

export const AdminLayout = () => {
    const links: Links[] = [
        {
            label: "Dashboard",
            link: "overview",
            icon: <Grid2X2 />
        },
        {
            label: "Users",
            link: "users",
            icon: <Users />
        },
        {
            label: "Quiz",
            link: "quizzes",
            icon: <CircleQuestionMark />
        },
        {
            label: "Category",
            link: "category",
            icon: <Grid />
        },
        {
            label: "Analytic",
            link: "overview",
            icon: <ChartNoAxesColumn />
        },
        {
            label: "Setting",
            link: "overview",
            icon: <Settings />
        }
    ];
    return (
        <SidebarProvider style={{ ['--sidebar-width']: '18rem' } as CSSProperties}>
            <SideBar links={links} />
            <main className='bg-background overflow-hidden w-full'>
                <Outlet />
            </main>
            <Modal />
        </SidebarProvider>
    )
}
