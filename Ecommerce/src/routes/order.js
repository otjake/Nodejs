const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { userOrders, createOrder } = require('../controllers/order');

const orderCreationRules = [
    body('cart_ids').notEmpty().isArray().withMessage('Cart identifiers is required, and must be an array.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

router.get('/', userOrders);
router.post('/', orderCreationRules, validate, createOrder);

module.exports = router;
