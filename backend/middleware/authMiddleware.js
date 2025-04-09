const jwt = require("jsonwebtoken");

// Middleware to verify user authentication using cookies
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies

    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Middleware to restrict access to admin users
const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
