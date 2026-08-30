const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cellNumber: { type: Number },
  role: { type: String, enum: ['Patient', 'Doctor', 'Nurse', 'Pharmacist', 'Admin'], required: true },
});

module.exports = mongoose.model('User', userSchema);
