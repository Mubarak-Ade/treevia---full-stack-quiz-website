import React, { useContext } from 'react'
import { MyContext } from '../context/AppContext'
import { motion } from "framer-motion"
import { FaX } from 'react-icons/fa6'

const Notification = ({id, type = "info", message, onClose}) => {

    const variants = {
        hidden: {
            opacity: 0,
            y: -20
        },
        visible: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 20
        },
    }

    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
    }

    return (
        <motion.div 
            variants={variants}
            animate="visible"
            exit="exit"
            initial="hidden"
            layout
            className={`w-100 h-20 flex justify-center  ${typeStyles[type]} top-0 right-0 m-5 px-8 py-4 rounded-xl text-white`}>
            <span className='flex-1'>{message}</span>
            <button className='cursor-pointer' onClick={onClose}><FaX /></button>
        </motion.div>
    )
}

export default Notification
