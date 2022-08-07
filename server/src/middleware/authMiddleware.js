const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    const bearerToken = req.headers.authorization || req.body.headers.Authorization;

    if (bearerToken && bearerToken.startsWith('Bearer')) {
        try {
            // Gets the token from header
            token = bearerToken.split(' ')[1];

            // Verifies the token
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

            // Gets the user data
            req.user = await userModel.findById(decodedToken.id).select('-password');
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized. Invalid token signature.');
        }
    }
    if (!token) throw new Error('Not authorized. No token.');
});

module.exports = { authenticate };