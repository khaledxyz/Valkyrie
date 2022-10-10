const joinChannel = (socket, channelID) => {
    socket.join(channelID);
    socket.emit('joined_channel');
};

module.exports = joinChannel;