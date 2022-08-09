const express = require('express');
const router = express.Router();

const { logIn, logOut } = require('../controllers/authController');


router.post('/', logIn);
router.delete('/', logOut);
// router.post('/', refreshToken); Will add later if needed

module.exports = router;