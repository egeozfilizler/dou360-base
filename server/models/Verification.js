const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // Kod 10 dakika sonra otomatik silinir
});

module.exports = mongoose.model('Verification', VerificationSchema);