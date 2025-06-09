const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticate = require('../middleware/auth.js');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/profile', authenticate, userController.updateProfile);

module.exports = router;
