const express = require('express');
const router = express.Router();

const { getFriendRequests, createFriendRequest, acceptFriendRequest, rejectFriendRequest } = require('../controllers/friendRequestsController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, getFriendRequests);
router.post('/', authenticate, createFriendRequest);
router.put('/:FriendID', authenticate, acceptFriendRequest);
router.delete('/:FriendID', authenticate, rejectFriendRequest);

module.exports = router;