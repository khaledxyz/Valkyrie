const express = require('express');
const router = express.Router();

const { getFriendRequests, createFriendRequest, acceptFriendRequest, declineFriendRequest } = require('../controllers/friendRequestsController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, getFriendRequests);
router.post('/', authenticate, createFriendRequest);
router.put('/:FriendID', authenticate, acceptFriendRequest);
router.delete('/:FriendID', authenticate, declineFriendRequest);

module.exports = router;