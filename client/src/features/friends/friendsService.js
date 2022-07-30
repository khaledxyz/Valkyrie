import axios from "axios";

const getAllFriends = async (token, UserID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.get(`http://localhost:5000/api/users/${UserID}/friends`, config);
    if (res.data) localStorage.setItem('friends', JSON.stringify(res.data));

    return res.data;
};

const getAllfriendRequests = async (token, UserID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.get(`http://localhost:5000/api/users/${UserID}/friend-requests`, config);
    if (res.data) localStorage.setItem('friendRequests', JSON.stringify(res.data));

    return res.data;
};

const sendFriendRequest = async (token, UserID, friendFullUsername) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.post(`http://localhost:5000/api/users/${UserID}/friend-requests`, friendFullUsername, config);
    if (res.data) return res.data;
};

const acceptFriendRequest = async (token, UserID, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.put(`http://localhost:5000/api/users/${UserID}/friend-requests/${FriendID}`, config);
    if (res.data) return res.data;
};

const rejectFriendRequest = async (token, UserID, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const res = await axios.delete(`http://localhost:5000/api/users/${UserID}/friend-requests/${FriendID}`, config);
    if (res.data) return res.data;
};

const FriendsService = { getAllFriends, sendFriendRequest, getAllfriendRequests, acceptFriendRequest, rejectFriendRequest };
export default FriendsService;