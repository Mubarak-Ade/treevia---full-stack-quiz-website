import { motion } from 'framer-motion';
import React from 'react';
import Logo from '../../assets/logo.png';

const Loading: React.FC = () => {
  return (
    <div className="h-screen fixed bg-teal-800/20 z-50 inset-0 flex flex-col items-center justify-center gap-15">
      <div className="flex flex-col gap-5">
        <div className="relative size-30">
          <motion.img
            initial={{
              scale: 0.7,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              repeat: Infinity,
              ease: 'easeInOut',
              duration: 1,
            }}
            src={Logo}
            alt="Loading"
            className="size-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover rounded-full"
          />
          <motion.svg
            className="size-30 text-teal-500 absolute inset-0"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 2,
            }}
          >
            <circle cx="25" cy="25" r="20" />
          </motion.svg>
        </div>
      </div>
    </div>
  );
};

export default Loading;
