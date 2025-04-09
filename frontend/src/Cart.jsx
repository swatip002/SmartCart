import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product A", quantity: 2, price: 10 },
    { id: 2, name: "Product B", quantity: 1, price: 20 },
    { id: 3, name: "Product C", quantity: 1, price: 30 },
    { id: 4, name: "Product D", quantity: 2, price: 20 }
  ]);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Shopping Cart</h2>
      <div className="max-h-80 overflow-y-auto w-full max-w-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md w-full mb-3 flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-lg">Quantity: {item.quantity}</p>
            </div>
            <p className="text-lg font-semibold">${item.price}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button onClick={() => navigate("/payment" , { state: { totalPrice } })} className="bg-green-500 text-white text-lg px-6 py-3 rounded-lg mt-6">Check Out</button>
    </div>
  );
};
export default Cart