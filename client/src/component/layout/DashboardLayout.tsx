import { SidebarProvider } from '@/components/ui/sidebar';
import type { CSSProperties } from 'react';
import { Outlet } from 'react-router';
import { SideBar } from '../dashboard/SideBar';

export const DashboardLayout = () => {
  return (
    <SidebarProvider style={{ ['--sidebar-width']: '18rem' } as CSSProperties}>
        <SideBar />
        <main className='bg-background overflow-hidden h-screen w-full'>
            <Outlet />
        </main>
    </SidebarProvider>
  )
}
