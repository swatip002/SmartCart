const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Fetch user's cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add product to cart (Scanned by RFID with auth)
const addToCart = async (req, res) => {
    try {
        const { barcode } = req.body;
        const product = await Product.findOne({ barcode });

        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => item.product.toString() === product._id.toString());

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: product._id, quantity: 1, price: product.price });
        }

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add to cart by RFID directly with auth-protected userId
const addToCartByRFID = async (req, res) => {
    try {
        const { rfidTag } = req.body;
        const userId = req.user.id;

        const product = await Product.findOne({ barcode: rfidTag });
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existing = cart.items.find((item) => item.product.equals(product._id));
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.items.push({ product: product._id, quantity: 1, price: product.price });
        }

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        await cart.save();

        res.json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        await cart.save();
        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Decrement quantity of a product in cart
const decrementFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.product.toString() === productId);

        if (!item) return res.status(404).json({ message: "Product not in cart" });

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
        }

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        await cart.save();

        res.json({ message: "Product decremented from cart", cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart after checkout
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        res.json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    addToCartByRFID,
    removeFromCart,
    decrementFromCart,
    clearCart,
};
