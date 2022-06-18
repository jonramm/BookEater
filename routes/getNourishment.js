const express = require('express');
const router = express.Router();
const nourishmentController = require('../controllers/nourishmentController');

router.route('/')
    .post(nourishmentController.getNourishment)

module.exports = router;