import { Route } from "react-router";
import Layout from "../component/Layout";
import Home from "../pages/Home";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";
import { CategoryPage } from "@/pages/Quiz/CategoryPage";
import { QuizList } from "@/pages/Quiz/QuizList";
import { QuizTaking } from "@/pages/Quiz/QuizTaking";
import Result from "@/pages/Quiz/Result";

const PublicRoutes = (): JSX.Element[] => [
	<Route
		path="/quizzes/:id/questions"
		element={<QuizTaking />}
	/>,
	<Route
		path="/result/:id"
		element={<Result />}
	/>,

	<Route
		key="layout"
		element={<Layout />}
	>
		<Route
			path="/"
			element={<Home />}
		/>
		<Route
			path="/login"
			element={<AuthPage />}
		/>
		<Route
			path="/register"
			element={<AuthPage />}
		/>
		<Route
			path="/quizzes"
			element={<CategoryPage />}
		/>
		<Route
			path="/quizzes/:slug"
			element={<QuizList />}
		/>
		<Route
			path="*"
			element={<NotFound />}
		/>
	</Route>,
];

export default PublicRoutes;
