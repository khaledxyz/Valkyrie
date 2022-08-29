import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import guildsReducer from '../features/guilds/guildsSlice';
import friendsReducer from '../features/friends/friendsSlice';
import conversationReducer from '../features/conversation/conversationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        guilds: guildsReducer,
        friends: friendsReducer,
        conversation: conversationReducer,
    }
});

export { store };
