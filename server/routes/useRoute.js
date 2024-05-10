const express = require('express');
const userCtrl = require('../controllers/userctrl');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/register',userCtrl.register)
router.post('/refresh_token',userCtrl.refreshToken)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/info',auth,userCtrl.getUsers)
module.exports = router;