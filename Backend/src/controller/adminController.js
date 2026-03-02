const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({
      success: true,
      users: users  // ✅ FIXED: Changed to 'users' key for consistency
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.status(200).json({
        success: true,
        data: user
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

// @desc    Add user manually (Admin only)
// @route   POST /api/admin/users/add
// @access  Private/Admin
// ✅ NEW: Added this missing function
const addUserManually = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: role === 'admin' ? true : false,  // ✅ FIXED: Using isAdmin field
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
      user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isActive: updatedUser.isActive
        }
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);  // ✅ FIXED: Use findByIdAndDelete instead of remove()

    if (user) {
      res.status(200).json({ 
        success: true,
        message: 'User removed',
        data: user
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUserManually,  // ✅ ADDED export
  updateUser,
  deleteUser,
};