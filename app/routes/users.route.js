const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { User } = require('../models/user.model');

router.get('/current', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});


router.post('/', async (req, res) => {

  // find if existing user
  let user = await User.findOne( {email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

});

module.exports = router;
