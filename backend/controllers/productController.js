const Product = require("../models/Product");

// Fetch product details by scanning barcode (For Customers)
const getProductByBarcode = async (req, res) => {
    try {
        const { barcode } = req.params;
        const product = await Product.findOne({ barcode });

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new product (Admin Only)
const addProduct = async (req, res) => {
    try {
        const { name, barcode, price, category, stock } = req.body;

        // Check if product already exists
        let product = await Product.findOne({ barcode });
        if (product) return res.status(400).json({ message: "Product already exists" });

        product = new Product({ name, barcode, price, category, stock });
        await product.save();

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product (Admin Only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductByBarcode, addProduct, deleteProduct };
