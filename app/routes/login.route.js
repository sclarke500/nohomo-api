const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { Firm } = require('../models/firm.model');
// const blacklist = require('../utils/blacklist');

const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let firm = await Firm.findOne({ _id: user.firm_id });
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
        res.status(400).json({ message: 'Bad credentials 2' });
      }
    })
  } else {
    res.status(400).json({ message: 'Bad credentials' });
  }

});

router.post('/forgot', async (req, res) => {

  // lookup email
  const _email = req.body.email;
  let user = await User.findOne({ email:  _email });
  if (user) {
    
    const token = jwt.sign({ email:  _email }, process.env.SECRET_KEY, { expiresIn: '24h' });
    const emailLinkUrl = req.headers.origin + '/reset-password?token=' + token;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SG_KEY);
    const msg = {
      to: user.email,
      from: 'sclarke250@gmail.com',
      subject: 'Password Reset Link',
      text: 'and easy to do anywhere, even with Node.js',
      html: 'Reset Link:<br><br><br><a href="' + emailLinkUrl + '" target="_blank">Reset</a>',
    };
    
    sgMail.send(msg);
    res.json({ message: 'ok', body: 'Reset Link:<br><br><br><a href="' + emailLinkUrl + '" target="_blank">Reset</a>' });
  } else {
    res.status(404).json({ message: 'not found' });
  }




});

router.post('/reset-password', async (req, res) => {

  // look up user, validate token, set password
  const token = req.body.token;
  if (!token) return res.status(401).send('Access denied. NT');

  try {
    const tModel = jwt.verify(token, process.env.SECRET_KEY);
    let user = await User.findOne({ email:  tModel.email });
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      await user.save();
      res.json({status: 'ok'});
    } else {
      res.status(404).send();
    }
  } catch (e) {
    res.status(400).send();
  }

});

// router.post('/logout', auth, async (req, res) => {
//   const token = req.headers['x-access-token'] || req.headers['authorization'];
//   if (req.user.exp) {
//     await blacklist.registerOnLogout(token, req.user.exp);
//   }
//   res.send();
// });

module.exports = router;
