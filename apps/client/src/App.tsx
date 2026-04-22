import { useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import './App.css';
import useAuthStore from './modules/auth/store/auth.store';
import { getUserInfo } from './modules/user/services/user.service';
import AppRoutes from './routes/AppRoutes';
import useThemeStore from './stores/useThemeStore';
import { useFetchUser } from './modules/user/controllers/user.controller';

function App() {
    const setAuth = useAuthStore(s => s.setAuth);

    const { data: user } = useFetchUser();
    const initTheme = useThemeStore(s => s.initTheme);

    useEffect(() => {
        initTheme();
    }, [initTheme]);

    useEffect(() => {
        if (user) {
            setAuth(user.data);
        }
    }, [user]);

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
