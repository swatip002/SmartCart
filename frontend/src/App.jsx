import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import Login from './Login'
import Signup from './Signup'
import Cart from './Cart'
import Payment from './Payment'


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    
  )
}

export default App