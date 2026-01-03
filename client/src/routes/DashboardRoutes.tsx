import { DashboardLayout } from "@/component/layout/DashboardLayout";
import { Overview } from "@/pages/Dashboard/Overview";
import { Profile } from "@/pages/Dashboard/Profile";
import PrivateRoute from "@/route/PrivateRoute";
import { Route } from "react-router";

export const DashboardRoutes = () => [
	// Define dashboard-specific routes here

	<Route
		key="dashboard"
		element={
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		}
	>
		{/* Add dashboard routes here */}
		<Route
			path="/dashboard/overview"
			element={<Overview />}
		/>
		<Route path="/dashboard/me" element={<Profile />} />
	</Route>,
];
