const jwt = require('jsonwebtoken');
const blacklist = require('../utils/blacklist');

module.exports = async function(req, res, next) {
  // get token from header if present
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  // if no token found, return response (w/o going to next middleware)
  if (!token) return res.status(401).send('Access denied. No token provided.');
  if (await blacklist.checkIfListed(token)) return res.status(401).send('Access denied. User logged out.');

  try {
    // if can verify token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    // if invalid token
    res.status(400).send('Invalid token');
  }

}
