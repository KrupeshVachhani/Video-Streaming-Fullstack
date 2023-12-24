// Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  shippingInfo: {
    Hno: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
  },
  orderItems: {
    GujratiThali: {
      price: { type: Number },
      quantity: { type: Number },
    },
    PanjabiThali: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Dhokla: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Khandvi: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Thepla: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Undhiyu: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Handvo: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Fafda: {
      price: { type: Number },
      quantity: { type: Number },
    },
    Pavbhaji: {
      price: { type: Number },
      quantity: { type: Number },
    },
  },

  email: {
    type: String,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
