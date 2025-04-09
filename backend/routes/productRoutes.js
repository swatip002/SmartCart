const express = require("express");
const { getProductByBarcode, addProduct, deleteProduct } = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch product by barcode (Customer scans product)
router.get("/:barcode", authMiddleware, getProductByBarcode);

// Add a new product (Admin only)
router.post("/", authMiddleware, adminMiddleware, addProduct);

// Delete a product (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
