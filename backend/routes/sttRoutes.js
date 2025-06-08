const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../config/stt.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load STT config' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
