const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    // Email formatı backend tarafında şemada da zorunlu kılınabilir
    match: [
      /^[a-zA-Z0-9._%+-]+@dogus\.edu\.tr$/, 
      'Lütfen geçerli bir Doğuş Üniversitesi mail adresi giriniz.'
    ]
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);