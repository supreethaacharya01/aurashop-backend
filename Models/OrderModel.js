const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  productName: { type: String },
  productPrice: { type: Number },
  productImage: { type: String },
  quantity: { 
    type: Number, 
    required: true,
    min: 1 
  },
  totalPrice: { type: Number }
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  items: [orderItemSchema], 
  shippingInfo: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    paymentMethod: String
  },
  totalAmount: Number,
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", OrderSchema); // Changed from "Orders" to "Order"