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
    password: {
        type: String,
        required: true,
        select: false
    },
    guilds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guild'
    }],
});

module.exports = new mongoose.model('User', userSchema);