import { Recommendation } from '@/pages/Recommendation'
import { AnimatedOutlet } from '../feature/Motion'

export const EmptyLayout = () => {
    return (
        <>
            <main className='max-w-5xl w-full m-auto px-4 md:px-6'>
                <AnimatedOutlet />
                <hr className='m-5 border-border/70' />
                <Recommendation />
            </main>
        </>
    )
}
