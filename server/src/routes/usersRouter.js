const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authMiddleware');
const { signUp, logIn, getMe } = require('../controllers/usersController');

router.post('/', signUp);
router.post('/login', logIn);

router.get('/@me', authenticate, getMe);

module.exports = router;