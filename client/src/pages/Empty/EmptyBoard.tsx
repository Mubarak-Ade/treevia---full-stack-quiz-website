import { Locate, PlayCircle } from 'lucide-react'
import { AiFillTrophy } from 'react-icons/ai'

export const EmptyBoard = () => {
	return (
	<div className='p-5 font-alata'>
			<div className="flex items-center flex-col justify-center">
				<div className='bg-card p-4 rounded-full border border-yellow-500 shadow-[0_0_45px_0] shadow-yellow-500/10'>
					<AiFillTrophy className='border rounded-full p-5' color='var(--color-yellow-500)' size={120} />
				</div>
				<h1 className='text-5xl font-bold text-white'>The Leaderboard Is <span className='text-yellow-500'>Empty</span></h1>
				<div className="text-secondary text-sm font-light font-poppins mt-2 p-2 text-center">
					<p>It looks like no scores have been recorded yet. This is your chance to make history!</p>
					<p>Start playing now to earn points and claim the very first spot on the leaderboard</p>
				</div>
				<div className="flex gap-4 mt-2">
					<button className='flex bg-custom px-4 rounded-full gap-2 items-center py-2.5 border border-card'><PlayCircle /> Start your First Quiz</button>
					<button className='bg-secondary/20 flex rounded-full gap-2 items-center px-6 py-2.5 text-white border border-white'><Locate />Explore Quiz</button>
				</div>
			</div>
		</div>
	)
}
