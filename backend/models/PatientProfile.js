const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
  name: String,
  cell: String,
  appointmentDate: Date,
  doctorname: String,
  prescription: [String],
  specialInstructions: [String],
  billingAmount: Number,
});

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
