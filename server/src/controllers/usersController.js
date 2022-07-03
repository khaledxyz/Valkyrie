const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { customAlphabet } = require('nanoid');
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 4);

const usersModel = require("../models/usersModel");

// * SIGN UP * //
// @desc    Register user
// @route   POST /api/users
// @access  public
const signUp = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    // Checks if user already exists
    const userExists = await usersModel.findOne({email});
    if(userExists) {
        return res.status(409).json({message: 'User already exists.'})
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Pushes user to the DB
    const user = {
        username,
        tag: '#' + nanoid(),
        email: email.toLowerCase(),
        password: hashedPassword

    };
    const newUser = await usersModel.create(user);

    if(newUser) {
        return res.status(200).json({
            message: 'Registered an account.'
        })
    }

    res.status(400).json({message: 'Something went wrong. Try again.'})
});

// * LOGIN * //
// @desc    Login user
// @route   POST /api/users/login
// @access  public
const logIn = ('/login', asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // Finds the user
    const user = await usersModel.findOne({email: email.toLowerCase()}).select("+password");

    // Checks the password with bcrypt.compare()
    if(user && bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            message: 'Logged in'
        });
    }

    return res.status(401).json({
        message: 'Wrong Email or Password'
    });

}));


module.exports = { signUp, logIn };