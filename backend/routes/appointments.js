const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// API endpoint to get appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add Appointment
router.post('/Addappointments', async (req, res) => {
  const { patientName, doctorName, patientCell, appointmentDate } = req.body;

  try {
    const newAppointment = new Appointment({
      patientName,
      doctorName,
      patientCell,
      appointmentDate,
    });

    await newAppointment.save();
    res.json(newAppointment);
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Appointment
router.delete('/Deleteappointments/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
