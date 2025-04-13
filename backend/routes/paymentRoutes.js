const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id:  'rzp_test_YE3jOoNmIEGpLh',
  key_secret: 'nFN2blv9UQaUjYOYQhaNTPLu'
});

router.post('/order', async (req, res) => {
  console.log("Creating Razorpay order...");
  const { amount } = req.body;

  try {
    const options = {
      amount,
      currency: 'INR',
      receipt: 'receipt_order_74394',
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
