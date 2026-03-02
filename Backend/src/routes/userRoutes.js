const express = require('express');
const {
  addUserManually,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Middleware to check if admin (create this middleware)
const isAdmin = require('../middleware/isAdmin');

// Routes
router.post('/add', isAdmin, addUserManually);      // Add user manually
router.get('/', isAdmin, getAllUsers);               // Get all users
router.get('/:id', isAdmin, getUserById);            // Get user by ID
router.put('/:id', isAdmin, updateUser);             // Update user
router.delete('/:id', isAdmin, deleteUser);          // Delete user

module.exports = router;