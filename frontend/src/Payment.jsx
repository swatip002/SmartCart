import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice } = location.state;

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Fetch user details from backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/auth/profile", {
                    credentials: "include", // Important to send cookies for auth
                });

                const data = await response.json();
                console.log("User data:", data);
                if (data.name && data.email && data.number) {
                    setUserDetails({
                        name: data.name,
                        email: data.email,
                        phone: data.phone
                    });
                } else {
                    console.warn("User details incomplete:", data);
                }
            } catch (err) {
                console.error("Failed to fetch user details:", err);
            }
        };

        fetchUserData();
    }, []);

    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/payment/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalPrice * 100 }),
            });

            const orderData = await response.json();
            console.log("Order data:", orderData);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "Smart Cart System",
                description: "Payment for your purchase",
                order_id: orderData.id,
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email,
                    contact: userDetails.phone,
                    method: "card",
                    "card[number]": "5267 3181 8797 5449",
                    "card[expiry]": "12/28",
                    "card[cvv]": "123"
                },
                handler: function (response) {
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
