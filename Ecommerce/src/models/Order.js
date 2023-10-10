const mongoose = require('mongoose')
const PENDING = 0;
const REJECTED = -1;
const SUCCESSFUL = 1;
const OrderModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: PENDING
    },
    total_amount: {
        type: Number,
        required: true
    }
})

const fullModel = mongoose.model('Order',OrderModel)
module.exports = {
    fullModel,
    PENDING,
    REJECTED,
    SUCCESSFUL
}