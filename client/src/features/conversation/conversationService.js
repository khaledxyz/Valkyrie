import { axiosInstance } from '../../app/axios';
import { emitPrivateMessage } from '../../context/socket';

const getConversation = async (token, ReceiverID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axiosInstance.get(
        `/api/messages/user-messages/${ReceiverID}`,
        config
    );
    if (res.data) localStorage.setItem('messages', JSON.stringify(res.data));
    return res.data;
};

const sendMessage = async (token, message) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axiosInstance.post(
        `/api/messages/user-messages`,
        message,
        config
    );

    if (res.data) emitPrivateMessage(message.room, res.data);
    return res.data;
};

const conversationService = { getConversation, sendMessage };
export default conversationService;
