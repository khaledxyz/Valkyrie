import { axiosInstance } from '../../app/axios';

// Fetch Friends
const fetchFriends = async (token, UserID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/users/${UserID}/friends`, config);
    if (res.data) return res.data;
};

// Fetch friend requests
const fetchFriendRequests = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.get(`/api/friend-requests`, config);
    if (res.data) return res.data;
};

// Create friend request
const createFriendRequest = async (token, username) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.post(`/api/friend-requests`, username, config);
    if (res.data) return res.data;
};

// Accept friend request
const acceptFriendRequest = async (token, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.put(`/api/friend-requests/${FriendID}`, config);
    if (res.data) return res.data;
};

// Reject friend request
const rejectFriendRequest = async (token, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.delete(`/api/friend-requests/${FriendID}`, config);
    if (res.data) return res.data;
};

// Reject friend request
const deleteFriend = async (token, UserID, FriendID) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axiosInstance.put(`/api/users/${UserID}/friends/${FriendID}`, config);
    if (res.data) return res.data;
};

const FriendsService = {
    fetchFriends,
    fetchFriendRequests,

    createFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend
};

export default FriendsService;
