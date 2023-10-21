// const mongoose = require('mongoose');
// const Order = require('../../models/Order')
// const { verify } = require("../../middleware/integrations/paystack");

// const verifyPayment = async (req,res, next) => {
//     try {
//         // Retrieve the Paystack callback data from the request body
//         const reference = req.body.data.reference;

//         // Verify the payment using Paystack
//         const verification = await verify(reference);
//         console.log("Verification response",verification);
//         const verificationStatus = verification.status;

//         // Check if the payment verification is true meaning reference was verified
//         if (verificationStatus) {
//           // Update the order status in your system (e.g., mark the order as paid)
//           // You can retrieve order information from your database using callbackData.reference
//           console.log("update order payment status",verification);
//             const order = await Order.fullModel.findOne({ reference: reference });

//             if (!order) {
//               return res.status(404).json({ error: 'Order not found.' });
//             }
//             const paymentTransactionStatus = verification.data.status;
//              // Update the order status to 'paid' (or any desired status)
//             order.status = paymentTransactionStatus == "success" ? Order.SUCCESSFUL : Order.REJECTED;

//             // Save the updated order
//             await order.save();
//             console.log("updated order payment status",order);

//             return res.status(201).json({ message: 'Payment verification successful. Order updated.' });
//           // Respond to Paystack to acknowledge the callback
//         } else {
//           // Handle failed payments or fraud cases
//           // You may want to log this for further investigation
//           return res.status(400).json({ error: 'Payment verification failed.' });
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while verifying the payment.' });
//       }
// }

// module.exports = {
//     verifyPayment
// }

const Order = require('../../models/Order');
const { verify } = require("../../middleware/integrations/paystack");

const verifyPayment = async (req, res, next) => {
  try {
    const reference = req.body.data.reference;
    const verification = await verify(reference);
    
    if (verification.status) {
      const order = await findOrder(reference);
      
      if (!order) {
        return handleOrderNotFound(res);
      }
      
      const paymentTransactionStatus = verification.data.status;
      updateOrderStatus(order, paymentTransactionStatus);
      return handleSuccessResponse(res);
    } else {
      return handleFailedPayment(res);
    }
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

async function findOrder(reference) {
  return await Order.fullModel.findOne({ reference });
}

function handleOrderNotFound(res) {
  return res.status(404).json({ error: 'Order not found.' });
}

function updateOrderStatus(order, paymentTransactionStatus) {
  order.status = paymentTransactionStatus === 'success' ? Order.SUCCESSFUL : Order.REJECTED;
  order.save();
  console.log(order)
}

function handleSuccessResponse(res) {
  return res.status(201).json({ message: 'Payment verification successful. Order updated.' });
}

function handleFailedPayment(res) {
  return res.status(400).json({ error: 'Payment verification failed.' });
}

function handleInternalServerError(res, error) {
  console.error(error);
  return res.status(500).json({ error: 'An error occurred while verifying the payment.' });
}

module.exports = {
  verifyPayment
};
