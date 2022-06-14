const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.post('/', reportsController.editReport);

module.exports = router;