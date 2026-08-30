const express = require('express');
const router = express.Router();
const Transcription = require('../models/Transcription');

router.post('/saveTranscription', async (req, res) => {
  try {
    const { transcription } = req.body;

    if (!transcription) {
      return res.status(400).json({ error: 'Transcription is required' });
    }

    const newTranscription = new Transcription({
      text: transcription,
    });

    await newTranscription.save();

    res.status(200).json({ message: 'Transcription saved successfully' });
  } catch (error) {
    console.error('Error saving transcription to database:', error);
    res.status(500).json({ error: 'Error saving transcription to database' });
  }
});

router.get('/getTranscriptions', async (req, res) => {
  try {
    const transcriptions = await Transcription.find({}).sort({ createdAt: -1 });

    res.status(200).json({ transcriptions });
  } catch (error) {
    console.error('Error retrieving transcriptions from database:', error);
    res.status(500).json({ error: 'Error retrieving transcriptions from database' });
  }
});

module.exports = router;
