import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import friendsService from './friendsService';

export const getAllFriends = createAsyncThunk('friends/getAllFriends', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const USERID = thunkAPI.getState().auth.user.details.id;

    try {return await friendsService.getAllFriends(token, USERID)} 
    catch(Error) {console.log(Error)};
});

export const sendFriendRequest = createAsyncThunk('friends/sendFriendRequest', async(friendFullUsername, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const USERID = thunkAPI.getState().auth.user.details.id;

    try {return await friendsService.sendFriendRequest(token, USERID, friendFullUsername)} 
    catch(Error) {console.log(Error)};
});

const initialState = {
    friends: [],
    isLoading: false,
    isSuccess: false,
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        reset: (state) => {
            state.friends = [];
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllFriends.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllFriends.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(sendFriendRequest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(sendFriendRequest.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
            })
    },
});

export const { reset } = friendsSlice.actions;
export default friendsSlice.reducer;