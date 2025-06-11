const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided, authorization denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is not valid' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.name, '-', error.message);
    
    let message = 'Token is not valid';
    if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token signature - please login again';
    } else if (error.name === 'TokenExpiredError') {
      message = 'Token has expired - please login again';
    }
    
    res.status(401).json({ 
      success: false, 
      message,
      error: error.name
    });
  }
};

module.exports = auth; 