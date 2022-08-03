const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { signUp, logIn, getMe } = require('../controllers/usersController');

router.post('/', signUp);
router.post('/login', logIn);

router.get('/@me', authenticate, getMe);

module.exports = router;