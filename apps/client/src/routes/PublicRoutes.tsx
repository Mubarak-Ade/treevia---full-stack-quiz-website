import Layout from "@/components/layout/Layout";
import { EmptyBoard } from "@/pages/Empty/EmptyBoard";
import { Leaderboard } from "@/pages/Leaderboard";
import NotFound from "@/pages/NotFound";
import { CategoryPage } from "@/pages/Quiz/CategoryPage";
import { QuizList } from "@/pages/Quiz/QuizList";
import { QuizTaking } from "@/pages/Quiz/QuizTaking";
import Result from "@/pages/Quiz/Result";
import { JSX } from "react";
import { Route } from "react-router";
import Home from "../pages/Home";
import { EmptyLayout } from "@/components/layout/EmptyLayout";
import Register from "@/components/feature/Auth/Register";
import Login from "@/components/feature/Auth/Login";

const PublicRoutes = (): JSX.Element[] => [
	<Route
		path="/quizzes/:id/questions"
		element={<QuizTaking />}
	/>,
	<Route
		path="/result"
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

		<Route key="empty" element={<EmptyLayout />}>
			<Route path="/empty/board" element={<EmptyBoard />} />
		</Route>

		<Route
			path="/login"
			element={<Login />}
		/>
		<Route
			path="/register"
			element={<Register />}
		/>
		<Route
			path="/quizzes"
			element={<CategoryPage />}
		/>
		<Route
			path="/leaderboard"
			element={<Leaderboard />}
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
