const express = require('express');
const router = express.Router();

const { sendMessage, getChannelMessages } = require('../controllers/guildMessagesController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, sendMessage);
router.get('/:channelID', authenticate, getChannelMessages);

module.exports = router;