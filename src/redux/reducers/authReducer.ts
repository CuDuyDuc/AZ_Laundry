import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
    role_id:string,
    fullname: string,
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
    role_id:'',
    fullname: '',

};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {state.authData = action.payload},
        removeAuth: (state, action) => {state.authData = initialState},
    }
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData; 
 