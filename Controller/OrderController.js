const Order = require('../Models/OrderModel');
const Cart = require('../Models/CartModel');
const Product=require('../Models/ProductModel')

// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { shippingInfo, totalAmount, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Prepare order items with all necessary product details
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productId.product_name,
      productPrice: item.productId.product_price,
      productImage: item.productId.product_image,
      quantity: item.quantity,
      totalPrice: item.productId.product_price * item.quantity
    }));

    const order = new Order({
      userId,
      items: orderItems,
      shippingInfo: {
        ...shippingInfo,
        paymentMethod: paymentMethod || 'COD'
      },
      totalAmount,
      orderStatus: "Pending",
      paymentStatus: paymentMethod === 'Online' ? 'Paid' : 'Pending'
    });

    await order.save();

    // 🔥 DECREASE PRODUCT QUANTITY
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { product_qty: -item.quantity } }
      );
    }

    // Clear cart
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(200).json({ 
      msg: "Order placed successfully", 
      order,
      orderId: order._id 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};


// Get User's Orders
const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ orderDate: -1 });
        
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Single Order
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .sort({ orderDate: -1 });
        
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus, paymentStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ success: true, message: "Order updated", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { 
    createOrder, 
    getUserOrders, 
    getOrderById, 
    getAllOrders, 
    updateOrderStatus, 
   
};