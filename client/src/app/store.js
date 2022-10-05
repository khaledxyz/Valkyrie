import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import guildsReducer from '../features/guilds/guildsSlice';
import friendsReducer from '../features/friends/friendsSlice';
import conversationReducer from '../features/conversation/conversationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends: friendsReducer,
        conversation: conversationReducer,
        guilds: guildsReducer,
    }
});