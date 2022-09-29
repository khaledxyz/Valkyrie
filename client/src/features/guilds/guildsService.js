import { axiosInstance } from '../../app/axios';
import { emitGuildMessage } from '../../socket/socket';

const getAllGuilds = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get('/api/guilds', config);
    if (res.data) localStorage.setItem('guilds', JSON.stringify(res.data));
    return res.data;
};

const getGuild = async (guildID, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/guilds/${guildID}`, config);
    if (res.data) localStorage.setItem('guilds', JSON.stringify(res.data));
    return res.data;
};

const getChannelMessages = async (channelID, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/messages/guild-messages/${channelID}`, config);
    return res.data;
};

const createGuildMessage = async (message, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post(`/api/messages/guild-messages`, message, config);
    if (res.data) emitGuildMessage(res.data);
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

const guildsService = { getAllGuilds, getGuild, getChannelMessages, createGuildMessage, createGuild, createChannel };
export default guildsService;
