const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    serverIcon: {
        data: Buffer,
        contentType: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = new mongoose.model('Guild', guildSchema);

