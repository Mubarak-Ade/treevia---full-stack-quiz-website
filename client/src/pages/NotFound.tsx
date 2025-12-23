import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='h-screen flex flex-col text-secondary justify-center items-center gap-4'>
            <h1 className='text-9xl font-bold'>404</h1>
            <h2 className='text-5xl font-medium'>Not Found</h2>
            <p className='text-2xl'>The request page could not be found</p>
            <Link to="/"  className='text-sm cursor-pointer bg-primary-btn px-6 py-2 text-secondary-btn rounded-xl'>GO Home</Link>
        </div>
    );
}

export default NotFound;
