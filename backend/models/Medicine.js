const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medname: String,
  quantity: Number,
  price: Number,
  manufacturer: String,
  expiryDate: Date,
});

module.exports = mongoose.model('Medicine', medicineSchema);
