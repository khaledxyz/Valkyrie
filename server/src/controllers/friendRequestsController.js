const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const friendReqModel = require('../models/friendReqModel');

// * GET ALL FRIEND REQUESTS * //
// @desc    Get friend requests list
// @route   GET /api/friend-requests
// @access  private
const getFriendRequests = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    // Checks if user is logged in
    if (!user) {
        res.status(409);
        throw new Error('Not authorized. No Token.');
    };

    // Gets all friend requests (IDs) for the user
    const comingRequestsIDs = await friendReqModel.find({ receiver: user.id });
    const outgoingRequestsIDs = await friendReqModel.find({ sender: user.id });

    // Gets details for all friend requests
    const comingFriendRequests = await userModel.find({ _id: { $in: comingRequestsIDs.map(req => req.sender) } })
        .select('username')
        .select('tag')
        .select('avatar');

    const outgoingFriendRequests = await userModel.find({ _id: { $in: outgoingRequestsIDs.map(req => req.receiver) } })
        .select('username')
        .select('tag')
        .select('avatar');

    res.status(200).json({ comingFriendRequests, outgoingFriendRequests });
});

// * CREATE FRIEND REQUEST * //
// @desc    Create friend request
// @route   POST /api/friend-requests
// @access  private
const createFriendRequest = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const { username, tag } = req.body;

    // Checks if user is logged in
    if (!user) {
        const message = 'Not authorized. No Token.';
        res.status(409).json(message);
        throw new Error(message);
    };

    // Checks if user provided a username and tag
    if (!username || !tag) {
        const message = 'Please provide a username and tag.';
        res.status(409).json(message);
        throw new Error(message);
    };

    // Gets friend's user ID from database
    const friend = await userModel.findOne({ username, tag })
        .select('username')
        .select('tag')
        .select('avatar');


    if (!friend) {
        const message = 'Friend not found.';
        res.status(409).json(message);
        throw new Error(message);
    };

    // Checks if user is sending himself a friend request
    if (user._id.toString() == friend._id.toString()) {
        const message = 'Well, You don\'t need Valkyrie to talk to yourself!';
        res.status(409).json(message);
        throw new Error(message);
    };

    // Creates friend request
    const request = await friendReqModel.create({
        sender: user._id,
        receiver: friend._id,
    });

    res.status(201).json({ friend, request });
});

// * ACCEPT FRIEND REQUEST * //
// @desc    Accept friend request
// @route   PUT /api/friend-requests/:FriendID
// @access  private
const acceptFriendRequest = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const userFriendRequest = await friendReqModel.find({ sender: req.params.FriendID, receiver: user._id });
    const friend = await userModel.findById(req.params.FriendID);

    // Checks if user is logged in
    if (!user) {
        res.status(409);
        throw new Error('Not authorized. No Token.');
    };

    // Checks if friend request is valid
    if (!userFriendRequest.length) {
        res.status(409);
        throw new Error('Something went wrong.');
    };

    // Accepts friend request
    await userModel.updateOne({ _id: user._id }, { $push: { friends: friend._id } });
    await userModel.updateOne({ _id: friend._id }, { $push: { friends: user._id } });
    await friendReqModel.deleteOne({ _id: userFriendRequest[0]._id });

    res.status(200).json({ message: 'Friend request accepted.' });
});

// * DELETE FRIEND REQUEST * //
// @desc    Delete friend request
// @route   DELETE /api/friend-requests/:FriendID
// @access  private
const rejectFriendRequest = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);
    let friendRequest = await friendReqModel.find({ sender: req.params.FriendID, receiver: user._id });

    if (!friendRequest.length) {
        friendRequest = await friendReqModel.find({ sender: user._id, receiver: req.params.FriendID });
    };

    // Checks if user is logged in
    if (!user) {
        res.status(409);
        throw new Error('Not authorized. No Token.');
    };

    // Checks if friend request is valid
    if (!friendRequest.length) {
        res.status(409);
        throw new Error('Something went wrong.');
    };

    // Deletes friend request
    await friendReqModel.deleteOne({ _id: friendRequest[0]._id });
    res.status(200).json({ message: 'Friend request rejected.' });
});

module.exports = { getFriendRequests, createFriendRequest, acceptFriendRequest, rejectFriendRequest };