import React from 'react'
import AuthFrame from '../component/Auth/AuthFrame'

const AuthPage = () =>
{
	return (
		<div className='flex min-h-[calc(100vh_-_80px)] py-10 px-5 justify-center items-center bg-linear-135 from-[#2d5a27] via-[#4a7c59] to-[#6b9080]'>
			<AuthFrame />
		</div>
	)
}

export default AuthPage
