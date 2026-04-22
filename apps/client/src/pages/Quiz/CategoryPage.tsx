import { CategoriesCard } from '@/components/feature/categories/CategoriesCard';
import { QuizLoader } from '@/components/feature/QuizLoader';
import { useFetchCategories } from '@/modules/quiz/controllers/quiz-api.controller';
import Treevia from "@/assets/images/treevia-1.png"
import { Search } from 'lucide-react';

export const CategoryPage = () => {
    const { data, isLoading, isError } = useFetchCategories();

    if (isLoading || !data) {
        return <QuizLoader loading={isLoading} />;
    }

    if (isError) {
        return <p>error loading categories</p>;
    }

    data;

    return (
        <div className="w-full m-auto">
            <section className="h-150 flex p-10 justify-between overflow-hidden">
                <div className="relative z-10 p-6 mt-10 max-w-xl">
                   <p className="mb-8 inline-flex  items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand bg-brand-subtle">
						Cultivate Wisdom
					</p>
                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-primary mb-4 neon-glow">
                        Explore the Grove
                    </h1>
                    <p className="font-body text-lg text-secondary font-light tracking-wide ">
                        Wander through our curated ecosystems of knowledge. Each grove represents a unique cluster of wisdom, meticulously organized to help you get lost in discovery and find precisely what you seek.
                    </p>
                </div>
				<div className="rounded-4xl mt-5 mr-10 rotate-15 size-110 overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        data-alt="ultra-wide cinematic shot of a deep mystical forest with bioluminescent plants glowing in vibrant neon green at night"
                        src={Treevia}
                    />
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>
            </section>
            <section className="p-6 md:px-12 -mt-12 relative z-20">
                <div className="bg-base rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-default shadow-xl">
                    <div className="relative w-full md:w-96 group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-brand">
                            <Search />
                        </span>
                        <input
                            className="w-full bg-cta border-none rounded-full py-4 pl-12 pr-6 text-primary focus:ring-2 focus:ring-primary transition-all"
                            placeholder="Search the categories..."
                            type="text"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button className="px-6 py-2 rounded-full bg-brand text-on-brand font-bold shadow-[0_0_15px_rgba(87,241,118,0.3)]">
                            All Seeds
                        </button>
                        <button className="px-6 py-2 rounded-full bg-brand-subtle text-on-brand hover:bg-surface-bright transition-colors">
                            Newest
                        </button>
                        <button className="px-6 py-2 rounded-full bg-brand-subtle text-on-brand hover:bg-surface-bright transition-colors">
                            Most Popular
                        </button>
                        <button className="px-6 py-2 rounded-full bg-brand-subtle text-on-brand hover:bg-surface-bright transition-colors">
                            Hardest
                        </button>
                    </div>
                </div>
            </section>
            <ul className="mt-10 gap-10 max-w-7xl p-10 m-auto place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.map((category, index) => (
                    <CategoriesCard
                        key={index}
                        name={category.name}
                        quizCount={category.quizCount}
                        slug={category.slug}
                        description={category.description}
                        tags={category.tags}
                    />
                ))}
            </ul>
        </div>
    );
};
