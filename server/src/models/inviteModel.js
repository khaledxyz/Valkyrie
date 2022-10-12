const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    guild: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    invite: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('Invite', inviteSchema);

