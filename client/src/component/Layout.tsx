import { Outlet } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'

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