import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await axios.post("http://localhost:5001/api/auth/login", { email, password }, { withCredentials: true });
            navigate("/cart");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <input 
                    type="email" placeholder="Email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border p-3 w-full mb-3 rounded-lg"
                />
                <input 
                    type="password" placeholder="Password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="border p-3 w-full mb-4 rounded-lg"
                />

                <button 
                    onClick={handleLogin} 
                    className="bg-blue-500 w-full text-white text-lg px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>

                {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;



//<----------------------TO ENTER ANYONE (FOR TESTING PURPOSES ONLY)--------------------------------->


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleLogin = async () => {
//         try {
//             // Attempt to login with the provided credentials
//             await axios.post("http://localhost:5001/api/auth/login", 
//                 { email, password },
//                 { withCredentials: true } // To handle cookies/sessions if any
//             );
//         } catch (error) {
//             // Handle errors and show the error message
//             setError(error.response?.data?.message || "Login failed");
//         }

//         // Always redirect to the /cart page, no matter what
//         navigate("/cart");
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg max-w-sm w-full">
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//                 <input 
//                     type="email" 
//                     placeholder="Email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     className="border p-3 w-full mb-3 rounded-lg"
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     className="border p-3 w-full mb-4 rounded-lg"
//                 />

//                 <button 
//                     onClick={handleLogin} 
//                     className="bg-blue-500 w-full text-white text-lg px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                     Login
//                 </button>

//                 {/* Show the error message if any */}
//                 {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;

