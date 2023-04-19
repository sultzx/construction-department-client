import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.js'
import { newsReducer } from './slices/news.js'
import { projectReducer } from './slices/project.js'
import { monitoringReducer } from './slices/monitoring.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
        project: projectReducer,
        monitoring: monitoringReducer
    }
})

export default store