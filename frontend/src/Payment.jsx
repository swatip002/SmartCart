import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state; // Get totalPrice from state passed from Cart page

    const handlePayment = async () => {
        // Step 1: Request the order from your backend (create Razorpay order)
        console.log("Frontend Amount:", totalPrice)
        try {
            const response = await fetch('http://localhost:5001/api/payment/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalPrice * 100 }), // Amount in the smallest unit (paise)
            });

            const orderData = await response.json();
            console.log(orderData)
            // Step 2: Initialize Razorpay with the order ID and other options
            const options = {
                key:import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
                
                amount: orderData.amount, // Amount in paise
                currency: "INR",
                name: "Smart Cart System",
                description: "Payment for your purchase",
                order_id: orderData.id,
                prefill: {
                    name: "Customer Name", // User's name
                    email: "user@example.com", // User's email
                    contact: "9999999999", // User's phone number
                    method: "card",
                      "card[number]": "5267 3181 8797 5449",
                      "card[expiry]": "12/28",
                      "card[cvv]": "123"
                },
                handler: function (response) {
                //   alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                  
                  // ✅ Redirect to Cart page after successful payment
                  navigate('/cart');
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error in creating Razorpay order:", error);
        }
    };

    useEffect(() => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Payment</h2>
            <div className="max-w-md bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Total Amount: ₹{totalPrice}</h3>
                <button
                    onClick={handlePayment}
                    className="bg-blue-500 text-white text-lg px-6 py-3 rounded-lg"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Payment;
