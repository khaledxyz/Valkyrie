const asyncHandler = require('express-async-handler');
const { nanoid } = require('nanoid');

const guildModel = require("../models/guildModel");
const inviteModel = require('../models/inviteModel');
const userModel = require("../models/userModel");
const channelModel = require('../models/channelModel');
const cloudinary = require("../config/cloudinary");

// * GET GUILD * //
// @desc    get single guild
// @route   GET /api/guild/:id
// @access  private
const getGuild = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    };

    if (!user.guilds.includes(req.params.id)) {
        res.status(404);
        throw new Error('Server not found.');
    };

    const guild = await guildModel.findById(req.params.id);
    const channels = await channelModel.find({ guild: guild._id });
    const members = await userModel.find({ _id: guild.members })
        .select('-guilds')
        .select('-friends')
        .select('-email');

    res.status(200).json({ guild, members, channels })
});

// * GET GUILDS * //
// @desc    get guilds
// @route   GET /api/guilds
// @access  private
const getGuilds = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    }

    const guilds = await guildModel.find({ _id: { $in: user.guilds } });
    res.status(200).json(guilds);
});

// * CREATE GUILD * //
// @desc    Create guild
// @route   POST /api/guilds
// @access  private
const postGuild = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    };

    let uploadedFile;
    if (req.body.icon) {
        uploadedFile = await cloudinary.uploader.upload(req.body.icon, { upload_preset: 'guild_icons' });
    };

    const guild = await guildModel.create({
        name: req.body.name,
        icon: req.body.icon ? uploadedFile.url : 'default',
        owner: req.user.id,
        members: [req.user.id]
    });

    await userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { guilds: guild._id } });
    res.status(201).json(guild);
});

// * CREATE INVITE * //
// @desc    Create invite
// @route   POST /api/guilds/:id/invite
// @access  private
const createInvite = asyncHandler(async (req, res) => {
    const { guildID, invite } = req.body;
    const guild = await guildModel.findById(guildID)
    const user = await userModel.findById(req.user.id);

    // Checks if user exists
    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    };

    // Checks if server exists
    if (!guild) {
        res.status(404);
        throw new Error('Could not find server.');
    };

    // Creates the invite id
    const inviteObj = await inviteModel.create({
        guild: guild._id,
        invite
    });

    res.status(200).json(inviteObj);
});

// * JOIN GUILD * //
// @desc    Join guild
// @route   PUT /api/guilds/:id/join
// @access  private
const joinGuild = asyncHandler(async (req, res) => {
    const invite = await inviteModel.find({ invite: req.params.id });
    const user = await userModel.findById(req.user.id);

    // Checks if user exists
    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    };

    // Checks if the invite exists
    if (!invite[0]) {
        const message = 'This invite in invalid or has expired.'
        res.status(404).json(message);
        throw new Error(message);
    };

    const guild = await guildModel.findById(invite[0].guild);

    if (!guild) {
        const message = 'This invite in invalid or has expired.'
        res.status(404).json(message);
        throw new Error(message);
    };

    // Checks if user is already in guild
    if (guild.members.includes(req.user.id)) {
        const message = 'You are already in this server.';
        res.status(400).json(message);
        throw new Error(message);
    };

    // Adds user to guild
    await guildModel.findOneAndUpdate({ _id: guild._id }, { $push: { members: req.user.id } });
    await userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { guilds: guild._id } });

    res.status(200).json({ message: "Successfully joined server." })
});

// * GET GUILD CHANNELS * //
// @desc    Create guild
// @route   GET /api/guilds/:id/channels
// @access  private
const getChannels = asyncHandler(async (req, res) => {
    const guild = await guildModel.findById(req.params.id);
    const user = req.user;

    if (!guild) {
        res.status(404);
        throw new Error('Guild not found');
    };

    if (!guild.members.includes(user._id)) {
        res.status(403);
        throw new Error('You are not a member of this guild.');
    };

    const channels = await channelModel.find({ guild: guild._id });
    res.status(200).json(channels);
});

// * CREATE NEW GUILD CHANNEL * //
// @desc    Create guild channel
// @route   POST /api/guilds/:id/channels
// @access  private
const createChannel = asyncHandler(async (req, res) => {
    const guild = await guildModel.findById(req.params.id);
    const user = req.user;
    const { name } = req.body

    if (!name) {
        res.status(400);
        throw new Error('Provide a name.');
    };

    if (user._id.toString() !== guild.owner.toString()) {
        res.status(403);
        throw new Error('Not authorized. You don\'t have permissions.');
    };

    // create channel
    const channel = await channelModel.create({
        name,
        guild: guild._id,
        // TODO: add position
    });

    res.status(200).json(channel)
});

// * DELETE GUILD * //
// @desc    Delete guild 
// @route   DELETE /api/guilds/:id/channels
// @access  private
const deleteGuild = asyncHandler(async (req, res) => {
    const guild = await guildModel.findById(req.params.id);
    const user = req.user;

    if (!user) return;

    if (!guild) {
        res.status(404);
        throw new Error('Something went wrong.');
    };

    if (user._id.toString() !== guild.owner.toString()) {
        res.status(403);
        throw new Error('Not authorized. You don\'t have permissions.');
    };

    await guildModel.deleteOne({ _id: guild._id });

    res.status(200).json(guild._id)
});

module.exports = { getGuild, getGuilds, postGuild, joinGuild, getChannels, createChannel, createInvite, deleteGuild };