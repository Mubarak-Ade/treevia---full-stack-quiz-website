import { Outlet } from 'react-router'
import Footer from '../feature/Footer'
import Navbar from '../feature/Navbar'

const Layout = () => {

	// const isDashboard = location.pathname.startsWith('/admin' || '/user')

	return (
		<>
			<Navbar />
			<main className=''>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout