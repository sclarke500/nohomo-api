const mongoose = require('mongoose');

// simple schema
const DocumentSchema = new mongoose.Schema({
  matter_id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const Document = mongoose.model('Document', DocumentSchema);

exports.Document = Document;
