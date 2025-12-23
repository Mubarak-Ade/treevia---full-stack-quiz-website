import React from 'react';

const Input = ({type, label, value, handleChange, name}) => {
    return (
        <>
            <label htmlFor="" className=''>{label}
            </label>
                <input name={name} value={value} type={type} onChange={handleChange} className='bg-white border border-slate-400 p-2 rounded-xl w-full' />
        </>
    );
}

export default Input;
