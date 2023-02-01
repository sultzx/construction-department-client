import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.js'
import { newsReducer } from './slices/news.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer
    }
})

export default store