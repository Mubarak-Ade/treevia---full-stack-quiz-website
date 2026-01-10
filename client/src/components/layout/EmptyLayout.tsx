import { Recommendation } from '@/pages/Recommendation'
import { Outlet } from 'react-router'

export const EmptyLayout = () => {
    return (
        <>
            <main className='max-w-5xl w-full m-auto'>
                <Outlet />
                <hr className='m-5 border-muted' />
                <Recommendation />
            </main>
        </>
    )
}
