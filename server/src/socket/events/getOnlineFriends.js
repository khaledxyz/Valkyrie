const userModel = require('../../models/userModel');

const getOnlineFriends = async (socket, userID) => {
    const user = await userModel.findById(userID);

    const friends = await userModel
        .find({ _id: { $in: user.friends } })
        .select('username')
        .select('tag')
        .select('avatar');

    const onlineFriends = friends.filter(friend => onlineUsers.some(online => friend._id.toString() === online.userID));
    socket.emit('receive_online_friends', onlineFriends);
};

module.exports = getOnlineFriends;