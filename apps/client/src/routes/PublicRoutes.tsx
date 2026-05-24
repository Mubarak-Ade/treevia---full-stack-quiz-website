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
import { PageTransition } from "@/components/feature/Motion";
import ForgotPassword from "@/components/feature/Auth/ForgotPassword";
import ResetPassword from "@/components/feature/Auth/ResetPassword";
import VerifyEmail from "@/components/feature/Auth/VerifyEmail";

const PublicRoutes = (): JSX.Element[] => [
	<Route
		path="/quizzes/:id/questions"
		element={
            <PageTransition>
                <QuizTaking />
				
            </PageTransition>
        }
	/>,
	<Route
		path="/result"
		element={
            <PageTransition>
                <Result />
            </PageTransition>
        }
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
			path="/forgot-password"
			element={<ForgotPassword />}
		/>
		<Route
			path="/reset-password"
			element={<ResetPassword />}
		/>
		<Route
			path="/verify-email"
			element={<VerifyEmail />}
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
