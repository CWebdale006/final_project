const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // give username properties of: username, password, and tickets?
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String, 
    // required: true, 
    unique: true, 
    minlength: 5
  }, 
  tickets: {
    type: Array
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;