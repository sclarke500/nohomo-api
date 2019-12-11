const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { Firm } = require('../models/firm.model');

const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {

  let user = await User.findOne( {email: req.body.email });
  if (user) {
    let firm = await Firm.findOne( { _id: user.firm_id });
    bcrypt.compare(req.body.password, user.password, (err, bcRes) => {
      if (bcRes) {
        // login success!
        let token = user.generateAuthToken();
        let loginModel = {
          user: {
            name: user.name,
            firm: firm.name,
            email: user.email,
          },
          token: token,
        }
        res.json(loginModel);
      } else {
        res.status(400).json({message: 'Bad credentials 2'});
      }
    })
  } else {
    res.status(400).json({message: 'Bad credentials'});
  }

});

module.exports = router;
