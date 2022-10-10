const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { register, getMe, getUser, getfriends } = require('../controllers/usersController');

router.post('/', register);
router.get('/@me', authenticate, getMe);
router.get('/:UserID', authenticate, getUser);

router.get('/:UserID/friends', authenticate, getfriends);

module.exports = router;