const mongoose = require('mongoose');

// simple schema
const MatterSchema = new mongoose.Schema({
  firm_id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const Matter = mongoose.model('Matter', MatterSchema);

exports.Matter = Matter;
