import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/login', params)
    return data
})

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const { data } = await axios.post('/registration', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/me')
    return data
})


const initialState = {
    data: null, 
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = 'loading' 
            state.data = null
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded' 
            state.data = action.payload
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error' 
            state.data = null
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading' 
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded' 
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error' 
            state.data = null
        },
        [fetchRegistration.pending]: (state) => {
            state.status = 'loading' 
            state.data = null
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = 'loaded' 
            state.data = action.payload
        },
        [fetchRegistration.rejected]: (state) => {
            state.status = 'error' 
            state.data = null
        },
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReduser = authSlice.reducer

export const { logout } = authSlice.actions