const express = require('express');
const { addProperty, editProperty, deleteProperty, getProperties, getProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = require('../middleware/multer');

router.route('/')
    .post(auth, upload.array('images', 10), addProperty)
    .get(getProperties);

router.route('/:id')
    .put(auth, editProperty)
    .delete(auth, deleteProperty)
    .get(getProperty);

module.exports = router;
