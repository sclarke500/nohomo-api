const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');

const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {

  let user = await User.findOne( {email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, bcRes) => {
      if (bcRes) {
        // login success!
        let token = user.generateAuthToken();
        res.header('x-auth-token', token).json({status: 'ok'});
      } else {
        res.code(400).json({message: 'no fucking way'});
      }
    })
  } else {
    res.code(404).json({message: 'no user man'});
  }

});

module.exports = router;
