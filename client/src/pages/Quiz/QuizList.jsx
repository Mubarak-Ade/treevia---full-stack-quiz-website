//start from scratch
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getQuizById } from '../../features/auth/reduxThunk';
import { useParams } from 'react-router';
import BreadCrumbs from '../../component/BreadCrumbs'
import { FaClock, FaQuestion } from 'react-icons/fa6';

const QuizList = () =>
{
	const { id } = useParams()
	const { currentQuiz, loading, error } = useSelector( ( state ) => state.quiz )
	const dispatch = useDispatch()
	useEffect( () =>
	{
		dispatch( getQuizById( id ) )
	}, [] )

	const { title, category, difficulty, timeLimit, description, tags, questions } = currentQuiz || {}

	console.log( currentQuiz );

	return (
		<div className="min-h-screen p-4 text-treevia-primary bg-treevia-light">
			<BreadCrumbs />
			<h1 className='text-5xl mb-4 font-bold font-ubuntu'>{ category }</h1>
			<div className="bg-treevia-card w-3xl p-4 rounded-2xl">
				<div className="grid font-abeezee text-treevia-light grid-cols-[120px_1fr]">
					<FaQuestion className='bg-treevia-primary text-treevia-light p-2 row-span-2 text-8xl rounded-full' />
					<h2 className='text-4xl font-ubuntu col-start-2 capitalize'>{ title }</h2>
					<p className="text-lg col-start-2">{ description }</p>
					<button className='bg-treevia-primary text-white w-30 px-4 py-2 col-start-3 rounded-xl'>Start Quiz</button>
				</div>
				<div className="flex text-treevia-light pt-4 gap-4">
					<p className="flex gap-2 items-center"><FaClock /> { questions && questions.length } Questions</p>
					<p className="flex gap-2 items-center"><FaClock /> { timeLimit } min</p>
				</div>
			</div>
			<div className="p-4">
				<h2 className="text-3xl font-ubuntu">Questions</h2>
				<div className="p-4 ml-6 grid grid-cols-2 gap-4">
					{questions && questions.map( ( question, index ) => (
						<div className="font-bold text-treevia-primary flex gap-4 text-xl border border-treevia-primary p-2 rounded-xl">
							<span>{ index + 1 }.</span>
							<ol className='list-[upper-alpha]'>
								<h1 className="">{ question.questionText }</h1>
								{ question.options.map( ( opt, index ) => (
									<li className="font-normal ml-10">{ opt }</li>
								) ) }
							</ol>
						</div>
					) ) }
				</div>
			</div>
		</div>
	)
}

export default QuizList