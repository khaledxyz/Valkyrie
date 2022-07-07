import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Gets user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// Action Creator - login
export const login = createAsyncThunk('auth/login', async(user) => {
    try {return await authService.login(user)} 
    catch(Error) {console.log(Error)};
});

// Action Creator - signup
export const signup = createAsyncThunk('auth/signup', async(user) => {
    try {return await authService.signup(user)} 
    catch(Error) {console.log(Error)};
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? user : null,
        isLoading: false,
        isSuccess: false,
        error: null
    },
    reducers: {
        reset: (state) => {
            state.user = null,
            state.isLoading = false,
            state.error = null    
        }
    },
    extraReducers: builder => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.user = null
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.error.message;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.user = null
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.error.message;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;