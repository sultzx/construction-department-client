import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchGetAllNews = createAsyncThunk('news/fetchGetAllNews', async () => {
    const { data } = await axios.get('/api/news/all')
    return data
})

export const fetchCreateNews = createAsyncThunk('news/fetchCreateNews', async (params, {rejectWithValue}) => {
    try {
        const response = await axios.post('/api/news', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const fetchUpdateNews = createAsyncThunk('news/fetchUpdateNews', async (params, {rejectWithValue}) => {
    try {
        const response = await axios.patch('/api/news', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const fetchDeleteNews = createAsyncThunk('mews/fetchDeleteNews', async (params, {rejectWithValue}) => {
    try {
        const response = await axios.delete('/api/news', params)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }

        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    data: null,
    status: 'loading',
    error: ''
}

