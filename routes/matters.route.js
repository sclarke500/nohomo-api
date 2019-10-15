const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { User } = require('../models/user.model');
const { Matter } = require('../models/matter.model');
const { Document } = require('../models/document.model');

router.get('/', async (req, res) => {
 const matters = await Matter.find({ firm_id: req.user.firm_id });
 res.json(matters);
});

router.get('/:matterId', async (req, res) => {
  const matterId = req.params.matterId;
  let matter = await Matter.findOne({ firm_id: req.user.firm_id, _id: matterId });
  const docs = await Document.find( { matter_id: matterId });
  matter = matter.toJSON();
  matter.documents = docs;
  res.json(matter);
 });
 
router.post('/:matterId/documents', async (req, res) => {
  const matterId = req.params.matterId;
  const matter = await Matter.findOne({ firm_id: req.user.firm_id, _id: matterId }); // ensure we own
  if (!matter) { res.status(401).json({message: 'unauthorized'})} // move to middleware?
  const doc = new Document({name: req.body.name, matter_id: matterId});
  const d = await doc.save();
  res.json(d);
});

router.post('/', async (req, res) => {
  const m = { 
    name: req.body.name, 
    firm_id: req.user.firm_id,
  };
  const matter = new Matter(m);
  let mtr = await matter.save();
  res.send(mtr);
})


module.exports = router;
