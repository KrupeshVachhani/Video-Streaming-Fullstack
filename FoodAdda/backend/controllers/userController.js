const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: async function (req, res) {
    try {
      // Extract user data from the request body
      const { name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered." });
      }

      // Check if the password is provided and not empty
      if (!password) {
        return res.status(400).json({ message: "Password is required." });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  },

  getAdminUsers: async function (req, res) {
    try {
      // Extract the name parameter from the request
      const { name } = req.params;

      // Find the user by name in the database
      const user = await User.findOne({ name });

      // Check if the user exists and is an admin
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      // If the user is an admin, fetch all users from the database
      const users = await User.find();

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  },
};
