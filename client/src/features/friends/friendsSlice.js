import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import friendsService from './friendsService';

export const getAllFriends = createAsyncThunk('friends/getAllFriends', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;

    try {return await friendsService.getAllFriends(token, UserID)} 
    catch(Error) {console.log(Error)};
});

export const getAllfriendRequests = createAsyncThunk('friends/getAllfriendRequests', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;

    try {return await friendsService.getAllfriendRequests(token, UserID)} 
    catch(Error) {console.log(Error)};
});

export const sendFriendRequest = createAsyncThunk('friends/sendFriendRequest', async(friendFullUsername, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;

    try {return await friendsService.sendFriendRequest(token, UserID, friendFullUsername)} 
    catch(Error) {console.log(Error)};
});

export const acceptFriendRequest = createAsyncThunk('friends/acceptFriendRequest', async(FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;

    try {return await friendsService.acceptFriendRequest(token, UserID, FriendID)} 
    catch(Error) {console.log(Error)};
});

export const rejectFriendRequest = createAsyncThunk('friends/rejectFriendRequest', async(FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;

    try {return await friendsService.rejectFriendRequest(token, UserID, FriendID)} 
    catch(Error) {console.log(Error)};
});

const initialState = {
    friends: [],
    friendRequests: [],
    isLoading: false,
    isSuccess: false,
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    extraReducers: builder => {
        builder
            // Get all Friends
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

            // Get all Friend requests
            .addCase(getAllfriendRequests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllfriendRequests.fulfilled, (state, action) => {
                state.friendRequests = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllfriendRequests.rejected, (state) => {
                state.isLoading = false;
            })
            
            // Send a Friend request
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