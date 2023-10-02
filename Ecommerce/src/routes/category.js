const express = require('express');
const router = express.Router();

const {categories} = require('../controllers/categories')
router.get('/',categories);

module.exports = router;