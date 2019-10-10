const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// simple schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  //give different access rights if admin or not
  isAdmin: Boolean,
});

//custom methos to generate auth token
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, 'myTempSectretKey');
  return token;
}

const User = mongoose.model('User', UserSchema);

exports.User = User;
