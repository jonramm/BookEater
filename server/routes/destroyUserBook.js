const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.route('/')
    .post(booksController.destroyUserBook)

module.exports = router;