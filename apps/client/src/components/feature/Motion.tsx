import { motion, type MotionProps as MotionReactProps } from 'motion/react';
import React from 'react';

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