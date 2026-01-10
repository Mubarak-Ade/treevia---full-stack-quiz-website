
const Footer = () => {
    return (
        <div className='border border-muted pt-15 px-7.5 '>
            <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mb-10 text-white">
                <div className="">
                    <h3 className='mb-5 text-2xl font-bold'>Treevia</h3>
                    <p>Where knowledge grows naturally. Cultivate your curiosity and let your mind flourish with engaging trivia across every branch of learning.</p>
                </div>
                <div className="">
                    <h3 className='mb-5 text-2xl font-bold'>Quick Links</h3>
                    <ul>
                        <li>Categories</li>
                        <li>Leaderboard</li>
                        <li>Plant a Quiz</li>
                        <li>Help Center</li>
                    </ul>
                </div>
                <div className="">
                    <h3 className='mb-5 text-2xl font-bold'>Connect</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>X</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>
                </div>
            </div>
            <p className='text-center pt-7.5 pb-5 border-t border-white/20 text-white/60'>2025 AIM</p>
        </div>
    )
}

export default Footer