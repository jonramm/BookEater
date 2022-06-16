const express = require('express');
const router = express.Router();
const nourishmentController = require('../controllers/nourishmentController');

router.route('/')
    .post(nourishmentController.addNourishment)

module.exports = router