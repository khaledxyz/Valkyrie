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
        res.status(409);
        throw new Error('Not authorized. No Token.');
    };

    // Checks if user provided a username and tag
    if (!username || !tag) {
        res.status(409);
        throw new Error('Please provide a username and tag.');
    };

    // Gets friend's user ID from database
    const friend = await userModel.findOne({ username, tag });

    if (!friend) {
        res.status(409);
        throw new Error('Friend not found.');
    };

    // Checks if user is sending himself a friend request
    if (user._id.toString() == friend._id.toString()) {
        res.status(409);
        throw new Error('Well, You don\'t need Valkyrie to talk to yourself!');
    };

    // Creates friend request
    await friendReqModel.create({
        sender: user._id,
        receiver: friend._id,
    });

    res.status(201).json({ message: 'Friend request sent.' });
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

// * DECLINE FRIEND REQUEST * //
// @desc    Decline friend request
// @route   DELETE /api/friend-requests/:FriendID
// @access  private
const declineFriendRequest = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const userFriendRequest = await friendReqModel.find({ sender: req.params.FriendID, receiver: user._id });

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

    // Deletes friend request
    await friendReqModel.deleteOne({ _id: userFriendRequest[0]._id });

    res.status(200).json({ message: 'Friend request Declined.' });

});

module.exports = { getFriendRequests, createFriendRequest, acceptFriendRequest, declineFriendRequest };