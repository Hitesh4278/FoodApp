const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const authMiddleware = require('../auth/authMiddleware');

router.post('/orderData', authMiddleware , async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        let existingOrder = await Order.findOne({ email: req.body.email });

        if (existingOrder === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data],
                transactionId: req.body.transactionId
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } },
                { transactionId: req.body.transactionId }
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error("Error processing order:", error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});
function calculateTotalAmount(order_data) {
    let total = 0;
    for (const item of order_data) {
        total += item.price;
    }
    return total * 100;
}

router.post('/create-payment',authMiddleware, async (req, res) => {
    try {
      const { token, order_data, customer_name, customer_address } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateTotalAmount(order_data),
        currency: 'inr',
        payment_method: token.id,
        confirmation_method: 'automatic',
        confirm: true,
        receipt_email: token.email,
        description: 'Order payment',
        shipping: {
          name: customer_name,
          address: customer_address,
        },
      });
      res.send({
        success: true,
        message: 'Payment request created',
        data: {
          clientSecret: paymentIntent.client_secret,
          status: paymentIntent.status,
        },
      });
    } catch (error) {
      console.error('Payment or order creation failed:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
router.post('/myOrderData',authMiddleware, async (req, res) => {
    try {
        let order = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: order });
    } catch (error) {
        console.error("Error retrieving order:", error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
