import { CategoriesCard } from '@/components/feature/categories/CategoriesCard';
import { Button } from '@/components/ui/button';
import { Reveal, Stagger } from '@/components/feature/Motion';
import { QuizLoader } from '@/components/feature/QuizLoader';
import { useFetchCategories } from '@/modules/quiz/controllers/quiz-api.controller';
import Treevia from "@/assets/images/treevia-1.png"
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type CategorySort = 'all' | 'newest' | 'popular';

export const CategoryPage = () => {
    const { data, isLoading, isError } = useFetchCategories();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<CategorySort>('all');
    const categories = data ?? [];

    const filteredCategories = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const visibleCategories = [...categories].filter(category => {
            if (!normalizedSearch) return true;

            const tagText = category.tags
                ?.map(tag => (typeof tag === 'string' ? tag : tag.name))
                .join(' ')
                .toLowerCase();

            return [category.name, category.description, tagText]
                .filter(Boolean)
                .some(value => value?.toLowerCase().includes(normalizedSearch));
        });

        if (sortBy === 'newest') {
            return visibleCategories.sort(
                (a, b) =>
                    new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime()
            );
        }

        if (sortBy === 'popular') {
            return visibleCategories.sort((a, b) => (b.quizCount ?? 0) - (a.quizCount ?? 0));
        }

        return visibleCategories;
    }, [categories, searchTerm, sortBy]);

    if (isLoading || !data) {
        return <QuizLoader loading={isLoading} />;
    }

    if (isError) {
        return <p>error loading categories</p>;
    }

    return (
        <div className="w-full m-auto">
            <section className="min-h-150 flex lg:flex-row flex-col-reverse items-center p-10 justify-between overflow-hidden">
                <Reveal className="relative z-10 p-6 mt-10 max-w-xl">
                   <p className="mb-8 inline-flex  items-center gap-2 rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brand bg-brand-subtle">
						Cultivate Wisdom
					</p>
                    <h1 className="font-headline text-4xl md:text-7xl font-extrabold tracking-tighter text-primary mb-4 neon-glow">
                        Explore the Grove
                    </h1>
                    <p className="font-body md:text-lg text-sm text-secondary font-light tracking-wide ">
                        Wander through our curated ecosystems of knowledge. Each grove represents a unique cluster of wisdom, meticulously organized to help you get lost in discovery and find precisely what you seek.
                    </p>
                </Reveal>
				<Reveal className="rounded-4xl mt-5 mr-10 rotate-15 max-w-md aspect-square overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        data-alt="ultra-wide cinematic shot of a deep mystical forest with bioluminescent plants glowing in vibrant neon green at night"
                        src={Treevia}
                    />
                    <div className="absolute inset-0 hero-gradient"></div>
                </Reveal>
            </section>
            <Reveal className="p-6 md:px-12 -mt-12 relative z-20">
                <div className="bg-base rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between border border-default shadow-xl">
                    <div className="relative w-full md:w-96 group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-brand">
                            <Search />
                        </span>
                        <input
                            className="w-full bg-cta border-none rounded-full py-4 pl-12 pr-6 text-primary focus:ring-2 focus:ring-primary transition-all"
                            placeholder="Search the categories..."
                            type="text"
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            type="button"
                            onClick={() => setSortBy('all')}
                            className={`md:px-6 py-2 px-2 md:text-base text-xs font-bold shadow-[0_0_15px_rgba(87,241,118,0.3)] ${
                                sortBy === 'all' ? 'bg-brand text-on-brand' : 'bg-brand-subtle text-on-brand'
                            }`}
                        >
                            All Seeds
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setSortBy('newest')}
                            className={`md:px-6 md:py-2 px-2 py-1 md:text-base text-xs text-on-brand hover:bg-surface-bright ${
                                sortBy === 'newest' ? 'bg-brand' : 'bg-brand-subtle'
                            }`}
                        >
                            Newest
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setSortBy('popular')}
                            className={`md:px-6 md:py-2 px-2 py-1 md:text-base text-xs text-on-brand hover:bg-surface-bright ${
                                sortBy === 'popular' ? 'bg-brand' : 'bg-brand-subtle'
                            }`}
                        >
                            Most Popular
                        </Button>
                    </div>
                </div>
            </Reveal>
            <Stagger className="mt-10 gap-10 max-w-7xl p-10 m-auto place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category, index) => (
                    <CategoriesCard
                        key={index}
                        name={category.name}
                        quizCount={category.quizCount}
                        slug={category.slug}
                        description={category.description}
                        tags={category.tags}
                    />
                ))}
            </Stagger>
            {filteredCategories.length === 0 && (
                <p className="px-10 pb-16 text-center text-secondary">
                    No categories match your search.
                </p>
            )}
        </div>
    );
};
