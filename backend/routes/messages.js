const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const state = require('../utils/state');

// Route to save a new message
router.post('/messages', async (req, res) => {
  const { sender, recipient, message } = req.body;

  try {
    const newMessage = new Message({ sender, recipient, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Getting msg list
router.get('/messages-list', async (req, res) => {
  try {
    const recipientEmail = state.checkEmail;

    // Fetch messages from MongoDB based on the recipient's email
    const messages = await Message.find({ recipient: recipientEmail });

    const messagesWithSender = messages.map(message => ({
      senderEmail: message.sender, // Add sender's email to the response
      message: message.message,
    }));

    res.json({ messages: messagesWithSender });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
