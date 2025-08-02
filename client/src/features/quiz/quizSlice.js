import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllQuestions, getAllQuiz, getQuizById } from "../auth/reduxThunk";
import { createQuestion, createQuiz, deleteQuiz, editQuestion, getSingleQuiz } from "./quizThunk";

const API_URL = 'htt://localhost:4000/api/quiz/'

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        quizzes: [],
        currentQuiz: null,
        questions: [],
        loading: false,
        selectedQuiz: null,
        openFor: null,
        error: null,
    },
    reducers: {
        openMenu: (state, action) => {
            state.openFor = action.payload
        },
        closeMenu: (state, action) => {
            state.openFor = null
        },
        setSelectedQuiz: (state, action) => {
            state.selectedQuiz = action.payload
        },
        clearSelectedQuiz: (state, action) => {
            state.selectedQuiz = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllQuiz.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllQuiz.fulfilled, (state, action) => {
                state.loading = false
                state.quizzes = action.payload
            })
            .addCase(getAllQuiz.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getQuizById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getQuizById.fulfilled, (state, action) => {
                state.loading = false
                state.currentQuiz = action.payload
            })
            .addCase(getQuizById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getAllQuestions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllQuestions.fulfilled, (state, action) => {
                state.loading = false
                state.questions = action.payload
            })
            .addCase(getAllQuestions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(editQuestion.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(editQuestion.fulfilled, (state, action) => {
                state.loading = false
                state.questions = action.payload
            })
            .addCase(editQuestion.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createQuiz.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.loading = false
                state.quizzes = action.payload
                state.error = null
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(createQuestion.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.loading = false
                state.questions = action.payload
                state.error = null
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})


export default quizSlice.reducer
export const { openMenu, closeMenu, setSelectedQuiz, clearSelectedQuiz } = quizSlice.actions