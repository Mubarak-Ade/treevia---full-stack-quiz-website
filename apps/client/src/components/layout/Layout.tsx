import { Navigate, Outlet, useLocation } from 'react-router';
import Footer from '../feature/Footer';
import Navbar from '../feature/Navbar';
import useAuthStore from '@/modules/auth/store/auth.store';

const Layout = () => {
    // const isDashboard = location.pathname.startsWith('/admin' || '/user')

    const location = useLocation();

    const isAuthPage =
        location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

    const user = useAuthStore(s => s.user);

    if (user && isAuthPage) {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-base min-h-screen">
            <Navbar />
            <main className="relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
