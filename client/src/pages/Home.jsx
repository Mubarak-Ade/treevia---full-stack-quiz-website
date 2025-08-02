import React from 'react'
import BgImage from '../assets/images/bg_image.jpg'
import { motion } from 'framer-motion'

const Home = () => {
    return (
        <div className={`w-full h-screen gap-4 bg-forest relative bg-cover`}>
            <div className="bg-linear-230 flex flex-col gap-5 items-center justify-center from-purple-900/30 via-teal-400/10 to-yellow-500/10 via-80% from-20% to-90% h-screen w-full absolute">
                <h1 className='text-5xl z-50 text-center text-white font-montserrat font-bold'>Welcome to Treevia </h1>
                <h2 className='text-4xl z-50 text-center text-white font-lora font-semibold'>Test Your Knowledge </h2>
                <motion.button 
                    whileHover={{
                        backgroundColor: 'var(--color-text-white)',
                        color: 'var(--color-white)',
                        border: '1px solid var(--color-white)'
                    }}
                    whileTap={{
                        scale: .9
                    }}
                className="text-xl bg-treevia-primary w-36 h-12 text-treevia-light border border-treevia-light rounded cursor-pointer">Start Quiz</motion.button>
            </div>
        </div>
    )
}

export default Home
