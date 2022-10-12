import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import friendsReducer from '../features/friends/friendsSlice';
import conversationReducer from '../features/conversation/conversationSlice';
import guildsReducer from '../features/guilds/guildsSlice';
import invitesReducer from '../features/invites/invitesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends: friendsReducer,
        conversation: conversationReducer,
        guilds: guildsReducer,
        invites: invitesReducer,
    }
});