const express = require('express');
const router = express.Router();

const { verifyPayment } = require('../controllers/webhook-listeners/paystack-listener')

router.post('/callback', verifyPayment);

module.exports = router;