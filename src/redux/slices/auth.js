import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchAuth= createAsyncThunk('auth/fetchAuth', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/auth/login', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/auth/registration', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})

export const fetchAuthMe= createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/auth/me')
    return data
})

export const fetchUpdateMe= createAsyncThunk('auth/fetchUpdateMe', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('/api/auth/update-profile', params)
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
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

        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchRegister.rejected]: (state, action) => {
            
            state.status = 'error'
            state.error = action.payload
        },

        [fetchUpdateMe.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateMe.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        }
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions