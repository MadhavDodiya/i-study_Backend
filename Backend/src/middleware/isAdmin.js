const { hasAdminAccess } = require("./authMiddleware");

const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    if (!hasAdminAccess(req.user)) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can access this resource'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = isAdmin;
