import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import conversationService from './conversationService';

export const getConversation = createAsyncThunk(
    'conversation/getConversation',
    async (ReceiverID, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try { return await conversationService.getConversation(token, ReceiverID) }
        catch (Error) { console.log(Error) };
    }
);

export const sendMessage = createAsyncThunk(
    'conversation/sendMessage',
    async (ReceiverID, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try { return await conversationService.sendMessage(token, ReceiverID) }
        catch (Error) { console.log(Error) };
    }
);

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        messages: null,
        receiver: null,
        isLoading: false,
    },
    reducers: {
        reset: (state) => {
            state.messages = null;
            state.receiver = null;
            state.isLoading = false;
        },
        updater: (state, action) => {
            state.messages = [...state.messages, action.payload];
        }
    },

    extraReducers: (builder) => {
        // Get conversation
        builder.addCase(getConversation.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getConversation.fulfilled, (state, action) => {
            state.messages = action.payload.messages;
            state.receiver = action.payload.receiver;
            state.isLoading = false;
        });

        builder.addCase(getConversation.rejected, (state) => {
            state.messages = [];
            state.receiver = [];
            state.isLoading = false;
        });

        // Send message
        builder.addCase(sendMessage.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.messages = [...state.messages, action.payload];
            state.lastMessage = action.payload;
            state.isLoading = false;
        });

        builder.addCase(sendMessage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const { reset, updater } = conversationSlice.actions;
export default conversationSlice.reducer;
