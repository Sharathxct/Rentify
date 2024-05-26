const express = require('express');
const { registerUser, loginUser, checkToken } = require('../controllers/authController');
const router = express.Router();
const upload = require('../middleware/multer')

router.post('/register',upload.single('file'), registerUser);
router.post('/login', loginUser);
router.get('/', checkToken )

module.exports = router;
