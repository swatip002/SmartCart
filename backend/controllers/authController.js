const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper function to generate JWT and set cookie
const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return token;
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword, role, phone });
        await user.save();

        const token = generateTokenAndSetCookie(user, res);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = generateTokenAndSetCookie(user, res);

        res.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout user (Clear cookie)
const logoutUser = (req, res) => {
    res.cookie("token", "", { 
        httpOnly: true, 
        expires: new Date(0)
    });

    res.json({ message: "Logout successful" });
};

// Get user details (Protected route)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };
