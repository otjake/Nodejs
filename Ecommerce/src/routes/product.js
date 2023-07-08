const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { allProducts, createProduct, getProduct, editProduct, deleteProduct } = require('../controllers/product');

const productValidationRules = [
    body('name').notEmpty().isString().withMessage('Name is required.'),
    body('price').notEmpty().isNumeric().withMessage('Price must be a numeric value.'),
    body('image').notEmpty().withMessage('Image is required.')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', allProducts);
router.get('/:id', getProduct);
router.post('/', productValidationRules, validate, createProduct);
router.put('/:id', productValidationRules, validate, editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
