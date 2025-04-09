const express = require("express");
const { registerUser, loginUser, logoutUser, getUserProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

//route to get the user logout
router.post("/logout",logoutUser);

// Route to get user profile (protected route)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
