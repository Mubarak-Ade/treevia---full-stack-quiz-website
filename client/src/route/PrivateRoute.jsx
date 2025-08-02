import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

const PrivateRoute = () => {

	const user = useSelector((state) => state.auth.user)
	const navigate = useNavigate()

	useEffect(() => {
		JSON.parse(localStorage.getItem('user'))
	}, []);	

	return ( user ? <Outlet /> : navigate('/login') )
}

export default PrivateRoute
