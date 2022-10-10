import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../app/axios';

// Gets user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// Action Creator - login
export const login = createAsyncThunk('auth/login', async (user) => {
    try {
        const res = await axiosInstance.post('/api/auth', user);
        if (res.data) localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    }
    catch (Error) { console.log(Error) };
});

// Action Creator - signup
export const signup = createAsyncThunk('auth/signup', async (user) => {
    try {
        const res = await axiosInstance.post('/api/users', user);
        if (res.data) return res.data;
    }
    catch (Error) { console.log(Error) };
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: user ? user : null,
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        resetAuth: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        logout: () => {
        }
    },
    extraReducers: builder => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.success = true;
            })
            .addCase(login.rejected, (state) => {
                state.user = null
                state.loading = false;
                state.success = false;
                state.error = true;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.success = true;
            })
            .addCase(signup.rejected, (state) => {
                state.user = null;
                state.loading = false;
                state.success = false;
                state.error = true;
            })
    }
});

export const { resetAuth, logout } = authSlice.actions;
export default authSlice.reducer;