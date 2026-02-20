const Cart = require('../Models/CartModel');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
      return res.json({ message: "Added to cart" });
    }

    let item = cart.items.find(i => i.productId.toString() === productId);
    if (item) item.quantity += quantity;
    else cart.items.push({ productId, quantity });

    await cart.save();
    res.json({ message: "Updated cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller/CartController.js
const getCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ This comes from authuser middleware
    
    console.log("🔍 Fetching cart for userId:", userId); // Debug log
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    
    if (!cart) {
      return res.json({ cartItems: [] }); // Return empty array
    }
    
    res.json({ cartItems: cart.items });
  } catch (error) {
    console.error("❌ Cart error:", error); // Better error logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const userId = req.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);
    await cart.save();
    res.json({ message: "Removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;

    if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ userId });
    const item = cart.items.id(cartItemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = quantity;
    await cart.save();
    res.json({ message: "Quantity updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateQuantity };
