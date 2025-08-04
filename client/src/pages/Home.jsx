import React from 'react'
import BgImage from '../assets/images/bg_image.jpg'
import { motion } from 'framer-motion'
import Hero from '../component/home/Hero'
import Features from '../component/home/Features'
import Footer from '../component/Footer'

const Home = () =>
{
    return (
        <div className={ `w-full h-screen gap-4 bg-linear-135 from-custom-100 from-0% via-50% to-100% via-custom-200 to-custom-300 relative bg-cover` }>
            <Hero />
            <Features />
            <Footer />
        </div>
    )
}

export default Home
