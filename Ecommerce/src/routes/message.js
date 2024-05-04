const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const roleValidation = body('role').notEmpty().withMessage('Role is required.');
const emailValidation =  body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.');
const passwordValidation =  body('password').notEmpty().withMessage('Password is required.');
const {messages,create} = require('../controllers/messaging')
router.get('/',messages);
router.post('/',create);

module.exports = router;