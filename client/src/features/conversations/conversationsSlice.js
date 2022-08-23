import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import conversationsService from './conversationsService';

export const getConversation = createAsyncThunk(
    'conversations/getConversation',
    async (ReceiverID, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await conversationsService.getConversation(
                token,
                ReceiverID
            );
        } catch (Error) {
            console.log(Error);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'conversations/sendMessage',
    async (ReceiverID, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        try {
            return await conversationsService.sendMessage(token, ReceiverID);
        } catch (Error) {
            console.log(Error);
        }
    }
);

const conversationsSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        currentConversation: null,
        updater: null
    },
    reducers: {
        reset: (state) => {
            state.conversations = [];
            state.currentConversation = null;
        },
        updateMessagesHistory: (state, action) => {
            state.updater = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getConversation.fulfilled, (state, action) => {
            state.currentConversation = action.payload;
        });
    }
});

export const { reset, updateMessagesHistory } = conversationsSlice.actions;
export default conversationsSlice.reducer;
