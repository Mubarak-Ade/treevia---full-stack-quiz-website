import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../auth/reduxThunk";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        users: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default userSlice.reducer