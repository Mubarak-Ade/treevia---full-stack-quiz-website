// Path: client\src\component\dashboard\createQuiz\CreateQuestions.jsx
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../../features/quiz/quizThunk";
import { useNavigate, useParams } from "react-router";

function CreateQuestions ()
{
    const [ question, setQuestion ] = useState( "" );
    const [ options, setOptions ] = useState( [ "", "", "", "" ] );
    const [ correctAnswer, setCorrectAnswer ] = useState( "" );
    const questionData = {
        questionText: question,
        options,
        correctAnswer
    };
    const [ questions, setQuestions ] = useState(  questionData )

    const { id } = useParams();
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleOptionsChange = ( index, value ) =>
    {
        const update = [ ...options ];
        update[ index ] = value;
        setOptions( update );
    };
    console.log( id );

    const handleAddMultipleQuestions = () =>
    {
        // const questions = [questionData]
        setQuestion( "" )
        setCorrectAnswer( "" )
        setOptions( prev => prev.map( ( p ) => p === "" ) )
        setQuestions([...questions, questionData])
    }


    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        if (question !== "" && options.every(opt => opt !== "") && correctAnswer !== "") {
            dispatch( createQuestion( { quizId: id, questionData } ) );
            navigate("/admin/quizzes")
        } else {
            alert("all form must be fill")
        }
        console.log( questions );
        setQuestion( "" )
        setCorrectAnswer( "" )
        setOptions( prev => prev.map( ( p ) => p === "" ) )
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-treevia-text font-poppins font-bold text-4xl mb-4">Add Question</h1>
            <div className="h-50 min-w-2xl px-4 font-poppins text-treevia-black bg-white mb-4 rounded-xl">
                <p className="m-2 text-xl font-ubuntu capitalize w-full">{ question }</p>
                <ol type="i" className="list-[upper-alpha] px-4 gap-0 flex flex-col items-start">
                    { options.map( ( opt, index ) => (
                        <li className="m-2">{ opt }</li>
                    ) ) }
                </ol>
            </div>
            <form onSubmit={ handleSubmit } className="w-2xl">
                <label className="p-1 font-medium text-lg">
                    Question
                </label> <br />
                <input
                    value={ question }
                    type="text"
                    onChange={ ( e ) => setQuestion( e.target.value ) }
                    className="bg-white w-full px-4 py-2 rounded-xl border border-slate-400"
                    placeholder="Enter question text" />
                <label htmlFor="" className="p-1 font-medium text-lg">Options</label>
                <ul className="p-2 grid grid-cols-2 gap-2">
                    { options.map( ( opt, index ) => (
                        <input
                            value={ opt }
                            key={ index }
                            type="text"
                            name=""
                            onChange={ ( e ) => handleOptionsChange( index, e.target.value ) }
                            className="bg-white px-4 w-full py-2 rounded-xl border border-slate-400" />
                    ) ) }
                </ul>
                <label className="p-2 flex flex-col font-poppins">
                    Correct Answer
                </label>
                <select onChange={ ( e ) => setCorrectAnswer( e.target.value ) } value={ correctAnswer } name="correct-answer" className="bg-white px-4 w-full py-2 rounded-xl border border-slate-400">
                    <option value="">Select Category</option>
                    { options.map( ( opt, index ) => (
                        <option key={ index } value={ opt }>{ opt }</option>
                    ) ) }
                </select>
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={handleAddMultipleQuestions} className="py-2 px-6 text-white bg-treevia-primary flex items-center gap-2 rounded-xl"><FaPlus /> Add Another Question</button>
                    <button type="submit" className="py-2 px-6 bg-treevia-accent font-medium border rounded-xl text-treevia-primary">Save All Questions</button>
                </div>
            </form>
        </div>
    );
}

export default CreateQuestions;
