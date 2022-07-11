const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'valkyrie/uploads' })

const {getGuilds, postGuild, joinGuild} = require('../controllers/guildsController');
const {authenticate} = require('../middlewares/authMiddleware');

// Fetch guilds
router.get('/', authenticate, getGuilds);

// Create guild
router.post('/', authenticate, upload.single('serverIcon'), postGuild);

// Join guild
router.put('/:id/join', authenticate, joinGuild);

module.exports = router;