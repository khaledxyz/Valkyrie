const mongoose = require('mongoose');

const guildMessageModel = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = new mongoose.model('GuildMessage', guildMessageModel);