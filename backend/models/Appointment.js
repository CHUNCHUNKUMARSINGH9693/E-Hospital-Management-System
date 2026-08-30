const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  patientCell: String,
  appointmentDate: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
