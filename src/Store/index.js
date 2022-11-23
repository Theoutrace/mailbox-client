import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth'
import mailReducer from './mail/mail'



const store = configureStore({
    reducer: {
        auth: authReducer,
        mail: mailReducer
    }
})

export default store