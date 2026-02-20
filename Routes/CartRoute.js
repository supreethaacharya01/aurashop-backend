const express = require('express');
const { addToCart, getCart, removeFromCart, updateQuantity } = require('../Controller/CartController');
const { authuser } = require('../Middleware/Authuser'); // import middleware

const router = express.Router();

// Protect all cart routes
router.post('/addToCart', authuser, addToCart);
router.get('/getCart', authuser, getCart);
router.delete("/remove/:cartItemId", authuser, removeFromCart);
router.put("/updateQuantity/:cartItemId", authuser, updateQuantity);

module.exports = router;
