import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import quizReducer from '../features/quiz/quizSlice'
import uiReducer from '../features/uiSlice'
import resultReducer from '../features/result/resultSlice'
import createQuizReducer from '../features/quiz/createQuizSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        quiz: quizReducer,
        ui: uiReducer,
        createQuiz: createQuizReducer,
        result: resultReducer,
    }
})