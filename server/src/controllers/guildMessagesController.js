const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const guildModel = require('../models/guildModel');
const channelModel = require('../models/channelModel');
const guildMessageModel = require('../models/guildMessageModel');

// * GET CHANNEL MESSAGES * //
// @desc    get user messages
// @route   GET /api/messages/guild-messages/:channelID
// @access  private
const getChannelMessages = asyncHandler(async (req, res) => {
    const channelID = req.params.channelID;

    const channelMessages = await guildMessageModel.find({ channel: channelID });
    res.status(201).json(channelMessages);
});

// * SEND MESSAGE TO CHANNEL * //
// @desc    Send a message to a channel.
// @route   POST /api/messages/guild-messages
// @access  private
const sendMessage = ('/', asyncHandler(async (req, res) => {
    const { content, channelID } = req.body;

    const user = await userModel.findById(req.user.id);
    const channel = await channelModel.findById(channelID);
    const guild = await guildModel.findById(channel.guild);

    if (!channel) {
        res.status(404);
        throw new Error('No channel found.');
    };

    if (!guild.members.includes(user._id)) {
        res.status(403);
        throw new Error('You are not a member of this guild.');
    };

    const message = await guildMessageModel.create({
        sender: user._id,
        content,
        channel: channel._id,
        createdAt: Date.now()
    });

    return res.status(200).json(message);
}));

module.exports = { sendMessage, getChannelMessages };
