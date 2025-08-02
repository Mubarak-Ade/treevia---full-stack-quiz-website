import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modal: null
    },
    reducers: {
        show: (state, action) => {
            state.modal = true
        },
        hide: (state, action) => {
            state.modal = null
        }
    }
})

export const {show, hide} = uiSlice.actions
export default uiSlice.reducer