const express = require('express');
const router = express.Router();

const { getAllFriends, getFriendRequests, addFriendRequest, acceptFriendRequest } = require('../controllers/friendsController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/:USERID/friends', authenticate, getAllFriends);

router.get('/:USERID/friend-requests', authenticate, getFriendRequests);
router.post('/:USERID/friend-requests', authenticate, addFriendRequest);
router.put('/:USERID/friend-requests/:FRIENDID', authenticate, acceptFriendRequest);

module.exports = router;