import { createAction, createSlice } from "@reduxjs/toolkit";
import { getAllQuiz, getUsers, loginUser, registerUser } from "./reduxThunk";

const token = localStorage.getItem("token")
const user = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        users: [],
        user: user || null,
        token: token || null,
        loading: false,
        error: null,
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload
            state.user = action.payload
        },
        logOut: (state, action) => {
            state.token = null
            state.user = null
            localStorage.clear()
        }
    },
     extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.token = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(registerUser.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(getUsers.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setUser, logOut} = authSlice.actions
export default authSlice.reducer