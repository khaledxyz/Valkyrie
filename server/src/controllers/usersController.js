const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('0123456789', 4);
const nanoidSTR = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
    10
);

const userModel = require('../models/userModel');

// * REGISTER * //
// @desc    Create new user account
// @route   POST /api/users
// @access  public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Checks if user already exists
    const userExists = await userModel.findOne({ email: email.toLowerCase() });
    if (userExists) {
        res.status(409);
        throw new Error('Account already exists.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new avatar from username & random id
    const avatar = `https://source.boringavatars.com/beam/120/${nanoidSTR()}`;

    // Pushes user to the DB
    const user = {
        username,
        tag: '#' + nanoid(),
        email: email.toLowerCase(),
        avatar,
        password: hashedPassword
    };
    const newUser = await userModel.create(user);

    if (newUser) {
        return res.status(200).json({
            message: 'Registered an account.'
        });
    }

    res.status(400);
    throw new Error();
});

// * GET ME * //
// @desc    Get logged user info
// @route   GET /api/users/@me
// @access  private
const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
});

// * GET USER * //
// @desc    Get user info
// @route   GET /api/users/:UserID
// @access  private
const getUser = asyncHandler(async (req, res) => {
    const { UserID } = req.params;
    console.log(UserID);
    const user = await userModel
        .findById(UserID)
        .select('username')
        .select('tag')
        .select('avatar');

    if (!user) {
        res.status(404);
        throw new Error('User not found.');
    }

    return res.status(200).json(user);
});

// * GET USER FRIENDS * //
// @desc    Get friends list
// @route   POST /api/users/:UserID/friends
// @access  private
const getUserFriends = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user.id);

    // Checks if user is logged in
    if (!user) {
        res.status(409);
        throw new Error('Not authorized. No Token.');
    }

    // Checks if user matches the id in the url
    if (user.id !== req.params.UserID) {
        res.status(409);
        throw new Error('Not authorized.');
    }

    const userFriends = await userModel
        .find({ _id: { $in: user.friends } })
        .select('username')
        .select('tag')
        .select('avatar');

    res.status(200).json(userFriends);
});

module.exports = { register, getMe, getUser, getUserFriends };
