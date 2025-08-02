import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-4'>
            <h1 className='text-9xl font-bold'>404</h1>
            <h2 className='text-5xl font-medium'>Not Found</h2>
            <p className='text-2xl'>The request page could not be found</p>
            <Link to="/"  className='text-xl cursor-pointer bg-teal-500 px-4 py-2 text-white rounded-xl'>GO Home</Link>
        </div>
    );
}

export default NotFound;
