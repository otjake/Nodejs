const cartItem = require('../models/Cart')
const Product = require('../models/Product')
const userCartItems = async (req,res) => {
    const userId = req.params.userId ?? req.user.userId;
    try {
        const products = await cartItem.find({ user: userId});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving products.' });
    }
}
const addToCart = async (req,res) => {
    try {
        const {qty, product_id } = req.body;
        const getProduct = await Product.findById(product_id);
        const data = {
            'quantity' : qty,
            'product' : product_id,
            'price' : getProduct.price * qty,
            'user' : req.user.userId
        };
        const product = await cartItem.create(data);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating products.' });
    }
}

const editCart = async (req, res) => {
    const cartItemId = req.params.id;
    try {
        const product = await cartItem.findByIdAndUpdate(cartItemId, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ error: 'Cart item not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit cart item' });
    }
};

const getSingleCartItem = async (req, res) => {
    try {
        const { params: { id: cartItemId }, user: { userId } } = req;
        const product = await cartItem.findOne({ _id: cartItemId, user: userId }).lean();

        if (!product) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve cart item' });
    }
};

const removeItemFromCart = async (req, res) => {
    const { params: { id: cartItemId }, user: { userId } } = req;
    try {
        const product = await cartItem.findOneAndDelete({ _id: cartItemId, user: userId }).lean();

        if (!product) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete cart item' });
    }
};

module.exports = {
    userCartItems,
    addToCart,
    editCart,
    getSingleCartItem,
    removeItemFromCart,
};