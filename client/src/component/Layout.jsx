import {Outlet, useLocation} from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import Loading from '../utils/Animation/loading'
import BreadCrumbs from './BreadCrumbs'

const Layout = () => {

	const location = useLocation()

	const isDashboard = location.pathname.startsWith('/admin' || '/user')

	return (
		<>
			{!isDashboard && <Navbar />}
			<main className=''>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout