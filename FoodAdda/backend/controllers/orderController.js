const Order = require("../models/Order");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  createOrder: async function (req, res) {
    try {
      const order = new Order({
        userName: req.body.userName,
        orderItems: req.body.orderItems,
        shippingInfo: req.body.shippingInfo,
        email: req.body.email,
        totalPrice: req.body.totalPrice,
      });

      await order.save();

      const sendOrderConfirmationEmail = async function (order) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: "service.foodadda@gmail.com",

            pass: "mjge ogsn xnnd hjkd",
          },
          tls: {
            ciphers: "SSLv3",
          },
        });

        const message = {
          from: "service.foodadda@gmail.com",
          to: req.body.email,

          subject: "Order Confirmation",
          text: `Your order has been placed successfully!`,
          html: `
                    <p>Dear ${order.userName},</p>
              
                    <p>Thank you for your order! Your order details are as follows:</p>
              
                    <ul>
                      <li>Order number: ${order.id}</li>
                      <li>Order total: ${order.totalPrice}</li>
                    </ul>
              
                    <p>Your order will be shipped to the following address:</p>
              
                    <p>House No. :- ${order.shippingInfo.Hno}</p>
                    <p>City :- ${order.shippingInfo.city}</p>
                    <p>Postal Code :- ${order.shippingInfo.postalCode}</p>
                    <p>Phone Number :- ${order.shippingInfo.phoneNumber}</p>
              
                    <p>We will send you an email notification when your order has been shipped.</p>
              
                    <p>Thank you again for your order! We appreciate your business.</p>
              
                    <p>Sincerely,</p>
                    <p>The team at FoodAdda.com</p>
                  `,
        };

        await transporter.sendMail(message);
      };

      // Add the following code to the end of the `createOrder()` function:

      await sendOrderConfirmationEmail(order);

      const successResponse = {
        success: true,
        message: "Order placed successfully.",
      };

      // Send the success response as JSON
      res.json(successResponse);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error.");
    }
  },

  getOrdersForUser: async function (req, res) {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId });
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error.");
    }
  },

  getOrdersForAdmin: async function (req, res) {
    try {
      const {name} = req.params;
      // Find the user in the database based on the userId
      const user = await User.findOne({name});

      // Check if the user exists and has an admin role
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      // If the user is an admin, fetch all orders from the database
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  },

};
