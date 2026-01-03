import { AdminLayout } from "@/admin/layout/AdminLayout";
import { Overview } from "@/admin/pages/Overview";
import { QuizManagement } from "@/admin/pages/QuizManagement";
import { UserManagement } from "@/admin/pages/UserManagement";
import AdminRoute from "@/route/AdminRoute";
import { Route } from "react-router";

export const AdminRoutes = () => [
	<Route
		key="admin"
		element={
			<AdminRoute>
				<AdminLayout />
			</AdminRoute>
		}
	>
		<Route
			path="/admin/overview"
			element={<Overview />}
		/>
		<Route
			path="/admin/users"
			element={<UserManagement />}
		/>
		<Route
			path="/admin/quizzes"
			element={<QuizManagement />}
		/>
	</Route>,
];
