import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchAuthEntity= createAsyncThunk('auth/fetchAuthEntity', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/auth/login/for-entity', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchAuthIndividual= createAsyncThunk('auth/fetchAuthIndividual', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/auth/login/for-individual', params)
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
      const  response  = await axios.post('/api/auth/registration/for-individual', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})


export const fetchEntityRegister = createAsyncThunk('auth/fetchEntityRegister', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/auth/registration/for-entity', params)
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

export const fetchUpdateIndividual= createAsyncThunk('auth/fetchUpdateIndividual', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('/api/auth/update-individual-profile', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchUpdateEntity= createAsyncThunk('auth/fetchUpdateEntity', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('/api/auth/update-entity-profile', params)
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
        [fetchAuthEntity.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchAuthEntity.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthEntity.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchAuthIndividual.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchAuthIndividual.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthIndividual.rejected]: (state, action) => {
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

        [fetchUpdateIndividual.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateIndividual.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateIndividual.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchEntityRegister.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchEntityRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchEntityRegister.rejected]: (state, action) => {
            
            state.status = 'error'
            state.error = action.payload
        },

        [fetchUpdateEntity.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateEntity.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateEntity.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        }
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions