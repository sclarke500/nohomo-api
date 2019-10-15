const mongoose = require('mongoose');

// simple schema
const FirmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  street1: String,
  street2: String,
  city: String,
  postalCode: String,
  province: String,
});

const Firm = mongoose.model('Firm', FirmSchema);

exports.Firm = Firm;