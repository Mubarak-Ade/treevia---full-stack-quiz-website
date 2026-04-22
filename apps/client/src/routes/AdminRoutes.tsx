import { AdminLayout } from "@/components/layout/AdminLayout";
import { CategoryManagement } from "@/pages/Admin/CategoryManagement";
import { CreateQuiz } from "@/pages/Admin/CreateQuiz";
import { Overview } from "@/pages/Admin/Overview";
import { QuizManagement } from "@/pages/Admin/QuizManagement";
import { UserManagement } from "@/pages/Admin/UserManagement";
import AdminRoute from "@/routes/protected/AdminRoute";
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
		<Route
			path="/admin/quizzes/create"
			element={<CreateQuiz />}
		/>
		<Route
			path="/admin/category"
			element={<CategoryManagement />}
		/>
	</Route>,
];
