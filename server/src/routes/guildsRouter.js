const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'valkyrie/uploads' })

const {getGuild, getGuilds, postGuild, joinGuild} = require('../controllers/guildsController');
const {authenticate} = require('../middlewares/authMiddleware');

// Fetch guilds
router.get('/', authenticate, getGuilds);
router.get('/:id', authenticate, getGuild);

// Create guild
router.post('/', authenticate, upload.single('serverIcon'), postGuild);

// Join guild
router.put('/:id/join', authenticate, joinGuild);

module.exports = router;