import { AtSign, Share2 } from "lucide-react";

const Footer = () => {
    return (
        <footer className='relative z-10 mt-14 rounded-t-[2rem] bg-base px-7.5 pt-15 dark:bg-card/70'>
            <div className="mx-auto grid max-w-6xl lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 mb-10 text-foreground">
                <div className="">
                    <h3 className='mb-5 text-brand text-3xl font-bold'>Treevia</h3>
                    <p className='text-secondary leading-7 max-w-xs'>Growing knowledge one leaf at a time. The world's first serenity-first trivia platform.</p>
                </div>
                <div className="">
                    <h3 className='mb-5 text-brand text-lg font-semibold'>Discover</h3>
                    <ul className='space-y-3 text-secondary'>
                        <li>Categories</li>
                        <li>Leaderboard</li>
                        <li>Plant a Quiz</li>
                    </ul>
                </div>
                <div className="">
                    <h3 className='mb-5 text-brand text-lg font-semibold'>Support</h3>
                    <ul className='space-y-3 text-secondary'>
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div className="">
                    <h3 className='mb-5 text-brand text-lg font-semibold'>Stay Connected</h3>
                    <div className="flex gap-4">
                        <button className="rounded-full bg-[#cfe2ef] p-3 text-secondary shadow-sm dark:bg-muted/70">
                            <Share2 size={16} />
                        </button>
                        <button className="rounded-full bg-[#cfe2ef] p-3 text-secondary shadow-sm dark:bg-muted/70">
                            <AtSign size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <p className='mx-auto max-w-6xl text-center pt-7.5 pb-5 border-t border-border/60 text-secondary/80 text-sm'>
                © 2024 Treevia Trivia. Growing knowledge one leaf at a time.
            </p>
        </footer>
    )
}

export default Footer
