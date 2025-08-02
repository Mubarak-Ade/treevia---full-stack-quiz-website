import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuiz } from "./quizThunk";

const API_URL = 'htt://localhost:4000/api/quiz/'

const createQuizSlice = createSlice({
    name: 'createQuiz',
    initialState: {
        quiz: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createQuiz.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createQuiz.fulfilled, (state, action) => {
            state.loading = false
            state.quiz = action.payload
            state.error = null
        })
        .addCase(createQuiz.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
       
    }
})


export default createQuizSlice.reducer