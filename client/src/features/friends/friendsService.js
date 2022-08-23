import { axiosInstance } from '../../app/axios';

const getUserFriends = async (token, UserID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axiosInstance.get(`/api/users/${UserID}/friends`, config);
    if (res.data) localStorage.setItem('userFriends', JSON.stringify(res.data));

    return res.data;
};

const getAllfriendRequests = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/friend-requests`, config);
    if (res.data)
        localStorage.setItem('friendRequests', JSON.stringify(res.data));
    return res.data;
};

const sendFriendRequest = async (token, UserID, friendFullUsername) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post(
        `/api/friend-requests`,
        friendFullUsername,
        config
    );
    if (res.data) return res.data;
};

const acceptFriendRequest = async (token, UserID, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.put(
        `/api/friend-requests/${FriendID}`,
        config
    );
    if (res.data) return res.data;
};

const rejectFriendRequest = async (token, UserID, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.delete(
        `/api/friend-requests/${FriendID}`,
        config
    );
    if (res.data) return res.data;
};

const FriendsService = {
    sendFriendRequest,
    getAllfriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    getUserFriends
};
export default FriendsService;
