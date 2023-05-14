import axios  from "../../axios.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// создаётся якобы редюсер
//createAsyncThunk асинхронный экшн

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data
})

const initialState = {
    posts: {
        items: [], 
        status: 'loading'
    }, 
    tags: {
        items: [], 
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reduser: {}, 
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [] 
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [] 
            state.posts.status = 'error'
        },
    }
})

export const postsReduser = postsSlice.reducer