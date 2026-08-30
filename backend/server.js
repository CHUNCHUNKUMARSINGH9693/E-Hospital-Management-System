require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const transcriptionRoutes = require('./routes/transcriptions');
const messageRoutes = require('./routes/messages');
const patientRoutes = require('./routes/patients');
const medicineRoutes = require('./routes/medicines');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount Routes (root level to preserve original API structure)
app.use('/', authRoutes);
app.use('/', appointmentRoutes);
app.use('/', transcriptionRoutes);
app.use('/', messageRoutes);
app.use('/', patientRoutes);
app.use('/', medicineRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});