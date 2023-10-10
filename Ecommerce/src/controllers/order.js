const cartItems = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose = require('mongoose');

const userOrders = async (req,res, next) => {
    const userId = req.params.userId ?? req.user.userId;
    try {
        const orders = await Order.fullModel.find({ user: userId});
        res.status(200).json(orders);
    } catch (error) {
        next('An error occurred while retrieving products.');
    }
}

const createOrder = async (req, res) => {
    try {
        const { cart_ids } = req.body;
        const userId = req.user.userId;
        console.log(cart_ids, userId);

        // Replace "Cart" with the actual Mongoose model for cart items
        const Cart = mongoose.model('Cart');
        const cartObjectIds = cart_ids.map(id => new mongoose.Types.ObjectId(id));
        // Define the aggregation pipeline to calculate total_price
        const aggregationPipeline = [
            {
                $match: {
                    _id: { $in: cartObjectIds }, // Convert cart_ids to ObjectId
                    user: new mongoose.Types.ObjectId(userId)
                },
            },
            {
                $group: {
                    _id: null,
                    total_price: { $sum: "$price" } // Replace "price" with the actual field name
                },
            },
        ];

        // Execute the aggregation
        const result = await Cart.aggregate(aggregationPipeline);

        // Check if there are results
        if (result.length === 0) {
            return res.status(404).json({ error: 'No matching cart items found.' });
        }

        // Return the total_price
        res.status(200).json(result[0]); // Assuming you expect a single result
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
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
    userOrders,
    createOrder,
    editCart,
    getSingleCartItem,
    removeItemFromCart,
};