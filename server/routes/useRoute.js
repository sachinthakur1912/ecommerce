const express = require('express');
const userCtrl = require('../controllers/userctrl');
const router = express.Router();

router.post('/register',userCtrl.register)

module.exports = router;