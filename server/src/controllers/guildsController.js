const asyncHandler = require('express-async-handler');
const guildModel = require("../models/guildModel");
const userModel = require("../models/userModel");
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

    res.status(200).json({ guild })
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
    }

    const uploadedFile = await cloudinary.uploader.upload(req.body.icon, { upload_preset: 'guild_icons' });
    console.log(uploadedFile);

    const guild = await guildModel.create({
        name: req.body.name,
        icon: uploadedFile.url,
        owner: req.user.id,
        members: [req.user.id]
    });

    await userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { guilds: guild._id } });

    res.status(201).json({ guild });
});

// * JOIN GUILD * //
// @desc    Create guild
// @route   PUT /api/guilds/:id/join
// @access  private
const joinGuild = asyncHandler(async (req, res) => {
    const guild = await guildModel.findById(req.params.id)
    const user = await userModel.findById(req.user.id);

    // Checks if user exists
    if (!user) {
        res.status(404);
        throw new Error('Not authorized. No Token.');
    }

    // Checks if server exists
    if (!guild) {
        res.status(404);
        throw new Error('Could not find server.');
    }

    // Checks if user is already in guild
    if (guild.members.includes(req.user.id)) {
        res.status(400);
        throw new Error('You are already in this server.');
    }

    // Adds user to guild
    await guildModel.findOneAndUpdate({ _id: req.params.id }, { $push: { members: req.user.id } });
    await userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { guilds: req.params.id } });

    res.status(200).json({ message: "Successfully joined server." })
});

module.exports = { getGuild, getGuilds, postGuild, joinGuild };