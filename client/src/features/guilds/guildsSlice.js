import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import guildsService from './guildsService';

export const getAllGuilds = createAsyncThunk('guilds/getAllGuilds', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getAllGuilds(token) }
    catch (Error) { console.log(Error) };
});

export const getGuildChannels = createAsyncThunk('guilds/getGuildChannels', async (guildID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getGuildChannels(guildID, token) }
    catch (Error) { console.log(Error) };
});

export const createGuild = createAsyncThunk('guilds/createGuild', async (guildData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.createGuild(token, guildData) }
    catch (Error) { console.log(Error) };
});

export const createChannel = createAsyncThunk('guilds/createChannel', async (channel, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.createChannel(token, channel) }
    catch (Error) { console.log(Error) };
});

const guildsSlice = createSlice({
    name: 'guilds',
    initialState: {
        guilds: [],
        channels: [],
        isLoading: false,
    },
    reducers: {
        reset: (state) => {
            state.guilds = [];
            state.isLoading = false;
        }
    },
    extraReducers: builder => {
        builder
            // Fetch guilds
            .addCase(getAllGuilds.pending, (state) => { state.isLoading = true })
            .addCase(getAllGuilds.fulfilled, (state, action) => { state.guilds = action.payload; state.isLoading = false })
            .addCase(getAllGuilds.rejected, (state) => { state.isLoading = false })

            // Create guild
            .addCase(createGuild.pending, (state) => { state.isLoading = true })
            .addCase(createGuild.fulfilled, (state, action) => { state.guilds = [...state.guilds, action.payload] })
            .addCase(createGuild.rejected, (state) => { state.isLoading = false })

            // Fetch guild channels
            .addCase(getGuildChannels.pending, (state) => { state.isLoading = true })
            .addCase(getGuildChannels.fulfilled, (state, action) => { state.channels = action.payload })
            .addCase(getGuildChannels.rejected, (state) => { state.isLoading = false })

            // Create guild channel
            .addCase(createChannel.pending, (state) => { state.isLoading = true })
            .addCase(createChannel.fulfilled, (state, action) => { state.channels = [...state.channels, action.payload] })
            .addCase(createChannel.rejected, (state) => { state.isLoading = false })

    }
});

export const { reset } = guildsSlice.actions;
export default guildsSlice.reducer;