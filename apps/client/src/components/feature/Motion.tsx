import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type HTMLMotionProps,
    type MotionProps as MotionReactProps,
    type Variants,
} from 'motion/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router';

const defaultViewport = { once: true, amount: 0.2 } as const;
const easeOut = [0.22, 1, 0.36, 1] as const;

export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 18,
        filter: 'blur(8px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    exit: {
        opacity: 0,
        y: -14,
        filter: 'blur(6px)',
    },
};

export const revealVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
        },
    },
};

export const hoverLift = {
    y: -4,
    transition: {
        duration: 0.2,
        ease: easeOut,
    },
};

export const tapPress = {
    scale: 0.98,
    transition: {
        duration: 0.14,
        ease: easeOut,
    },
};

type MotionWrapProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'> &
    MotionReactProps;

export const MotionWrap = <T extends React.ElementType = 'div'>({
    as,
    children,
    ...props
}: MotionWrapProps<T>) => {
    const Component = motion.create(as ?? 'div');
    return <Component {...props}>{children}</Component>;
};

type MotionDivProps = React.PropsWithChildren<HTMLMotionProps<'div'>>;

export const PageTransition = ({ children, ...props }: MotionDivProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? { opacity: 0 } : 'initial'}
            animate={reduceMotion ? { opacity: 1 } : 'animate'}
            exit={reduceMotion ? { opacity: 0 } : 'exit'}
            variants={reduceMotion ? undefined : pageVariants}
            transition={{
                duration: reduceMotion ? 0.16 : 0.34,
                ease: easeOut,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const Reveal = ({ children, ...props }: MotionDivProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={defaultViewport}
            variants={reduceMotion ? undefined : revealVariants}
            transition={{
                duration: 0.42,
                ease: easeOut,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const Stagger = ({ children, ...props }: MotionDivProps) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={defaultViewport}
            variants={reduceMotion ? undefined : staggerContainer}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const AnimatedOutlet = ({ className }: { className?: string }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname} className={className}>
                <Outlet />
            </PageTransition>
        </AnimatePresence>
    );
};
