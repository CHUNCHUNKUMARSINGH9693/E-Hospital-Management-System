const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Medicine = require('../models/Medicine');
const MedRequest = require('../models/MedRequest');

// Express route to fetch doctors data with availability
router.get('/doctors', async (req, res) => {
  try {
    // Fetch users with role 'Doctor'
    const doctors = await User.find({ role: 'Doctor' });

    // Generate random days and time for each doctor (for demonstration purposes)
    const doctorsWithAvailability = doctors.map(doctor => ({
      name: doctor.username,
      days: getRandomDays(),
      time: getRandomTime(),
    }));

    res.json(doctorsWithAvailability);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getRandomDays() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const randomDays = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * daysOfWeek.length);
    randomDays.push(daysOfWeek[randomIndex]);
  }

  return randomDays.join(', ');
}

function getRandomTime() {
  const hours = Math.floor(Math.random() * 12) + 1; // 1 to 12
  const minutes = Math.floor(Math.random() * 60); // 0 to 59
  const ampm = Math.random() < 0.5 ? 'AM' : 'PM';

  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// API endpoint to search for medicines
router.get('/searchMedicine', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // If search term is provided, perform a case-insensitive search on the 'medname' field
      query = { medname: { $regex: new RegExp(search, 'i') } };
    }

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (error) {
    console.error('Error searching medicines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to add a new medicine
router.post('/addMedicine', async (req, res) => {
  try {
    const { medname, quantity, price, manufacturer, expiryDate } = req.body;

    // Validate input data
    if (!medname || !quantity || !price || !manufacturer || !expiryDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMedicine = new Medicine({
      medname,
      quantity,
      price,
      manufacturer,
      expiryDate,
    });

    await newMedicine.save();

    res.status(201).json({ message: 'Medicine added successfully', medicine: newMedicine });
  } catch (error) {
    console.error('Error adding medicine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to remove a medicine
router.delete('/removeMedicine/:medname', async (req, res) => {
  const medname = req.params.medname;

  try {
    const deletedMedicine = await Medicine.findOneAndDelete({ medname: medname });

    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine removed successfully' });
  } catch (error) {
    console.error('Error removing medicine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update medicine quantities
router.post('/updateQuantity', async (req, res) => {
  try {
    const updatedMedicines = req.body;

    for (const updatedMedicine of updatedMedicines) {
      const { medname, quantity } = updatedMedicine;

      // Find the medicine in the database
      const medicine = await Medicine.findOne({ medname });

      // Update the quantity
      if (medicine) {
        medicine.quantity -= quantity;
        await medicine.save();
      } else {
        console.error(`Medicine ${medname} not found in the database.`);
      }
    }

    res.status(200).send('Medicine quantities updated successfully.');
  } catch (error) {
    console.error('Error updating medicine quantities:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Submit medicine request
router.post('/medrequests', async (req, res) => {
  try {
    const { patientName, cell, medicineName } = req.body;

    if (!patientName || !cell || !medicineName) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMedRequest = new MedRequest({ patientName, cell, medicineName });
    await newMedRequest.save();

    res.status(201).json({ message: 'Medicine request submitted successfully.' });
  } catch (error) {
    console.error('Error submitting medicine request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch medicine requests
router.get('/viewMedreq', async (req, res) => {
  try {
    const medicineRequests = await MedRequest.find();
    res.json(medicineRequests);
  } catch (error) {
    console.error('Error fetching medicine requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
