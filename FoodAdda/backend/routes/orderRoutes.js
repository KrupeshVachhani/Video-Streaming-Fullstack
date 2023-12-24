const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST request to create a new order
router.post('/postorder', orderController.createOrder);

// GET request to fetch all orders for a specific user
router.get('/user/:userId', authMiddleware, orderController.getOrdersForUser);
router.get('/admin/:name', orderController.getOrdersForAdmin);

module.exports = router;
