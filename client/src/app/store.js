import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import guildsReducer from '../features/guilds/guildsSlice';
import friendsReducer from '../features/friends/friendsSlice';
import currentTabReducer from '../features/currentTab/currentTabSlice';
import conversationReducer from '../features/conversation/conversationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        guilds: guildsReducer,
        friends: friendsReducer,
        conversation: conversationReducer,
        currentTab: currentTabReducer
    }
});

export { store };
