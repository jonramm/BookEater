const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.route('/')
    .post(reportsController.fetchReport)

module.exports = router;