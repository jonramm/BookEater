const express = require('express');
const router = express.Router();
const userInfoController = require('../../controllers/userInfoController');

router.route('/')
    .post(userInfoController.getUserInfo)

module.exports = router