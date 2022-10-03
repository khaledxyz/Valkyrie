const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

// * LOG IN * //
// @desc    login user
// @route   POST /auth
// @access  public
const logIn = ('/', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Checks if user provided email and password
    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter an email and password.');
    };

    // Finds the user
    const user = await userModel.findOne({ email: email.toLowerCase() })
        .select('+password');

    // Checks the password with bcrypt.compareSync()
    if (user && bcrypt.compareSync(password, user.password)) {
        return res.status(200).json({
            token: generateJWT(user._id),
            details: user
        });
    };

    res.status(401);
    throw new Error('Wrong Email or Password');
}));

// * LOG OUT * //
// @desc    logout user
// @route   DELETE /auth
// @access  private
const logOut = ('/', asyncHandler(async (req, res) => {
    return res.status(200).json({ message: 'Logged out.' });
}));

// * OTHER FUNCTIONS * //
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET)
};

module.exports = { logIn, logOut };
