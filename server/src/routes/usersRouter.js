const express = require('express');
const router = express.Router();

const { signUp, logIn } = require('../controllers/usersController');

router.post('/', signUp);
router.post('/login', logIn);

module.exports = router;