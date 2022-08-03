const express = require('express');
const router = express.Router();

const { getAllFriends, getFriendRequests, addFriendRequest, acceptFriendRequest, declineFriendRequest } = require('../controllers/friendsController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:UserID/friends', authenticate, getAllFriends);

router.get('/:UserID/friend-requests', authenticate, getFriendRequests);
router.post('/:UserID/friend-requests', authenticate, addFriendRequest);
router.put('/:UserID/friend-requests/:FriendID', authenticate, acceptFriendRequest);
router.delete('/:UserID/friend-requests/:FriendID', authenticate, declineFriendRequest);

module.exports = router;