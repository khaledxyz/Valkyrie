const express = require('express');
const router = express.Router();

const { sendMessage, getConversation } = require('../controllers/userMessagesController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, sendMessage);
router.get('/:ReceiverID', authenticate, getConversation);

module.exports = router;