import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import QuizList from "../pages/Quiz/QuizList";
import QuizTaking from "../pages/Quiz/QuizTaking";
import QuizPage from "../pages/Quiz/QuizPage";
import Layout from "../component/Layout";
import { Route, Routes } from "react-router";
import Result from "../pages/Quiz/Result";
import NotFound from "../pages/NotFound";
import AuthPage from "../pages/AuthPage";

const PublicRoutes = () => [
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* Home Page Route */}
        <Route path="/login" element={<AuthPage />} />
        {/* Login Page Route */}
        <Route path="/register" element={<AuthPage />} />
        {/* register Page Route */}
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/quiz/:id" element={<QuizList />} />
        <Route path="/quiz/:id/start" element={<QuizTaking />} />
        <Route path="/quiz/:id/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
    </Route>,
];

export default PublicRoutes;
