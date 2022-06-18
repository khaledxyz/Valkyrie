const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const { customAlphabet } = require('nanoid');
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 4);


// * LOGIN * //
router.post('/login', async (req, res) => {
    await usersModel.find({email: req.body.email}).select("+password")
    .then(user => checkLogin(user[0], req, res));
});

const checkLogin = (user, req, res) => {
    // Checks if the user exists then checks if password is correct
    if(!user) {res.status(401).json({msg: 'Wrong Email or Password'}); return;}
    if(user.password !== req.body.password) {res.status(401).json({msg: 'Wrong Email or Password'}); return;}

    // Generate an access token
    const accessToken = jwt.sign({user}, process.env.JWT_TOKEN_SECRET)
    res.status(200).json({accessToken: accessToken});
};

// * SIGN UP * //
router.post('/signup', async (req, res) => {
    let tag = '#' + nanoid();
    const body = {
        username: req.body.username,
        tag,
        fullUsername: req.body.username + tag,
        email: req.body.email,
        password: req.body.password
    }
    const new_user = new usersModel(body)
    try{
        await new_user.save();
        res.status(200).json({msg: 'Signed up successfully'})
    }
    catch(error) {console.log(error)}
});
module.exports = router;