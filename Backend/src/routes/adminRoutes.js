const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  addUserManually,
  updateUser,
  deleteUser,
  getOrders,
  updateOrderStatus,
  getCourses,
} = require('../controller/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// User management routes
router.route('/users')
  .get(protect, admin, getUsers)
  .post(protect, admin, addUserManually);

router
  .route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Orders management routes
router.route('/orders')
  .get(protect, admin, getOrders);
router.route('/orders/:id/status')
  .patch(protect, admin, updateOrderStatus);

// Courses management routes
router.route('/courses')
  .get(protect, admin, getCourses);

module.exports = router;
