const express = require('express');
const userCtrl = require('../controllers/userctrl');
const router = express.Router();

router.post('/register',userCtrl.register)
router.post('/refresh_token',userCtrl.refreshToken)

module.exports = router;