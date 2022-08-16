import axios from "axios";

const getConversation = async (token, ReceiverID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.get(`http://localhost:5000/api/messages/user-messages/${ReceiverID}`, config);
    return res.data;
};

const sendMessage = async (token, message) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.post(`http://localhost:5000/api/messages/user-messages`, message, config);
    return res.data;
};

const conversationService = { getConversation, sendMessage };
export default conversationService;