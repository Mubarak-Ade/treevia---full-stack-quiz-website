import { QuizCard } from '@/components/feature/quizlist/QuizCard'
import { QuizLoader } from '@/components/feature/QuizLoader'
import { useFetchCategories, useFetchRandomQuiz } from '@/features/quiz/hooks'
import { Link } from 'react-router'

export const Recommendation = () => {

	const {data: category, isLoading}  = useFetchCategories()
	const quiz  = useFetchRandomQuiz()

	if (isLoading || quiz.isLoading) {
		return <QuizLoader loading />
	}

	return (
		<div className='flex flex-col items-center p-5 justify-center'>
			<h4 className='uppercase text-secondary/50 text-sm font-bold'>Popular Categories to get you started</h4>

			<ul className="flex items-center gap-4 mt-4">
				{category?.slice(0,5).map((cat) => (
					<li key={cat._id} className='bg-card px-4 py-2 rounded-full text-white text-xs font-bold'>{cat.name}</li>
				))}
			</ul>

			<div className="mt-5 p-5">
				<div className="mb-5 flex justify-between">
					<div className="">
						<h2 className='text-xl font-bold text-white'>Recommended For Your First Game</h2>
						<p className='text-sm mt-1 text-secondary'>Join Thousands of others playing this quiz right now</p>
					</div>
					<Link className='text-custom' to="">View all quizzes</Link>
				</div>
				<ul className='grid grid-cols-3 gap-10'>
					{quiz.data.map((q) => (
						<QuizCard updatedAt={q.updatedAt} title={q.title} key={q._id} _id={q._id} difficulty={q.difficulty} questionCount={q.questionCount} timeLimit={q.timeLimit} />
					))}
				</ul>
			</div>
		</div>
	)
}
