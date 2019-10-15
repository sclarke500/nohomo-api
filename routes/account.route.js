
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { Firm } = require('../models/firm.model');
const { User } = require('../models/user.model');

router.post('/signup', async (req, res) => {

  const _user = {
    name: req.body.userName,
    email: req.body.email,    
  }
  _user.password = await bcrypt.hash(req.body.password, 10);

  // find if existing user
  let user = await User.findOne( {email: _user.email });
  if (user) return res.status(400).json({message: 'User already registered.'});

  user = new User(_user);
  const firm = new Firm({
    name: req.body.firmName,
  });

  const newFirm = await firm.save();
  user.firm_id = newFirm._id;
  await user.save();

  let token = user.generateAuthToken();

  const loginModel = {
    user: {
      name: user.name,
      firm: firm.name,
      email: user.email,
    },
    token: token,
  }

  res.json(loginModel);

});

module.exports = router;