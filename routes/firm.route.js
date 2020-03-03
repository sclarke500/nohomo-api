const express = require('express');
const router = express.Router();
const { Firm } = require('../models/firm.model');


router.get('/', async (req, res) => {
  let firm = await Firm.findById(req.user.firm_id);
  firm = firm.toObject();
  delete firm._id;
  res.json(firm);
});

router.put('/', async (req, res) => {
  await Firm.findByIdAndUpdate(req.user.firm_id, req.body);
  res.send();
});

module.exports = router;
