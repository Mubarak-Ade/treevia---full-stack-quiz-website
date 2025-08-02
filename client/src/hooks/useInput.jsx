import React, { useState } from "react";

const useInput = (initialState) => {
    const [value, setValue] = useState(initialState);

    const handleChange = (e) => {
        const {type, checked, value} = e.target;
        setValue(type === 'checkbox' ? checked : value)
    }
    
    const reset = () => {
        setValue(initialState)
    }

    return [value, handleChange, reset];
};

export default useInput;
