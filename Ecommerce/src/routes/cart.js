const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { userCartItems, addToCart, editCart, getSingleCartItem, removeItemFromCart, } = require('../controllers/cart');

const cartItemValidationRules = [
    body('product_id').notEmpty().isString().withMessage('Product identifier is required.'),
    // body('price').notEmpty().isNumeric().withMessage('Price must be a numeric value.'),
    body('qty').notEmpty().isNumeric().withMessage('qty must be a numeric value.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', userCartItems);
router.get('/:id', getSingleCartItem);
router.post('/', cartItemValidationRules, validate, addToCart);
router.put('/:id', cartItemValidationRules, validate, editCart);
router.delete('/:id', removeItemFromCart);

module.exports = router;
