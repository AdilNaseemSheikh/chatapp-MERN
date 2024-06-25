const express = require('express');
const { sendMessage, getMessages } = require('../controllers/message.controller');
const protectRoutes = require('../middlewares/protectRoutes');

const router = express.Router();

router.get('/:id', protectRoutes, getMessages)
router.post('/send/:id', protectRoutes, sendMessage)

module.exports = router;