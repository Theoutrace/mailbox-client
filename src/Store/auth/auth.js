import { createSlice } from "@reduxjs/toolkit";



const initialAuthState = {login: false, idToken: null, email:null, offline: true}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            state.login = true
            state.idToken = action.payload.idToken
            state.email = action.payload.email
            state.offline = false
        },

        logout(state){
            state.login = false
            state.idToken = null
            state.email = null
            state.offline = true
        },

        offline(state){
            state.offline = true
        },

        online(state){
            state.offline = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer