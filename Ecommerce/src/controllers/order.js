const cartItem = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose = require('mongoose');
const { initialize } = require("../middleware/integrations/paystack");

const userOrders = async (req,res, next) => {
    const userId = req.params.userId ?? req.user.userId;
    const status = req.query.status ?? null;
    let queryData = {
            user: userId, 
         }
    if(status){
        queryData.status = status 
    }

    try {
        const orders = await Order.fullModel.find(queryData);
        res.status(200).json(orders);
    } catch (error) {
        next('An error occurred while retrieving products.');
    }
}

const createOrder = async (req, res) => {
    try {
        const { cart_ids,payment_method } = req.body;
        const userId = req.user.userId;
        const paystackPaymentMethod = process.env.PAYSTACK_PAYMENT
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
        const [totalCartAmount] = await Cart.aggregate(aggregationPipeline);

        // Check if there are results
        if (!totalCartAmount) {
            return res.status(404).json({ error: 'No matching cart items found.' });
        }
        const totalAmount = totalCartAmount.total_price;
        const data = {
            'total_amount' : totalAmount,
            'user' : req.user.userId
        };
        // Create a Paystack transaction
        const paymentData = {
            email: req.user.email, // User's email
            amount: totalAmount * 100, // Amount in kobo (1 USD = 100 kobo)
            currency: 'NGN', // Nigerian Naira
            callback_url: 'https://webhook.site/a6e3cd48-bb76-4740-8030-2e73d1b63f72', // Replace with your actual callback URL
        };

        if(payment_method == paystackPaymentMethod ){
            const payment = await initialize(paymentData);
            console.log("body response on initialization", payment.authorization_url, payment.reference)
            data.reference = payment.reference;
            data.payment_url = payment.authorization_url;
        }
        data.payment_gateway = paystackPaymentMethod
        const order = await Order.fullModel.create(data);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
}

module.exports = {
    userOrders,
    createOrder,
};