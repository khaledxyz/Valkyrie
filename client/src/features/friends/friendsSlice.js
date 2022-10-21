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

            // Create friend request
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

            // Accept friend request
            .addCase(acceptFriendRequest.pending, (state) => { state.loading = true; })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.requests.comingFriendRequests = state.requests.comingFriendRequests.filter(request => request._id !== action.payload);
                state.loading = false;
            })

            // Delete friend request
            .addCase(deleteFriendRequest.pending, (state) => { state.loading = true; })
            .addCase(deleteFriendRequest.fulfilled, (state, action) => {
                state.requests.outgoingFriendRequests = state.requests.outgoingFriendRequests.filter(request => request._id !== action.payload);
                state.requests.comingFriendRequests = state.requests.comingFriendRequests.filter(request => request._id !== action.payload);
                state.loading = false;
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
export const deleteFriendRequest = createAsyncThunk('friends/deleteFriendRequest', async (FriendID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await friendsService.deleteFriendRequest(token, FriendID) }
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