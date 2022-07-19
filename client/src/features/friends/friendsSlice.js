import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import friendsService from './friendsService';

export const getAllFriends = createAsyncThunk('friends/getAllFriends', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const USERID = thunkAPI.getState().auth.user.details.id;

    try {return await friendsService.getAllFriends(token, USERID)} 
    catch(Error) {console.log(Error)};
});

export const sendFriendRequest = createAsyncThunk('friends/sendFriendRequest', async(_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const USERID = thunkAPI.getState().auth.user.details.id;

    try {return await friendsService.sendFriendRequest(token, USERID)} 
    catch(Error) {console.log(Error)};
});

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: [],
        isLoading: false,
    },
    extraReducers: builder => {
        builder
            .addCase(getAllFriends.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
                state.isLoading = false
            })
            .addCase(getAllFriends.rejected, (state) => {
                state.isLoading = false
            });
    },
});

// export const { reset } = friendsSlice.actions;
export default friendsSlice.reducer;