const mongoose = require('mongoose');

const medRequestSchema = new mongoose.Schema({
  patientName: String,
  cell: String,
  medicineName: String,
});

module.exports = mongoose.model('MedRequest', medRequestSchema);
