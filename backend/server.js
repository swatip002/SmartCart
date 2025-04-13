const http = require('http');
const app = require('./app');
const express = require('express');
const { Server } = require('socket.io');
const razorpay = require('razorpay');
require('dotenv').config();

const port = process.env.PORT || 5001;
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
  }
});

app.set('io', io); // Make io accessible in other modules

// Razorpay client
const client = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,   // Replace with your Razorpay key_id
  key_secret: process.env.RAZORPAY_KEY_SECRET  // Replace with your Razorpay key_secret
});

// Razorpay order endpoint
app.post('/api/payment/order', express.json(), (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'order_receipt',
    payment_capture: 1
  };

  client.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: order.id, amount: order.amount });
  });
});




// <---------------------------------UNCOMMENT THIS FOR REAL ARDUINO--------------------------------->
// // Socket.IO: handle connection
// io.on('connection', (socket) => {
//   console.log("A user connected:", socket.id);

//   // Optional: Listen for Arduino-like data here (if using serial → server bridge)
//   socket.on('rfid-scan', (product) => {
//     console.log("Received RFID scan:", product);
//     // Broadcast to all clients
//     io.emit('product-scanned', product);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


//<-------------------------------THIS IS FOR TESTING PURPOSES ONLY---------------------------------->
io.on('connection', (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
  
  // 💡 Simulate RFID scans every 5 seconds
  const sampleProducts = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
    { id: 4, name: "Product D", price: 40 }
  ];
  
  setInterval(() => {
    const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    console.log("Simulating product scan:", randomProduct);
    io.emit("product-scanned", randomProduct);
  }, 5000); // every 5 seconds
  
  // Start server
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });