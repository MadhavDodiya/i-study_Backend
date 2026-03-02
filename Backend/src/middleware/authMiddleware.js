const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
    const token = bearerToken || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated. Please login.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token' 
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ 
    success: false,
    message: 'Only admins can access this resource' 
  });
};

module.exports = { protect, admin };