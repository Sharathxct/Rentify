const express = require('express');
const { likeProperty, markInterested } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.put('/like/:id', auth, likeProperty);
router.put('/interested/:id', auth, markInterested);

module.exports = router;
