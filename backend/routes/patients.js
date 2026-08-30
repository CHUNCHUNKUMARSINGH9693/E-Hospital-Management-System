const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const User = require('../models/User');
const PatientProfile = require('../models/PatientProfile');
const state = require('../utils/state');

// Getting user List
router.get('/usersList', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a user by ID
router.delete('/Deleteusers/:email', async (req, res) => {
  const userEmail = req.params.email;

  try {
    const deletedUser = await User.findOneAndDelete({ email: userEmail });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Getting patients list
router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'Patient' });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for creating a patient profile
router.post('/PatientProfile', async (req, res) => {
  try {
    const { name, cell, appointmentDate, doctorname, prescription, specialInstructions, billingAmount } = req.body;

    // Validate input data
    if (!name || !cell) {
      return res.status(400).json({ error: 'Name and Cell are required' });
    }

    // Create patient profile
    const patient = await PatientProfile.create({
      name,
      cell,
      appointmentDate,
      doctorname,
      prescription,
      specialInstructions,
      billingAmount,
    });

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Verify number
router.get('/verifyNumber', async (req, res) => {
  try {
    const { cell } = req.query;

    // Check if the phone number exists in the PatientProfile
    const patient = await PatientProfile.findOne({ cell });

    if (patient) {
      res.status(200).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }
  } catch (error) {
    console.error('Error verifying number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to search for patients by name or cell number
router.get('/searchPatient', async (req, res) => {
  try {
    const { query } = req.query;
    const filteredPatients = await PatientProfile.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { cell: { $regex: new RegExp(query, 'i') } },
      ],
    });

    res.json(filteredPatients);
  } catch (error) {
    console.error('Error handling /searchPatient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get details of a specific patient by cell number
router.get('/patientDetails/:cellNumber', async (req, res) => {
  try {
    const { cellNumber } = req.params;
    const patient = await PatientProfile.findOne({ cell: cellNumber });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add prescription for a specific patient by cell number
router.post('/addPrescription/:cellNumber', async (req, res) => {
  const { cellNumber } = req.params;
  const { prescription } = req.body;

  try {
    const patient = await PatientProfile.findOne({ cell: cellNumber });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Update the patient's prescription
    patient.prescription = Array.isArray(prescription) ? prescription : [prescription];
    await patient.save();

    res.json({ message: 'Prescription added successfully', patient });
  } catch (error) {
    console.error('Error adding prescription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update patient information
router.put('/updatePatientInfo/:cellNumber', async (req, res) => {
  try {
    const { cellNumber } = req.params;
    const { prescription, specialInstructions, billingAmount } = req.body;

    // Find the patient in the MongoDB collection
    const patient = await PatientProfile.findOne({ cell: cellNumber });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Append new prescription to the existing list
    if (prescription) {
      patient.prescription = patient.prescription || [];
      patient.prescription.push(prescription);
    }

    // Append new special instructions to the existing list
    if (specialInstructions) {
      patient.specialInstructions = patient.specialInstructions || [];
      patient.specialInstructions.push(specialInstructions);
    }

    // Update billing amount
    if (billingAmount !== undefined) {
      patient.billingAmount = billingAmount;
    }

    // Save the updated patient information
    await patient.save();

    res.json({ message: 'Patient information updated successfully', patient });
  } catch (error) {
    console.error('Error updating patient information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Patient History
router.get('/getPrescriptionsAndInstructions', async (req, res) => {
  try {
    const user = await User.findOne({ email: state.checkEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cellNo = user.cellNumber;
    const userProfile = await PatientProfile.findOne({ cell: cellNo });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    const prescriptions = userProfile.prescription || [];
    const specialInstructions = userProfile.specialInstructions || [];

    res.json({ prescriptions, specialInstructions });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all prescriptions
router.get('/pharmacyPrescriptions', async (req, res) => {
  try {
    const prescriptions = await PatientProfile.find();
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PDF Report Generation
router.get('/generatePDF', async (req, res) => {
  try {
    if (state.checkEmail) {
      const user = await User.findOne({ email: state.checkEmail });
      if (user) {
        state.checkNameForPDF = user.username;
      }
    }

    const profiles = await PatientProfile.find().lean();
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    doc.pipe(res);

    doc.font('Helvetica-Bold').fillColor('black');

    const iconPath = path.join(__dirname, '../../frontend/src/Components/images/medicine-icon.png');
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    if (fs.existsSync(iconPath)) {
      doc.image(iconPath, { align: 'left', width: 30, height: 40, radius: 10 });
    }
    
    doc.text(`Date: ${formatDate(new Date())}`, { align: 'right' })
       .text('E-Hospital', { align: 'center' })
       .text('Email: admin@gmail.com', { align: 'center' })
       .text('Hospital Cell: 1243', { align: 'center' })
       .text(`Report Generated by: ${state.checkEmail}`, { align: 'center' })
       .moveDown();

    doc.font('Helvetica').fillColor('black');

    profiles.forEach((profile) => {
      if (profile.name === state.checkNameForPDF) {
        doc.text(`Name: ${profile.name}`)
           .text(`Cell: ${profile.cell}`)
           .text(`Appointment Date: ${profile.appointmentDate ? formatDate(new Date(profile.appointmentDate)) : 'N/A'}`)
           .text(`Doctor Name: ${profile.doctorname}`)
           .text(`Prescription: ${profile.prescription ? profile.prescription.join(', ') : ''}`)
           .text(`Special Instructions: ${profile.specialInstructions ? profile.specialInstructions.join(', ') : ''}`)
           .text(`Billing Amount: ${profile.billingAmount}`)
           .moveDown();
      }
    });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error generating PDF' });
    }
  }
});

module.exports = router;
