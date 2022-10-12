import { axiosInstance } from '../../app/axios';

const createInvite = async (token, invite) => {
    const { guildID } = invite;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post(`/api/guilds/${guildID}/invite`, invite, config);
    return res.data;
};

const acceptInvite = async (token, invite) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.put(`/api/guilds/${invite}/join`, config);
    return res.data;
};

const invitesService = { createInvite, acceptInvite };
export default invitesService;
