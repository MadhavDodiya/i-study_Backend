const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  addUserManually,  // ✅ ADDED
  updateUser,
  deleteUser,
} = require('../controller/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// ✅ FIXED: Added POST route for adding users manually
router.route('/users')
  .get(protect, admin, getUsers)
  .post(protect, admin, addUserManually);  // NEW: Add user route

router
  .route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;