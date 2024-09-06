// middlewares/authenticateToken.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  if (req.originalUrl.startsWith('/user/login') || req.originalUrl.startsWith('/user/register') 
      || req.originalUrl.startsWith('/user/refresh-token')) {
    return next(); // Allow public routes
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
