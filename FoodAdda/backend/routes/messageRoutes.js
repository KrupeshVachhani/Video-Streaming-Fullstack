// message.routes.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Route for creating a new message
router.post("/", messageController.createMessage);

module.exports = router;
