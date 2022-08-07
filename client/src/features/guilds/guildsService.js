import axios from "axios";

const getAllGuilds = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.get("http://localhost:5000/api/guilds", config);
    if (res.data) localStorage.setItem('guilds', JSON.stringify(res.data));

    return res.data;
};

const createGuild = async (token, guildData) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.post("http://localhost:5000/api/guilds", guildData, config);

    return res.data;
};

const guildsService = { getAllGuilds, createGuild };
export default guildsService;