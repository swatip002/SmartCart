// const razorpay = require("../config/razorpay");
// const crypto = require("crypto");
// const Order = require("../models/Order");

// exports.createOrder = async (req, res) => {
//     try {
//         const { orderId, amount, currency } = req.body;
//         const order = await Order.findById(orderId);
//         if (!order) return res.status(404).json({ error: "Order not found" });

//         const razorpayOrder = await razorpay.orders.create({
//             amount: amount * 100,
//             currency: currency || "INR",
//             receipt: `order_${orderId}`,
//             payment_capture: 1
//         });

//         res.json({ success: true, orderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency });
//     } catch (error) {
//         res.status(500).json({ error: "Error creating payment order" });
//     }
// };

// exports.verifyPayment = async (req, res) => {
//     try {
//         const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

//         const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//             .digest("hex");

//         if (expectedSignature !== razorpaySignature) {
//             return res.status(400).json({ error: "Payment verification failed" });
//         }

//         const order = await Order.findByIdAndUpdate(orderId, {
//             paymentStatus: "Completed",
//             razorpayPaymentId,
//             razorpayOrderId,
//             razorpaySignature
//         }, { new: true });

//         res.json({ success: true, message: "Payment verified", order });
//     } catch (error) {
//         res.status(500).json({ error: "Error verifying payment" });
//     }
// };