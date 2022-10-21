import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import guildsService from './guildsService';

export const getAllGuilds = createAsyncThunk('guilds/getAllGuilds', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getAllGuilds(token) }
    catch (Error) { console.log(Error) };
});

export const getGuild = createAsyncThunk('guilds/getGuild', async (guildID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getGuild(guildID, token) }
    catch (Error) { console.log(Error) };
});

export const getChannelMessages = createAsyncThunk('guilds/getChannelMessages', async (channelID, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getChannelMessages(channelID, token) }
    catch (Error) { console.log(Error) };
});

export const deleteGuild = createAsyncThunk('guilds/deleteGuild', async (guild, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.deleteGuild(guild, token) }
    catch (Error) { console.log(Error) };
});

export const createGuildMessage = createAsyncThunk('guilds/createGuildMessage', async (message, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.createGuildMessage(message, token) }
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
        currentGuild: [],
        messages: [],
        isLoading: false,
        success: false
    },
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.success = false;
        },
        updater: (state, action) => {
            state.messages = [...state.messages, action.payload];
        }
    },
    extraReducers: builder => {
        builder
            // Fetch guilds
            .addCase(getAllGuilds.pending, (state) => { state.isLoading = true })
            .addCase(getAllGuilds.fulfilled, (state, action) => { state.guilds = action.payload; state.isLoading = false })
            .addCase(getAllGuilds.rejected, (state) => { state.isLoading = false })

            // Fetch guild
            .addCase(getGuild.pending, (state) => { state.isLoading = true })
            .addCase(getGuild.fulfilled, (state, action) => {
                state.currentGuild = action.payload.guild;
                state.currentGuild.members = action.payload.members;
                state.currentGuild.channels = action.payload.channels;
                state.isLoading = false
            })
            .addCase(getGuild.rejected, (state) => { state.isLoading = false })

            // Fetch channel messages
            .addCase(getChannelMessages.pending, (state) => { state.isLoading = true })
            .addCase(getChannelMessages.fulfilled, (state, action) => { state.messages = action.payload })
            .addCase(getChannelMessages.rejected, (state) => { state.isLoading = false })

            // Create guild message
            .addCase(createGuildMessage.pending, (state) => { state.isLoading = true })
            .addCase(createGuildMessage.fulfilled, (state, action) => {
                state.messages = [...state.messages, action.payload];
                state.isLoading = false;
            })
            .addCase(createGuildMessage.rejected, (state) => { state.isLoading = false })

            // Create guild
            .addCase(createGuild.pending, (state) => { state.isLoading = true })
            .addCase(createGuild.fulfilled, (state, action) => {
                state.guilds = [...state.guilds, action.payload];
                state.isLoading = false;
                state.success = true;
            })
            .addCase(createGuild.rejected, (state) => { state.isLoading = false })

            // Create guild channel
            .addCase(createChannel.pending, (state) => { state.isLoading = true })
            .addCase(createChannel.fulfilled, (state, action) => { state.channels = [...state.channels, action.payload] })
            .addCase(createChannel.rejected, (state) => { state.isLoading = false })
    }
});

export const { reset, updater } = guildsSlice.actions;
export default guildsSlice.reducer;