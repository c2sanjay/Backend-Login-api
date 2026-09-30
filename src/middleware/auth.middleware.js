const jwt = require('jsonwebtoken');
const config = require('../config/env');

function authenticate(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: 'Invalid authorization header'
    });
  }

  try {

    const payload = jwt.verify(
      token,
      config.jwtSecret
    );

    req.user = {
      id: payload.sub,
      role: payload.role
    };

    next();

  } catch (error) {

    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
}

module.exports = authenticate;