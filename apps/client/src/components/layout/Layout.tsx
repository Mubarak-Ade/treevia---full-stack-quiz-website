import { Outlet } from 'react-router'
import Footer from '../feature/Footer'
import Navbar from '../feature/Navbar'

const Layout = () => {

	// const isDashboard = location.pathname.startsWith('/admin' || '/user')

	return (
		<div className="bg-base min-h-screen">
			<Navbar />
			<main className="relative z-10">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
