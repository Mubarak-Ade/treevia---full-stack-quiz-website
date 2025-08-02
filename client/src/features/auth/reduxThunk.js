import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import api from "../../utils/axios";

const API_URL = 'http://localhost:4000/api/user'

export const loginUser = createAsyncThunk('auth/login', 
    async (userData, thunkAPI) => {
        const { email, password } = userData
    try {
        const res = await axios.post(`${API_URL}/login`, userData)
        const {username, email, role, isOnline} = res.data
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify({username,email, role}))
        console.log({username,email,role})
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const registerUser = createAsyncThunk('auth/register', 
    async (userData, thunkAPI) => {
        const { username, email, password } = userData
    try {
        const res = await axios.post(`${API_URL}/register`, userData)
        const {username, email, role} = res.data
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify({username,email,role}))
        console.log({username,email,role})
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const getUsers = createAsyncThunk('user/getUsers', 
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:4000/api/user/")
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const getAllQuiz = createAsyncThunk('quiz/getQuizzes', 
    async (_, thunkApi) => {
        try {
            const res = await api.get('http://localhost:4000/api/quiz/')
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getQuizById = createAsyncThunk('quiz/getQuizById', 
    async (quizId, thunkApi) => {
        try {
            const res = await api.get(`http://localhost:4000/api/quiz/${quizId}`)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
) 

export const getAllQuestions = createAsyncThunk("quiz/getAllQuestions", 
    async (_,thunkApi) => {
        try {
            const res = await api.get('http://localhost:4000/api/quiz/questions')
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

