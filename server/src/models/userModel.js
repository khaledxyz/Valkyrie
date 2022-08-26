const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }],
    guilds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guild'
    }],
});

module.exports = new mongoose.model('User', userSchema);