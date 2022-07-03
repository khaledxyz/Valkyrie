const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const { signUp, logIn } = require('../controllers/usersController');

router.post('/', signUp);
router.post('/login', logIn);


//     // Generates an access token
//     const accessToken = jwt.sign({user}, process.env.JWT_TOKEN_SECRET)
//     res.status(200).json({accessToken: accessToken, user: user});
// };


// const authenticate = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
//         console.log(err, user)
//     });
//     if(!token) return res.status(401).json({msg: 'No token, authorization denied'});
//     req.user = user;
//     next();
// };

module.exports = router;