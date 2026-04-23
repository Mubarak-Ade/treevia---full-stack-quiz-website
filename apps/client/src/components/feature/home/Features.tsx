import { motion } from 'motion/react';
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router';

// const features = [
//     {
//         icon: FaLeaf,
//         title: 'Organic Learning',
//         description:
//             "Questions that evolve with you. Our adaptive engine ensures you're always challenged at the right level.",
//     },
//     {
//         icon: GiFlowerPot,
//         title: 'Fresh Content',
//         description:
//             'New trivia seeds are planted daily across science, arts, history, and pop culture to keep things fresh.',
//     },
//     {
//         icon: FaUsers,
//         title: 'Flourish Together',
//         description:
//             'Join trivia groves with friends or compete globally. Knowledge is better shared with the community.',
//     },
// ];

const Features = () => {
    return (
        <section className="p-10">
            <div className="my-8 space-y-4 flex flex-col items-center text-center">
                <h1 className="text-secondary flex flex-col justify-center items-center dark:text-white text-2xl md:text-5xl font-extrabold">
                    Why Choose Treevia?
                    <motion.div
                        initial={{
                            scaleX: 0,
                        }}
                        animate={{
                            scaleX: 1,
                        }}
                        transition={{
                            duration: 1,
                        }}
                        className="w-[80%] h-1 mt-2 bg-primary dark:bg-primary"
                    />
                </h1>
                <p className="text-secondary text-base max-w-2xl leading-7">
                    Discover a new way to nurture your curiosity with features designed for
                    sustainable growth.
                </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:px-10 gap-10 text-left">
                <div className="rounded-4xl lg:col-start-1 lg:col-end-3 md:col-start-1 md:col-end-3  relative bg-surface overflow-hidden dark:bg-dark-neutral p-10 text-foreground shadow-[0_24px_60px_-40px_var(--shadow-sage-500)] backdrop-blur-sm">
                    <div className="absolute top-0 right-0 size-40 dark:blur-3xl blur-3xl -z-20 rounded-bl-full bg-brand" />
                    <div className={`mb-2 inline-flex rounded-2xl p-3 text-brand`}>
                        <FaLeaf size={28} />
                    </div>
                    <h3 className="text-2xl text-primary mb-4 font-semibold">
                        Organic Learning
                    </h3>
                    <p className="text-base leading-7 text-primary dark:text-tertiary">
                        Questions that evolve with you. Our adaptive engine ensures you're always
                        challenged at the right level.
                    </p>
                </div>
                <div className="rounded-4xl relative bg-surface overflow-hidden dark:bg-dark-neutral p-10 text-foreground shadow-[0_24px_60px_-40px_var(--shadow-sage-500)] backdrop-blur-sm">
                    <div className="absolute top-0 right-0 size-40 dark:blur-3xl blur-3xl -z-20 rounded-bl-full bg-brand" />
                    <div className={`mb-2 inline-flex rounded-2xl p-3 text-brand`}>
                        <FaLeaf size={28} />
                    </div>
                    <h3 className="text-2xl text-primary mb-4 font-semibold">
                        Fresh Content
                    </h3>
                    <p className="text-base leading-7 text-primary dark:text-tertiary">
                        Questions that evolve with you. Our adaptive engine ensures you're always
                        challenged at the right level.
                    </p>
                </div>
                <div className="rounded-4xl relative bg-surface overflow-hidden dark:bg-dark-neutral p-10 text-foreground shadow-[0_24px_60px_-40px_var(--shadow-sage-500)] backdrop-blur-sm">
                    <div className="absolute top-0 right-0 size-40 dark:blur-3xl blur-3xl -z-20 rounded-bl-full bg-brand" />
                    <div className={`mb-2 inline-flex rounded-2xl p-3 text-brand`}>
                        <FaLeaf size={28} />
                    </div>
                    <h3 className="text-2xl text-primary mb-4 font-semibold">
                        Flourish Together
                    </h3>
                    <p className="text-base leading-7 text-primary dark:text-tertiary">
                        Questions that evolve with you. Our adaptive engine ensures you're always
                        challenged at the right level.
                    </p>
                </div>
                <div className="rounded-4xl lg:col-start-2 lg:col-end-4 md:col-start-1 md:col-end-3 relative bg-surface overflow-hidden dark:bg-dark-neutral p-10 text-foreground shadow-[0_24px_60px_-40px_var(--shadow-sage-500)] backdrop-blur-sm">
                    <div className="absolute top-0 right-0 size-40 dark:blur-3xl blur-3xl -z-20 rounded-bl-full bg-brand" />
                    <div className={`mb-2 inline-flex rounded-2xl p-3 text-brand`}>
                        <FaLeaf size={28} />
                    </div>
                    <h3 className="text-2xl text-primary mb-4 font-semibold">
                        Knowledge Leaderboard
                    </h3>
                    <p className="text-base leading-7 text-primary dark:text-tertiary">
                        Questions that evolve with you. Our adaptive engine ensures you're always
                        challenged at the right level.
                    </p>
                </div>
            </div>
            <div className="relative mt-16 shadow-[0_0_25px] shadow-[rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] bg-cta  px-6 py-16 text-center text-white md:px-10">
                <div className="absolute right-10 top-8 hidden h-32 w-32 opacity-10 md:block">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_top,#5ea88f_0%,transparent_60%)]" />
                </div>
                <div className="mx-auto max-w-2xl">
                    <h1 className="text-4xl md:text-6xl text-primary font-extrabold leading-none">
                        Ready to challenge your intellect?
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-brand">
                        Create your account today and start tracking your growth across the Ethereal
                        Grove.
                    </p>
                    <Link to="/login">
                        <button className="mt-10 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-on-brand shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] cursor-pointer">
                            Plant Your Account
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;
