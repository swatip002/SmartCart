import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

// Initialize socket connection
const socket = io("http://localhost:5001");

const Cart = () => {
  const navigate = useNavigate();

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Calculate total
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Socket listener
  useEffect(() => {
    socket.on("product-scanned", (product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    });

    return () => {
      socket.off("product-scanned");
    };
  }, []);

  // Clear cart after payment success (optional usage)
  const handlePaymentSuccess = () => {
    setCartItems([]);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Shopping Cart</h2>

      <div className="max-h-80 overflow-y-auto w-full max-w-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md w-full mb-3 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-lg">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-semibold">Rs.{item.price}</p>
            </div>
          ))
        )}
      </div>

      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-xl font-bold">Total Price: Rs.{totalPrice.toFixed(2)}</h3>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/payment", { state: { totalPrice } })}
          className="bg-green-500 text-white text-lg px-6 py-3 rounded-lg"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
