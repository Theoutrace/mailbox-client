import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: {inboxMails: [], sentMails: [] , markUnRead: []},
    reducers: {
        getMails(state,action){
            state.inboxMails = action.payload
        },

        getSent(state,action){
            state.sentMails = action.payload
        },

        markReadChage(state, action){
            state.markUnRead = action.payload
        }
    }
})


export const mailActions = mailSlice.actions
export default mailSlice.reducer