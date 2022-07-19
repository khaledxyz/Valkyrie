const express = require('express');
const router = express.Router();

const { getAllFriends, addFriendRequest, acceptFriendRequest } = require('../controllers/friendsController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/:USERID/friends', authenticate, getAllFriends);

router.post('/:USERID/friend-requests', authenticate, addFriendRequest);
router.put('/:USERID/friend-requests/:FRIENDID', authenticate, acceptFriendRequest);

module.exports = router;