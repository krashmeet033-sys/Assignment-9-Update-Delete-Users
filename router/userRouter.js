const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/userModel");

const router = express.Router();


// ===============================
// POST /api/users
// Create User
// ===============================
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    console.log("User created successfully");

    res.status(201).json({
      message: "User created successfully",
      user: user
    });

  } catch (error) {
    console.error("Error creating user:", error.message);

    res.status(500).json({
      message: "Failed to create user",
      error: error.message
    });
  }
});


// ===============================
// GET /api/users
// Retrieve Users
// ===============================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    console.log("Users retrieved successfully");

    res.status(200).json({
      message: "Users retrieved successfully",
      users: users
    });

  } catch (error) {
    console.error("Error retrieving users:", error.message);

    res.status(500).json({
      message: "Failed to retrieve users",
      error: error.message
    });
  }
});


// ===============================
// PATCH /api/users/:id
// Update User
// ===============================
router.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log("User updated successfully");

    res.status(200).json({
      message: "User updated successfully"
    });

  } catch (error) {
    console.error("Error updating user:", error.message);

    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
});


// ===============================
// DELETE /api/users/:id
// Delete User
// ===============================
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    // User not found
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log("User deleted successfully");

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting user:", error.message);

    res.status(500).json({
      message: "Database error",
      error: error.message
    });
  }
});


module.exports = router;