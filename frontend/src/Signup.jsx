import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        try {
            await axios.post("http://localhost:5001/api/auth/register", formData, { withCredentials: true });
            navigate("/cart");
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                <input 
                    type="text" name="name" placeholder="Full Name" 
                    value={formData.name} onChange={handleChange} 
                    className="border p-3 w-full mb-3 rounded-lg"
                />
                <input 
                    type="email" name="email" placeholder="Email" 
                    value={formData.email} onChange={handleChange} 
                    className="border p-3 w-full mb-3 rounded-lg"
                />
                <input 
                    type="password" name="password" placeholder="Password" 
                    value={formData.password} onChange={handleChange} 
                    className="border p-3 w-full mb-3 rounded-lg"
                />
                <select 
                    name="role" value={formData.role} onChange={handleChange} 
                    className="border p-3 w-full mb-4 rounded-lg"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>

                <button 
                    onClick={handleSignup} 
                    className="bg-green-500 w-full text-white text-lg px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Signup;
