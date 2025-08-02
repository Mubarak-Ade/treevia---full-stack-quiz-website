import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
    name: 'result',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
     extraReducers: (builder) => {
        builder
    }
})


export default resultSlice.reducer