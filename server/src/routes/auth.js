const express = require('express');
const router = express.Router();

const usersModel = require('../models/usersModel.js');

router.post('/login', async (req, res) => {
    await usersModel.find({email: req.body.email}).select("+password")
    .then(user => checkLogin(user[0], req, res));
});

const checkLogin = (user, req, res) => {
    // Checks if the user exists then checks if password is correct
    if(!user) {res.status(401).json({msg: 'Wrong Email or Password'}); return;}
    if(user.password !== req.body.password) {res.status(401).json({msg: 'Wrong Email or Password'}); return;}

    // set cookies
    req.session.user = user._id;

    res.status(200).json({msg: 'Logged in successfully'});
};

module.exports = router;