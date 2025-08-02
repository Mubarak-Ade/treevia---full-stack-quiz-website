import { motion } from "framer-motion";
import React from "react";
const SvgLoader = ({text}) => {
    const dots = Array.from({ length: 8 });
    return (
        <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-teal-700">
            <svg className="z-50 size-30" viewBox="0 0 100 100">
                <motion.g 
                animate={{rotate: 360}}
                transition={{repeat: Infinity, duration: 1.5, ease: "linear"}}
                >
                    
                    {dots.map((_, i) => {
                        const angle = (i / dots.length) * 360;
                        const radius = 35;
                        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                        return (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="10"
                                fill="#fff"
                                initial={{
                                    opacity: 0.3,
                                }}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                }}
                            />
                        );
                    })}
                </motion.g>
            </svg>
            <motion.p
            className="mt-4 text-3xl font-medium text-teal-100"
            animate={{
                opacity: [0.2, 1, 0.2],
            }}
                transition={{duration: 2, repeat: Infinity}}
            >
                {text}
            </motion.p>
        </div>
    );
};

export default SvgLoader;
