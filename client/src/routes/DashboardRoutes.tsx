import { DashboardLayout } from '@/component/layout/DashboardLayout'
import { Overview } from '@/pages/Dashboard/Overview'
import { Route } from 'react-router'

export const DashboardRoutes = () => [
    // Define dashboard-specific routes here

    <Route key="dashboard" element={<DashboardLayout />}>
        {/* Add dashboard routes here */}
        <Route path='/dashboard/overview' element={<Overview />} />
    </Route>
]