import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invitesService from './invitesService';

const invitesSlice = createSlice({
    name: 'invites',
    initialState: {
        loading: false,
        success: false,
        Error: null
    },
    reducers: {
        resetInvites: (state) => {
            state.loading = false;
            state.success = false;
            state.Error = null;
        }
    },
    extraReducers: builder => {
        builder
            // Create invite 
            .addCase(createInvite.pending, (state) => {
                state.loading = true
            })
            .addCase(createInvite.fulfilled, (state) => {
                state.loading = false;
                state.success = true
            })
            .addCase(createInvite.rejected, (state, action) => {
                state.loading = false;
                state.Error = action.payload;
            })

            // Accept invite 
            .addCase(acceptInvite.pending, (state) => {
                state.loading = true
            })
            .addCase(acceptInvite.fulfilled, (state) => {
                state.loading = false;
                state.success = true
            })
            .addCase(acceptInvite.rejected, (state, action) => {
                state.loading = false;
                state.Error = action.payload;
            })
    }
});

export const createInvite = createAsyncThunk('invites/createInvite', async (invite, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await invitesService.createInvite(token, invite) }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

export const acceptInvite = createAsyncThunk('invites/acceptInvite', async (invite, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await invitesService.acceptInvite(token, invite) }
    catch (Error) {
        const message = (Error.response.data);
        return thunkAPI.rejectWithValue(message);
    };
});

export const { resetInvites } = invitesSlice.actions;
export default invitesSlice.reducer;