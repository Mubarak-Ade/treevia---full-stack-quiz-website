import Stat from '@/component/home/Stat'
import { CircleQuestionMark, Pyramid, User } from 'lucide-react'
import Features from '../component/home/Features'
import Hero from '../component/home/Hero'

const Home = () =>
{
    return (
        <div className={ `w-full gap-4 bg-linear-135 from-custom-100 from-0% via-50% to-100% via-custom-200 to-custom-300 relative bg-cover` }>
            <Hero />
            <div className="flex lg:flex-row flex-col gap-10 items-center justify-center bg-card/50 p-10 border border-muted">
				<Stat title='Active User' numbers={50000} Icon={User} />
				<Stat title='Quiz Category' numbers={5000} Icon={Pyramid} />
				<Stat title='Questions' numbers={25000} Icon={CircleQuestionMark} />
				{/* <Stat title='Accurate' numbers='99%' /> */}
			</div>
            <Features />
            {/* <Footer /> */}
        </div>
    )
}

export default Home
