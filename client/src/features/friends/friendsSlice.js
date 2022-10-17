import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import friendsService from './friendsService';

const initialState = {
    friends: [],
    requests: {
        outgoingFriendRequests: [],
        comingFriendRequests: []
    },
    lastRequest: {},
    online: [],
    loading: false,
    success: false,
    Error: null
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        updateOnline: (state, action) => { state.online = action.payload },
        reset: (state) => {
            state.success = false;
            state.Error = false;
        }
    },
    extraReducers: builder => {
        builder
            // Fetch friends
            .addCase(fetchFriends.pending, (state) => { state.loading = true })
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
                state.loading = false;
            })

            // Fetch friend requests
            .addCase(fetchFriendRequests.pending, (state) => { state.loading = true; })
            .addCase(fetchFriendRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
                state.loading = false;
            })

            // Create friend requests
            .addCase(createFriendRequest.pending, (state) => { state.loading = true; })
            .addCase(createFriendRequest.fulfilled, (state, action) => {
                state.requests.outgoingFriendRequests = [...state.requests.outgoingFriendRequests, action.payload.friend];
                state.lastRequest = action.payload.request;
                state.loading = false;
                state.success = true;
            })
            .addCase(createFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.Error = action.payload;
            })

            // Delete friend
            .addCase(deleteFriend.pending, (state) => { state.loading = true; })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.friends = state.friends.filter(friend => friend._id !== action.payload)
                state.loading = false;
            })
    },
});

// Fetch Friends
export const fetchFriends = createAsyncThunk('friends/fetchFriends', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;
    try { return await friendsService.fetchFriends(token, UserID) }
    catch (Error) { console.log(Error) };
});

// Fetch friend requests
export const fetchFriendRequests = createAsyncThunk('friends/fetchFriendRequests', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;
    try { return await friendsService.fetchFriendRequests(token, UserID) }
    catch (Error) { console.log(Error) };
});

// Create friend request
export const createFriendRequest = createAsyncThunk('friends/createFriendRequest', async (friendFullUsername, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await friendsService.createFriendRequest(token, friendFullUsername) }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

// Accept friend request
export const acceptFriendRequest = createAsyncThunk('friends/acceptFriendRequest', async (FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await friendsService.acceptFriendRequest(token, FriendID) }
    catch (Error) { console.log(Error) };
});

// Reject friend request
export const rejectFriendRequest = createAsyncThunk('friends/rejectFriendRequest', async (FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await friendsService.rejectFriendRequest(token, FriendID) }
    catch (Error) { console.log(Error) };
});

// Cancel friend request
export const cancelFriendRequest = createAsyncThunk('friends/cancelFriendRequest', async (FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await friendsService.cancelFriendRequest(token, FriendID) }
    catch (Error) { console.log(Error) };
});

// Delete friend
export const deleteFriend = createAsyncThunk('friends/deleteFriend', async (FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const UserID = thunkAPI.getState().auth.user.details._id;
    try { return await friendsService.deleteFriend(token, UserID, FriendID) }
    catch (Error) { console.log(Error) };
});

export const { updateOnline, reset } = friendsSlice.actions;
export default friendsSlice.reducer;