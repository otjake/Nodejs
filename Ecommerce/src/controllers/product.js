const Product = require('../models/Product')
const cloudinary = require("../middleware/cloudinarySetup")
const fs = require('fs');

const allProducts = async (req,res) => {
    try {
        const products = await Product.find().populate('category').exec();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products.' });
    }
}
const createProduct = async (req,res,next) => {
    try {
        let imagePath = req.file.path
        const imageResult = await cloudinary.uploader.upload(imagePath, {
            use_filename: true,
            unique_filename: false,
        });

        let body = {
            'image' : imageResult.secure_url,
            'name' : req.body.name,
            'price' : req.body.price,
            'category' : req.body.category_id
        }
        const product = await Product.create(body);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    } finally {
        // Delete the temporary file
        fs.unlinkSync(req.file.path);
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