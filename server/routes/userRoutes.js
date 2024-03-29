// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, surname, idNumber, email, age } = req.body;
    const newUser = new User({ name, surname, idNumber, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});


// Update an existing user
router.put("/:id", async (req, res) => {
  try {
    const { name, surname, email, age, image } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.
      idNumber, { name, surname, email, age, image }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

// Delete an existing user
router.delete('/:idNumber', async (req, res) => {
  try {
    const idNumber = req.params.idNumber;

    // Find the user by idNumber and delete it
    const deletedUser = await User.findOneAndDelete({ idNumber });

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return a success message if the user was deleted
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});




// Search for user by ID number
 
router.get('/:idNumber', async (req, res) => {
  try {
    const user = await User.findOne({ idNumber: req.params.idNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error searching for user:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

module.exports = router;

