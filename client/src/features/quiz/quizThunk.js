import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/axios";

const API_URL = '/quiz'


export const createQuiz = createAsyncThunk("quiz/createQuiz", 
    async (quizData, thunkApi) => {
        try {
            const res = await api.post(`${API_URL}/quizzes`, quizData)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
});

export const createQuestion = createAsyncThunk("quiz/createQuestion", 
    async ({quizId, questionData}, thunkApi) => {
        try {
            console.log(questionData)
            const res = await api.post(`${API_URL}/quizzes/${quizId}/questions`, questionData)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
});

export const deleteQuiz = createAsyncThunk('quiz/deleteQuiz', 
    async (quizId, thunkApi) => {
        try {
            const res = await api.delete(`${API_URL}/${quizId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const deleteQuestion = createAsyncThunk('quiz/deleteQuestion', 
    async (questionId, thunkApi) => {
        try {
            const res = await api.delete(`${API_URL}/question/${questionId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getSingleQuiz = createAsyncThunk('quiz/getSingleQuiz', 
    async (quizId, thunkApi) => {
        try {
            const res = await api.get(`${API_URL}/${quizId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
) 

export const getSingleQuestion = createAsyncThunk('quiz/getSingleQuestion', 
    async (quizId, questionId, thunkApi) => {
        try {
            const res = await api.get(`${API_URL}/${quizId}/questions/${questionId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
) 

export const editQuestion = createAsyncThunk('quiz/editQuestion', 
    async (quizId, questionId, thunkApi) => {
        try {
            const res = await api.get(`${API_URL}/${quizId}/questions/${questionId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
) 