import Features from '@/components/feature/home/Features';
import Hero from '@/components/feature/home/Hero';
import Stat from '@/components/feature/home/Stat';
import { BookOpenText, Leaf, Users } from 'lucide-react';

const Home = () => {
    return (
        <div className="w-full gap-8 relative bg-cover">
            <Hero />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 items-center place-items-center w-full justify-center p-10">
                <Stat title="Active Thinkers" numbers={50} suffix="K+" Icon={Users} tone="mint" />
                <Stat
                    title="Leafy Categories"
                    numbers={120}
                    suffix="+"
                    Icon={Leaf}
                    tone="lavender"
                />
                <Stat
                    title="Fresh Questions"
                    numbers={12}
                    suffix="M+"
                    Icon={BookOpenText}
                    tone="sun"
                />
                <Stat
                    title="User Ratings"
                    numbers={4.9}
                    suffix="/5"
                    Icon={BookOpenText}
                    tone="sun"
                />
            </div>
            <Features />
        </div>
    );
};

export default Home;
