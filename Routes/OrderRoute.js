const express = require('express'); 
const { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus, cancelOrder } = require('../Controller/OrderController'); 
const { authuser, isAdmin } = require('../Middleware/Authuser'); const router = express.Router();

// User Routes 
 router.post('/createOrder', authuser, createOrder); 
 router.get('/myOrders', authuser, getUserOrders); 
 router.get('/order/:orderId', authuser, getOrderById);
  
  // Admin Routes 
router.get('/allOrders', authuser, isAdmin, getAllOrders);
router.put('/updateOrder/:orderId', authuser, isAdmin, updateOrderStatus); 
 module.exports = router;