const mongoose = require('mongoose');

// simple schema
const FirmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  address1: String,
  address2: String,
  city: String,
  postalCode: String,
  province: String,
  telephone: String,
  fax: String,
  email: String,
  lat: Number,
  lng: Number,

});

const Firm = mongoose.model('Firm', FirmSchema);

exports.Firm = Firm;