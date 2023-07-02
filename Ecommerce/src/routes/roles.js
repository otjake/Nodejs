const express = require('express');
const router = express.Router();

const {roles} = require('../controllers/roles')
// const authMiddleware = require('../middleware/auth')
router.get('/',roles);

module.exports = router;