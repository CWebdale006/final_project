const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  tickets: { type: Number, destination: {
    from: { type: String, required: true },
    to: { type: String, required: true },
    departDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    price: { type: Number },
   }, },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;