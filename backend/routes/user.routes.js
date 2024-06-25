const express = require('express');
const { getUsers } = require('../controllers/user.controller');
const protectRoutes = require('../middlewares/protectRoutes');

const router = express.Router();

router.get('/', protectRoutes, getUsers)

module.exports = router;