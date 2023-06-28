const express = require('express');
const router = express.Router();

const {register,login,dashboard} = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')
router.get('/dashboard',authMiddleware,dashboard);
router.post('/login',login);
router.post('/register',register);

module.exports = router;    