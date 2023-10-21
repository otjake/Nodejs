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
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: true,
        default: PENDING
    },
    total_amount: {
        type: Number,
        required: true
    },
    gateway:{
        type: String,
        required: false
    },
    payment_url:{
        type: String,
        required: false
    }
})

const fullModel = mongoose.model('Order',OrderModel)
module.exports = {
    fullModel,
    PENDING,
    REJECTED,
    SUCCESSFUL
}