const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    guild: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    position: {
        type: Number,
    },
});

module.exports = new mongoose.model('channel', channelSchema);

