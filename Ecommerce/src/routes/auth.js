const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const roleValidation = body('role').notEmpty().withMessage('Role is required.');
const emailValidation =  body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.');
const passwordValidation =  body('password').notEmpty().withMessage('Password is required.');
const {register,login,dashboard, verifyMail} = require('../controllers/auth')
const authenticateUserMiddleware = require("../middleware/auth");
// const authMiddleware = require('../middleware/auth')
router.get('/dashboard',authenticateUserMiddleware,dashboard);
// router.get('/dashboard',authMiddleware,dashboard);
router.post('/login',emailValidation,passwordValidation,login);
router.post('/register',
    body('name').notEmpty().withMessage('Name is required.'),
    passwordValidation,
    emailValidation,
    roleValidation,
    register);
router.post('/verify-email',
    body('verification_code').notEmpty().withMessage('Verification Code is required.'),
    verifyMail);

module.exports = router;