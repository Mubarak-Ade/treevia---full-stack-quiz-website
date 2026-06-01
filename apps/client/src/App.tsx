import { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import './App.css';
import useAuthStore from './modules/auth/store/auth.store';
import { useFetchUser } from './modules/user/controllers/user.controller';
import AppRoutes from './routes/AppRoutes';
import useThemeStore from './stores/useThemeStore';
import { QuizLoader } from './components/feature/QuizLoader';

function App() {
    const setAuth = useAuthStore(s => s.setAuth);
    const clearAuth = useAuthStore(s => s.clearAuth);
    const isAuthLoading = useAuthStore(s => s.isAuthLoading);

    const { data: user, isLoading } = useFetchUser();
    const initTheme = useThemeStore(s => s.initTheme);

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    console.log({user})

    useEffect(() => {
        if (isLoading) return
            if (user) {
                setAuth(user.data);
            } else {
                clearAuth();
            }

    }, [isLoading, user, setAuth, clearAuth]);

    return <BrowserRouter>{isAuthLoading ? <QuizLoader loading /> : <AppRoutes />}</BrowserRouter>;
}

export default App;
