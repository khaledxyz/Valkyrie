import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import guildsReducer from '../features/guilds/guildsSlice';
import friendsReducer from '../features/friends/friendsSlice';
import conversationReducer from '../features/conversation/conversationSlice';

const combinedReducer = combineReducers({
    auth: authReducer,
    friends: friendsReducer,
    conversation: conversationReducer,
    guilds: guildsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') { state = undefined; }
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer
});

export { store };
