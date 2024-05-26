const express = require('express');
const { registerUser, loginUser, checkToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', checkToken )

module.exports = router;
