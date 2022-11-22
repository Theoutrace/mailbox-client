import { createSlice } from "@reduxjs/toolkit";



const email = localStorage.getItem('email')
const authToken = localStorage.getItem('token')

const initialAuthState = {login: email? true: false, idToken: authToken? authToken: null, email: email? email: null}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.login = true
            state.idToken = action.payload.idToken
            state.email = action.payload.email
        },

        logout(state){
            state.login = false
            state.idToken = null
            state.email = null
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer