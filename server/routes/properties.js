const express = require('express');
const { addProperty, editProperty, deleteProperty, getProperties } = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/')
    .post(auth, addProperty)
    .get(getProperties);

router.route('/:id')
    .put(auth, editProperty)
    .delete(auth, deleteProperty);

module.exports = router;
