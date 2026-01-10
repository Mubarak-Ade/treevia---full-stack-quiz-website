import { RingLoader } from 'react-spinners'
import Leaf from "@/assets/images/green-leaf-icon.svg"
import { motion } from 'motion/react';

export const QuizLoader = ({loading = false} : {loading: boolean}) => {
  return loading && (
    <div className="w-full h-screen bg-background fixed z-50 flex flex-col items-center justify-center top-0 overflow-hidden">
      {/* Falling leaves background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({length: 50}, (_, i) => (
          <motion.img 
            key={i}
            initial={{
              y: -100,
              x: (i % 10) * (window.innerWidth / 10),
              rotate: 0,
              opacity: 0.05
            }}
            animate={{
              y: window.innerHeight + 100,
              x: [(i % 10) * (window.innerWidth / 10), (i % 10) * (window.innerWidth / 10) + (Math.random() - 0.5) * 100],
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            src={Leaf} 
            alt="" 
            className='size-20 absolute'
            style={{
              left: `${(i % 10) * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <RingLoader color='var(--color-primary-btn)' size={100} />
        <p className="text-primary-btn text-lg font-semibold">Loading...</p>
      </div>
    </div>
  )
}