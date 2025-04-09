import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6 text-center">
      <h1 className="text-3xl text-gray-800 sm:text-3xl font-bold mb-6">Welcome to Smart Cart</h1>
      <img src="https://img.freepik.com/free-vector/shopping-cart-realistic_1284-6011.jpg?ga=GA1.1.99995507.1739212134&semt=ais_hybrid" alt="Cart" className="mix-blend-multiply w-auto sm:w-48 mb-6 rounded-lg" />
      <Link to="/login" className="bg-blue-500 w-32 text-white text-lg  px-4 py-2 sm:px-6 sm:py-3 rounded-lg mb-2">
        Login
      </Link>
      <p className="text-gray-700 mt-2">
        New user? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  )
}

export default Home