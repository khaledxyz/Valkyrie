import axios from "axios";

const getAllFriends = async(token, USERID) => {
    const config = {headers: {Authorization: `Bearer ${token}`}};

    const res = await axios.get(`http://localhost:5000/api/users/${USERID}/friends`, config);
    if(res.data) localStorage.setItem('friends', JSON.stringify(res.data));

    return res.data;
};

const sendFriendRequest = async(token, USERID, friendUsername) => {
    const config = {headers: {Authorization: `Bearer ${token}`}};

    const res = await axios.post(`http://localhost:5000/api/users/${USERID}/friend-requests`, friendUsername, config);
    if(res.data) return res.data;
};

const FriendsService = { getAllFriends, sendFriendRequest };
export default FriendsService;