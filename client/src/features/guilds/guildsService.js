import { axiosInstance } from '../../app/axios';

const getAllGuilds = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get('/api/guilds', config);
    if (res.data) localStorage.setItem('guilds', JSON.stringify(res.data));
    return res.data;
};

const getGuildChannels = async (guildID, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/guilds/${guildID}/channels`, config);
    return res.data;
};

const createGuild = async (token, guildData) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post('/api/guilds', guildData, config);
    return res.data;
};

const createChannel = async (token, channel) => {
    const { guildID } = channel;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post(`/api/guilds/${guildID}/channels`, channel, config);
    return res.data;
};

const guildsService = { getAllGuilds, getGuildChannels, createGuild, createChannel };
export default guildsService;
