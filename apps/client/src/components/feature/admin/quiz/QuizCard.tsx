import React from 'react';

interface QuizCardProps {
    title: string,
    value: number | string
    info: string
}

export const QuizCard = ({title, value, info}: QuizCardProps) => {
    return (
        <div className="bg-cta rounded-lg border border-default p-6 space-y-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                {title}
            </p>
            <div className="flex items-end justify-between">
                <h2 className="text-4xl font-bold text-primary">{value}</h2>
                <span className="text-xs text-brand font-semibold">{info}</span>
            </div>
        </div>
    );
};
