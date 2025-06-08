const express = require('express');
const router = express.Router();
const sttController = require('../controllers/sttController.js');

router.get('/', sttController.getSTT);

module.exports = router;
