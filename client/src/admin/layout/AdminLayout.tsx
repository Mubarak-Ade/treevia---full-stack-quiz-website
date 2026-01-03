import { SideBar } from '@/component/dashboard/SideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Links } from '@/models/Dashboard'
import { ChartNoAxesColumn, CircleQuestionMark, Grid2X2, Settings, Users } from 'lucide-react'
import React, { CSSProperties } from 'react'
import { Outlet } from 'react-router'

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
                label: "Quiz Management",
                link: "quizzes",
                icon: <CircleQuestionMark />
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
        <main className='bg-background overflow-hidden h-screen w-full'>
            <Outlet />
        </main>
    </SidebarProvider>
  )
}
