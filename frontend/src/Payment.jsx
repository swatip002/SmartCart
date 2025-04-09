import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSetup = () => {
  const location = useLocation();
  const totalBill = location.state?.totalPrice || 0;
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaymentSaved, setIsPaymentSaved] = useState(false);
  const navigate = useNavigate();

  const handleSavePayment = () => {
    setIsPaymentSaved(true);
  };

  const handlePay = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/payment/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalBill, currency: "INR" }),
      });

      const data = await response.json();
      if (!data.success) throw new Error("Failed to create order");

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual key
        amount: data.amount,
        currency: data.currency,
        name: "SmartCart",
        description: "Smart Shopping Payment",
        order_id: data.orderId,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:5001/api/payment/verifyPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            navigate("/success");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Setup</h2>

        {!isPaymentSaved ? (
          <>
            <label className="block font-medium mb-2">Select Payment Method:</label>
            <select
              className="w-full p-3 border rounded-lg mb-4"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI / Digital Wallet</option>
            </select>

            {paymentMethod === "card" && (
              <>
                <input type="text" placeholder="Cardholder Name" className="mb-3 w-full p-3 border rounded-lg" />
                <input type="text" placeholder="Card Number" className="mb-3 w-full p-3 border rounded-lg" />
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/YY" className="mb-3 w-1/2 p-3 border rounded-lg" />
                  <input type="password" placeholder="CVV" className="mb-3 w-1/2 p-3 border rounded-lg" />
                </div>
                <input type="text" placeholder="Billing Address" className="mb-4 w-full p-3 border rounded-lg" />
              </>
            )}

            {paymentMethod === "upi" && (
              <input type="text" placeholder="UPI ID (e.g., user@upi)" className="mb-4 w-full p-3 border rounded-lg" />
            )}

            <button
              onClick={handleSavePayment}
              className="w-full py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Save Payment Method
            </button>
          </>
        ) : (
          <p className="text-lg font-medium text-center mb-4">Payment method saved successfully!</p>
        )}

        {isPaymentSaved && (
          <button
            onClick={handlePay}
            className="w-full py-3 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Pay ₹{totalBill.toFixed(2)}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentSetup;
