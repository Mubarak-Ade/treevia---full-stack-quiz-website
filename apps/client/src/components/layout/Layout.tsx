import { Navigate, useLocation } from 'react-router';
import Footer from '../feature/Footer';
import Navbar from '../feature/Navbar';
import useAuthStore from '@/modules/auth/store/auth.store';
import { AnimatedOutlet } from '../feature/Motion';

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
                <AnimatedOutlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
