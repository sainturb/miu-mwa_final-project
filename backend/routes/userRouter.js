const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const {checkToken} = require('../middlewares/auth');
//const multer = require('multer');

//login
router.post('/login', loginController.login);

// router.post('/test', userController.createUsers);

router.post('/signup', userController.signup);

router.get('/me', checkToken, userController.me);

module.exports = router;