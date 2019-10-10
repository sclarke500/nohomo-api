const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // get token from header if present
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  // if no token found, return response (w/o going to next middleware)
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    // if can verify token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, 'myTempSecretKey');
    req.user = decoded;
    next();
  } catch (ex) {
    // if invalid token
    res.status(400).send('Invalid token');
  }

}
