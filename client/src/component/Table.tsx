import React from "react";

const Table = ({thead, data}) => {
    return (
         <table className=" bg-white table-auto rounded-xl w-full">
                    <thead className="border-b border-slate-300 bg-teal-600 text-white">
                        <tr className="text-start">
                            <th className="px-6 py-3 text-start">Questions</th>
                            <th className="px-6 py-3 text-start">Options</th>
                            <th className="px-6 py-3 text-start">Answers</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y rounded-xl divide-slate-300">
                        {questions &&
                            questions.map((quest, index) => (
                                <tr className="" key={quest._id}>
                                    <td className="px-6 py-3">
                                        {quest.question}
                                    </td>
                                    <td className="px-6 py-3 flex">
                                        {Object.entries(quest.options)
                                            .slice(0, 1)
                                            .map(([key, value]) => (
                                                <div className="">
                                                    <p key={key}>{value}</p>
                                                </div>
                                            ))}
                                        <span>...</span>
                                    </td>
                                    <td className="px-6 py-3">
                                        {quest.correctAnswer}
                                    </td>
                                    {/* <td><Menu quest={quest} /></td> */}
                                </tr>
                            ))}
                    </tbody>
                </table>
    );
};

export default Table;
