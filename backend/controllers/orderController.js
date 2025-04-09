// const Order = require("../models/Order");

// // Place a new order (Initially "Pending" status)
// exports.placeOrder = async (req, res) => {
//     try {
//         const { items, totalAmount } = req.body;
//         const userId = req.user.id;

//         // Create a new order with "Pending" status
//         const order = new Order({
//             user: userId,
//             items,
//             totalAmount,
//             paymentStatus: "Pending"
//         });

//         await order.save();

//         res.status(201).json({ success: true, message: "Order placed successfully", order });
//     } catch (error) {
//         res.status(500).json({ success: false, error: "Error placing order" });
//     }
// };

// // Get all orders for a user
// exports.getUserOrders = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const orders = await Order.find({ user: userId }).populate("items.product");
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, error: "Error fetching orders" });
//     }
// };

// // Update order status after payment verification
// exports.updateOrderStatus = async (orderId, paymentDetails) => {
//     try {
//         const order = await Order.findById(orderId);
//         if (!order) {
//             throw new Error("Order not found");
//         }

//         // Update order status and add payment details
//         order.paymentStatus = "Completed";
//         order.razorpayPaymentId = paymentDetails.razorpayPaymentId;
//         order.razorpayOrderId = paymentDetails.razorpayOrderId;
//         order.razorpaySignature = paymentDetails.razorpaySignature;

//         await order.save();
//         return order;
//     } catch (error) {
//         throw new Error("Error updating order status");
//     }
// };
