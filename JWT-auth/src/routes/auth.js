const express = require('express');
const router = express.Router();

const {login,dashboard} = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')
router.get('/dashboard',authMiddleware,dashboard);
router.post('/login',login);

module.exports = router;    