/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('x-auth-header');
    if (!token) return res.status(401).send('Access Denied: No Token Provided!');

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (ex) {
    res.status(401).send('Invalid Token');
  }
  return null;
};
