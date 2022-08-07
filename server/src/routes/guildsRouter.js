const express = require('express');
const router = express.Router();

const { getGuild, getGuilds, postGuild, joinGuild } = require('../controllers/guildsController');
const { authenticate } = require('../middleware/authMiddleware');

// Fetch guilds
router.get('/', authenticate, getGuilds);
router.get('/:id', authenticate, getGuild);

// Create guild
router.post('/', authenticate, postGuild);

// Join guild
router.put('/:id/join', authenticate, joinGuild);

module.exports = router;