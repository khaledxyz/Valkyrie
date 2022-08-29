const express = require('express');
const router = express.Router();

const { getGuild, getGuilds, postGuild, joinGuild, getChannels, createChannel } = require('../controllers/guildsController');
const { authenticate } = require('../middleware/authMiddleware');

// Fetch guilds
router.get('/', authenticate, getGuilds);
router.get('/:id', authenticate, getGuild);
router.get('/:id/channels', authenticate, getChannels);

// Create guild
router.post('/', authenticate, postGuild);
router.post('/:id/channels', authenticate, createChannel);

// Join guild
router.put('/:id/join', authenticate, joinGuild);

module.exports = router;