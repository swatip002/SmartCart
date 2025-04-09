const express = require("express");
const {
    getCart,
    addToCart,
    addToCartByRFID,
    removeFromCart,
    decrementFromCart,
    clearCart,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user's cart
router.get("/", authMiddleware, getCart);

// Add product to cart (Scanned by RFID - manual scan with auth)
router.post("/", authMiddleware, addToCart);

// Add product to cart by RFID tag only (from Arduino)
router.post("/rfid", authMiddleware, addToCartByRFID);

// Decrement quantity of a product from cart
router.put("/decrement/:productId", authMiddleware, decrementFromCart);

// Remove a product from cart
router.delete("/:productId", authMiddleware, removeFromCart);

// Clear cart after checkout
router.delete("/", authMiddleware, clearCart);

module.exports = router;
