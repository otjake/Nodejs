const Product = require('../models/Product')
const allProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products.' });
    }
}
const createProduct = async (req,res) => {
    try {
        const product = await Product.create({...req.body});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating products.' });
    }
}
const editProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit product' });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndRemove(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    allProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
};