import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import guildsReducer from '../features/guilds/guildsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        guilds: guildsReducer,
    }
});

export { store };