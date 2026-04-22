import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/modules/quiz/store/quiz.store';
import { Category } from '@/modules/quiz/types/quiz.types';
import { getColorFromString } from '@/utils/colorFormat';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { MotionWrap } from '../Motion';

export const CategoriesCard: React.FC<Category> = ({
    slug,
    name,
    tags,
    description,
    quizCount,
}: Category) => {
    const navigate = useNavigate();

    const setFilter = useQuizStore(s => s.setFilter);

    const handleCategoryClick = () => {
        setFilter(slug!);
        navigate(`/quizzes/${slug}`);
    };

    const color = getColorFromString(name);
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                boxShadow: '1px 0 10px 5px var(--color-secondary-bg)',
            }}
            className={`bg-surface border border-default w-full cursor-pointer rounded-4xl overflow-hidden`}
        >
            <div className={` relative h-20`}>
                <span
                    className={`${color.bgt} ${color.text} absolute bottom-0 m-4 rounded-full  size-10 flex items-center justify-center font-medium text-xl text-center`}
                >
                    {name.charAt(0)}
                </span>
                <span className={`text-secondary absolute m-3 font-medium right-0 rounded-full`}>
                    {quizCount} quizzes
                </span>
                <span
                    className={` ${color.text} absolute top-15 right-8 italic opacity-20 rounded-full  size-10 flex items-center justify-center font-display text-7xl text-center`}
                >
                    {name.charAt(0)}
                </span>
            </div>
            <div className="p-4 w-full">
                <h4 className="font-bold text-lg mb-2 line-clamp-1 text-secondary dark:text-tertiary">
                    {name}
                </h4>
                <p className="text-sm text-primary my-3 w-full">
                    {description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta euismod consectetur nunc vitae.'}
                </p>
                
            </div>
            <div className="p-4">
                <MotionWrap
                    as={Button}
                    whileHover={
                        {
                            // backgroundColor: 'var(--color-secondary)',
                        }
                    }
                    whileTap={{
                        scale: 0.9,
                    }}
                    onClick={handleCategoryClick}
                    className={`w-full cursor-pointer ${color.hover} border ${color.border} bg-white hover:text-white ${color.text}`}
                >
                    Play Now
                </MotionWrap>
            </div>
        </motion.div>
    );
};
