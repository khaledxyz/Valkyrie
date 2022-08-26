const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const userMessagesModel = require('../models/userMessageModel');

// * GET USER CONVERSATION * //
// @desc    get user messages
// @route   GET /api/messages/user-messages/:ReceiverID
// @access  private
const getConversation = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    const receiver = await userModel
        .findById(req.params.ReceiverID)
        .select('username')
        .select('tag')
        .select('avatar');

    const messages = await userMessagesModel
        .find({
            $or: [
                { sender: user._id, receiver: receiver._id },
                { sender: receiver._id, receiver: user._id }
            ]
        })
        .select('content')
        .select('sender')
        .select('receiver')
        .select('createdAt')
        .sort({ createdAt: 1 });

    const conversation = {
        messages,
        receiver
    };

    res.status(201).json(conversation);
});

// * SEND MESSAGE * //
// @desc    Send a message to a user
// @route   POST /api/messages/user-messages
// @access  private
const sendMessage =
    ('/',
    asyncHandler(async (req, res) => {
        const user = await userModel.findById(req.user.id);
        const { content, receiver } = req.body;

        const message = await userMessagesModel.create({
            sender: user._id,
            receiver,
            content,
            date: Date.now()
        });

        return res.status(200).json(message);
    }));

module.exports = { sendMessage, getConversation };
