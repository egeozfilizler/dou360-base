const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [
      /^[a-zA-Z0-9]+$/, // Letters and numbers only
      'Username can contain only letters and numbers and cannot include spaces.'
    ]
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    // Enforce Dogus University email format at the schema level
    match: [
      /^[a-zA-Z0-9]+@dogus\.edu\.tr$/, 
      'Please enter a valid Dogus University email address.'
    ]
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);